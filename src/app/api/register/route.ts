// route pour créer un volontaire depuis le formulaire admin dans DASHBOARD

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { VolunteerFormAdminData } from "@/app/types/volunteers";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
  try {
    const body: VolunteerFormAdminData = await req.json();
    const {
      firstname,
      lastname,
      email,
      password,
      role,
      city,
      zipcode,
      activity_id,
      motivation,
    } = body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !city ||
      !activity_id ||
      !motivation
    ) {
      return NextResponse.json(
        { success: false, message: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // 1. Gérer la ville
    let cityRecord = await prisma.cities.findUnique({
      where: { city_name: city },
    });

    if (!cityRecord) {
      cityRecord = await prisma.cities.create({
        data: { city_name: city },
      });
    }

    // 2. Gérer l'activité
    const activityRecord = await prisma.activities.findFirst({
      where: { id: activity_id },
    });

    if (!activityRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Activité inconnue. Veuillez en choisir une valide.",
        },
        { status: 400 }
      );
    }

    // 3. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 4. Créer le bénévole
    const newVolunteer = await prisma.volunteers.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
        city_id: cityRecord.id,
        zipcode,
        activity_id,
        motivation,
      },
    });

    return NextResponse.json(
      { success: true, data: newVolunteer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
