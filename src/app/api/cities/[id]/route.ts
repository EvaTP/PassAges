// src/app/api/cities/[id]/route.ts
// toutes les actions nécessitant de l'id de la ville
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/cities/12
// - PATCH http://localhost:3000/api/cities/12 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/cities/12

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Définition du type pour les paramètres de la route dynamique
interface RouteParams {
  params: {
    id: string; // L'ID sera une chaîne de caractères provenant de l'URL
  };
}

// DELETE : Supprimer une ville par son ID
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID de la ville depuis les paramètres de l'URL

    // Convertit l'ID en nombre entier
    const cityId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de la ville invalide." },
        { status: 400 }
      );
    }

    // Effectue la suppression dans la base de données
    const deletedCity = await prisma.cities.delete({
      where: { id: cityId },
    });

    console.log(`Ville avec l'ID ${id} supprimé.`);

    return NextResponse.json({
      success: true,
      data: deletedCity,
      message: "✅ Ville supprimée avec succès.",
    });
  } catch (error: unknown) {
    // Gère l'erreur si la ville n'existe pas (P2025 de Prisma)
    // Vérifie si l'erreur est un objet avec une propriété 'code'
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "❓Ville non trouvé pour la suppression.",
        },
        { status: 404 }
      );
    }
    console.error("❌ Erreur lors de la suppression de la ville :", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur serveur lors de la suppression.",
        details: error.message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
