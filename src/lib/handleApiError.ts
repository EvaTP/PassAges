// Gestion des erreurs pour les routes API
"use server";

import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * Gestionnaire d'erreurs générique pour les routes API
 * @param error - Erreur levée lors d'une opération Prisma ou autre
 * @param actionDescription - Texte décrivant l'action en cours pour un message plus clair
 * @returns NextResponse JSON
 */
export async function handleApiError(
  error: unknown,
  actionDescription = "l'action demandée"
) {
  // Cas spécifique Prisma : en particulier erreur P2025 (record not found)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      console.error(
        `❌ Erreur Prisma : élément non trouvé lors de ${actionDescription}`,
        error
      );
      return NextResponse.json(
        {
          success: false,
          message: `❌ Élément non trouvé lors de ${actionDescription}.`,
          details: error.message,
        },
        { status: 404 }
      );
    }
  }

  // Cas d'une vraie erreur JavaScript
  if (error instanceof Error) {
    console.error(`❌ Erreur lors de ${actionDescription}:`, error.message);
    return NextResponse.json(
      {
        success: false,
        message: `❌ Erreur serveur lors de ${actionDescription}.`,
        details: error.message,
      },
      { status: 500 }
    );
  }

  // Cas extrême : erreur inconnue
  console.error(`❌ Erreur inconnue lors de ${actionDescription}:`, error);
  return NextResponse.json(
    {
      success: false,
      message: `❌ Erreur serveur inconnue lors de ${actionDescription}.`,
    },
    { status: 500 }
  );
}
