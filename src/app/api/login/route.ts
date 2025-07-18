import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adapte ce chemin si nécessaire

export async function POST(req: NextRequest) {
  try {
    const newVolunteerRegistration = await req.json();
    const { firstname, password } = newVolunteerRegistration;

    // Vérifie que les champs obligatoires sont présents
    if (!firstname || !password) {
      return NextResponse.json(
        { success: false, message: "❓Champs manquants." },
        { status: 400 }
      );
    }

    // Recherche du bénévole dans la base
    const volunteerDbInfo = await prisma.volunteers.findFirst({
      where: {
        firstname,
        password,
      },
    });

    // Si le bénévole est trouvé → Connexion réussie
    if (volunteerDbInfo) {
      return NextResponse.json(
        {
          success: true,
          message: "✅ Connexion réussie",
          data: {
            id: volunteerDbInfo.id,
            firstname: volunteerDbInfo.firstname,
            // ⚠️ ne renvoie jamais le mot de passe !
          },
        },
        { status: 200 }
      );
    }

    // Si aucun bénévole correspondant
    return NextResponse.json(
      { success: false, message: "❌ Identifiants incorrects." },
      { status: 401 }
    );
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    return NextResponse.json(
      { success: false, message: "❌ Erreur serveur", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

