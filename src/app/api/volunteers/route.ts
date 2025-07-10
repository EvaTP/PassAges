// app/api/volunteers/route.ts : tous les volunteers
// http://localhost:3000/api/volunteers

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// typage
type newVolunteerData = {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  zipcode?: string;
  motivation?: string;
};

export async function GET(request: NextRequest) {
  try {
    const allVolunteers = await prisma.volunteers.findMany();

    console.log("Nombre de bénévoles trouvés:", allVolunteers.length);

    return NextResponse.json({
      success: true,
      data: allVolunteers,
      count: allVolunteers.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des bénévoles :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des bénévoles",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST : CREER un volunteer par l'administrateur
export async function POST(req: NextRequest) {
  try {
    const newVolunteerData = await req.json();

    const { firstname, lastname, email, city, zipcode, motivation } =
      newVolunteerData;

    if (!firstname || !lastname || !email || !city) {
      return NextResponse.json(
        { success: false, message: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // On récupère l'ID de la ville à partir de son nom dans la table CITIES
    const cityRecord = await prisma.cities.findUnique({
      where: { city_name: city },
    });

    if (!cityRecord) {
      return NextResponse.json(
        { success: false, message: "Ville non trouvée dans la base." },
        { status: 404 }
      );
    }

    // Création du bénévole
    const newVolunteer = await prisma.volunteers.create({
      data: {
        firstname,
        lastname,
        email,
        zipcode,
        motivation,
        city_id: cityRecord.id,
      },
    });

    return NextResponse.json({ success: true, data: newVolunteer });
  } catch (error) {
    console.error("Erreur dans la création d’un bénévole :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
