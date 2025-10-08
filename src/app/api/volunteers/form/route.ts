import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// typage
type NewVolunteerData = {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  zipcode?: string;
  motivation?: string;
};

export async function POST(req: NextRequest) {
  try {
    const newVolunteerData: NewVolunteerData = await req.json();

    const { firstname, lastname, email, city, zipcode, motivation } =
      newVolunteerData;

    // Vérifier si l'email existe déjà
    const existingVolunteer = await prisma.volunteers.findUnique({
      where: { email },
    });

    if (existingVolunteer) {
      return NextResponse.json(
        { success: false, message: "⚠️ Bénévole déjà enregistré." },
        { status: 400 }
      );
    }

    if (!firstname || !lastname || !email || !city) {
      return NextResponse.json(
        { success: false, message: "❓Champs requis manquants." },
        { status: 400 }
      );
    }

    // On récupère l'ID de la ville à partir de son nom dans la table CITIES
    const cityRecord = await prisma.cities.findUnique({
      where: { city_name: city },
    });

    if (!cityRecord) {
      return NextResponse.json(
        { success: false, message: "❓Ville non trouvée dans la base." },
        { status: 404 }
      );
    }

    // Création du bénévole (sans password - sera défini par l'admin)
    const newVolunteer = await prisma.volunteers.create({
      data: {
        firstname,
        lastname,
        email,
        zipcode,
        motivation,
        city_id: cityRecord.id,
        // password sera défini par l'admin lors de la validation
        // moments et activities seront gérés après validation
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "✅ Merci pour votre demande d'inscription ! Nous reviendrons vers vous rapidement.",
      data: newVolunteer,
    });
  } catch (error) {
    console.error("❌ Erreur dans la création d’un bénévole :", error);
    return NextResponse.json(
      { success: false, message: "❌ Erreur serveur", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
