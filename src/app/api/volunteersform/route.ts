// app/api/volunteersform/route.ts : ajouter un volunteer depuis le formulaire DEVENIR BENEVOLE
// http://localhost:3000/api/volunteersform

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type VolunteerFormData = {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  zipcode?: string;
  motivation: string;
  role?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: VolunteerFormData = await req.json();

    const { firstname, lastname, email, city, zipcode, motivation } = body;

    if (!firstname || !lastname || !email || !city || !motivation) {
      return NextResponse.json(
        { success: false, message: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // Vérifie si la ville existe dans la table CITIES
    let cityRecord = await prisma.cities.findUnique({
      where: { city_name: city },
    });
    // si la ville n'existe pas, on la crée
    if (!cityRecord) {
      cityRecord = await prisma.cities.create({
        data: { city_name: city },
      });
    }

    // Création du bénévole avec city_id
    const newVolunteer = await prisma.volunteers.create({
      data: {
        firstname,
        lastname,
        email,
        zipcode,
        motivation,
        city_id: cityRecord.id,
        role: "volunteer_onhold",
      },
    });

    return NextResponse.json(
      { success: true, data: newVolunteer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du formulaire :", error);
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
