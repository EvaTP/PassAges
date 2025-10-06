// src/app/api/volunteers/[id]/route.ts
// toutes les actions nécessitant de l'id du volunteeer
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/volunteers/12
// - PATCH http://localhost:3000/api/volunteers/12 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/volunteers/12

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handleApiError";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Typage pour une mise à jour (partielle)
type UpdateVolunteerData = {
  firstname?: string;
  lastname?: string;
  email?: string;
  city_id?: number;
  zipcode?: string;
  motivation?: string;
  activity_id?: number;
  role?: string;
  password?: string;
};

// GET : Récupérer un volontaire par son ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
    // Convertit l'ID en nombre entier, car Prisma attend un nombre pour l'ID
    const volunteerId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(volunteerId)) {
      return NextResponse.json(
        { success: false, message: "❓ ID de volontaire invalide." },
        { status: 400 }
      );
    }

    // Recherche le volontaire unique par son ID
    const volunteer = await prisma.volunteers.findUnique({
      where: { id: volunteerId },
      // Inclure les relations pour obtenir les noms de ville et d'activité
      include: {
        cities: {
          select: { city_name: true },
        },
        activities: {
          select: { activity_type: true },
        },
      },
    });

    // Si le volontaire n'est pas trouvé
    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: "❌ volontaire non trouvé." },
        { status: 404 }
      );
    }

    console.log(`Volontaire avec l'ID ${volunteerId} trouvé.`);

    return NextResponse.json(
      { success: true, data: volunteer },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleApiError(
      error,
      "❌ erreur lors de la récupération du bénévole"
    );
  }
}

// PATCH : Mettre à jour un volontaire existant par son ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const volunteerId = parseInt(id, 10);

    if (isNaN(volunteerId)) {
      return NextResponse.json(
        { success: false, message: "❓ ID de volontaire invalide." },
        { status: 400 }
      );
    }

    const updateData: UpdateVolunteerData = await req.json();

    // Si 'city' est fourni, trouver son ID
    if (updateData.city_id) {
      const cityRecord = await prisma.cities.findUnique({
        where: { id: updateData.city_id },
      });

      if (!cityRecord) {
        return NextResponse.json(
          { success: false, message: "❌ ville non trouvée dans la base." },
          { status: 404 }
        );
      }
      updateData.city_id = cityRecord.id;
    }

    // Si 'activity' est fournie, trouver son ID
    if (updateData.activity_id) {
      const activityRecord = await prisma.activities.findFirst({
        where: { id: updateData.activity_id },
      });

      if (!activityRecord) {
        return NextResponse.json(
          { success: false, message: "❌ activité non trouvée dans la base." },
          { status: 404 }
        );
      }
      updateData.activity_id = activityRecord.id;
    }

    // Si 'password' est fourni, le hasher avant de l’enregistrer
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Effectue la mise à jour
    const updatedVolunteer = await prisma.volunteers.update({
      where: { id: volunteerId },
      data: updateData,
      include: {
        cities: { select: { city_name: true } },
        activities: { select: { activity_type: true } },
      },
    });

    console.log(`✅ Volontaire avec l'ID ${volunteerId} mis à jour.`);

    return NextResponse.json({ success: true, data: updatedVolunteer });
  } catch (error: unknown) {
    return handleApiError(error, "la mise à jour du bénévole");
  }
}

// DELETE : Supprimer un volontaire par son ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
    // Convertit l'ID en nombre entier
    const volunteerId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(volunteerId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de volontaire invalide." },
        { status: 400 }
      );
    }

    // Effectue la suppression dans la base de données
    const deletedVolunteer = await prisma.volunteers.delete({
      where: { id: volunteerId },
    });

    console.log(`Volontaire avec l'ID ${volunteerId} supprimé.`);

    return NextResponse.json({
      success: true,
      data: deletedVolunteer,
      message: "✅ Volontaire supprimé avec succès.",
    });
  } catch (error: unknown) {
    return handleApiError(
      error,
      "❌ erreur lors de la suppression du bénévole"
    );
  } finally {
    await prisma.$disconnect();
  }
}
