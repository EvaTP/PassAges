// src/app/api/cities/[id]/route.ts
// toutes les actions nécessitant de l'id de la ville :
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/cities/12
// - PATCH http://localhost:3000/api/cities/12 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/cities/12

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handleApiError"; // Importation de la fonction de gestion des erreurs

const prisma = new PrismaClient();

// GET : Récupérer une ville par son ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
    // Convertit l'ID en nombre entier
    const cityId = parseInt(id, 10);

    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❓ ID de la ville invalide." },
        { status: 400 }
      );
    }

    // Recherche la ville unique par son ID
    const city = await prisma.cities.findUnique({
      where: { id: cityId },
    });

    if (!city) {
      return NextResponse.json(
        { success: false, message: "❌ ville non trouvée." },
        { status: 404 }
      );
    }

    console.log(`Ville avec l'ID ${cityId} trouvée.`);
    return NextResponse.json({ success: true, data: city });
  } catch (error) {
    return handleApiError(
      error,
      "❌ erreur lors de la récupération de la ville"
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH : Mettre à jour une ville par son ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
    const updateData = await req.json();
    const cityId = parseInt(id, 10);

    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de la ville invalide." },
        { status: 400 }
      );
    }

    // Effectue la mise à jour dans la base de données
    const updatedCity = await prisma.cities.update({
      where: { id: cityId },
      data: updateData,
    });

    console.log(`✅ Ville avec l'ID ${cityId} mise à jour.`);
    return NextResponse.json({ success: true, data: updatedCity });
  } catch (error: unknown) {
    return handleApiError(
      error,
      "❌ erreur lors de la mise à jour de la ville"
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE : Supprimer une ville par son ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
    const cityId = parseInt(id, 10);

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

    console.log(`Ville avec l'ID ${cityId} supprimée.`);
    return NextResponse.json({
      success: true,
      data: deletedCity,
      message: "✅ Ville supprimée avec succès.",
    });
  } catch (error: unknown) {
    return handleApiError(
      error,
      "❌ erreur lors de la suppression de la ville"
    );
  } finally {
    await prisma.$disconnect();
  }
}
