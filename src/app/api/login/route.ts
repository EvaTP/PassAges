

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, password } = body;

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
      const response = NextResponse.json(
        {
          success: true,
          message: "✅ Connexion réussie",
          data: {
            id: volunteerDbInfo.id,
            firstname: volunteerDbInfo.firstname,
          },
        },
        { status: 200 }
      );

      // 🔐 On ajoute un cookie httpOnly
      response.cookies.set("session", volunteerDbInfo.firstname, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 jour
      });

      return response;
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