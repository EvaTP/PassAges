import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Définition du type pour les paramètres de la route dynamique avec l'ID
interface RouteParams {
  params: {
    id: string;
  };
}

// typage
type newVolunteerData = {
  firstname: string;
  lastname: string;
  email: string;
  city: string;
  zipcode?: string;
  motivation?: string;
};




export async function POST(req: NextRequest) {
  try {
    const newVolunteerData = await req.json();

    const { firstname, lastname, email, city, zipcode, motivation,password, moments, activities } =
      newVolunteerData;

      const volunteerDbInfo = await prisma.volunteers.findUnique({
      where: {
        email: email,
        password: password,
      }
    })

    if(volunteerDbInfo?.email == newVolunteerData.email || volunteerDbInfo?.password == newVolunteerData.password)
    {
      return NextResponse.json(
        { success: false, message: "⚠️Bénévole déjà enregistré." },
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

    // Création du bénévole
    const newVolunteer = await prisma.volunteers.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        zipcode,
        motivation,
        city_id: cityRecord.id,
        moments,
        activities,
      },
    });

    return NextResponse.json({ success: true, data: newVolunteer });
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