// route pour créer un volontaire depuis le formulaire admin dans DASHBOARD
// endpoint : POST http://localhost:3000/api/register
// body : { firstname, lastname, email, password, role, city, zipcode, activity_id, motivation }

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
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !city.trim() ||
      !activity_id ||
      motivation === undefined ||
      motivation === null
    ) {
      return NextResponse.json(
        { success: false, message: "Champs requis manquants ou invalides." },
        { status: 400 }
      );
    }

    // 1. Gérer la ville et la créer si absente
    let cityRecord = await prisma.cities.findUnique({
      where: { city_name: city.trim() },
    });

    if (!cityRecord) {
      cityRecord = await prisma.cities.create({
        data: { city_name: city.trim() },
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
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: role || "volunteer",
        city_id: cityRecord.id,
        zipcode: zipcode ? zipcode.trim() : null, // Champ optionnel
        activity_id,
        motivation: motivation,
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
