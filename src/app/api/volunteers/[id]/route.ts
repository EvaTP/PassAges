// src/app/api/volunteers/[id]/route.ts
// toutes les actions nécessitant de l'id du volunteeer
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/volunteers/12
// - PATCH http://localhost:3000/api/volunteers/12 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/volunteers/12

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Définition du type pour les paramètres de la route dynamique
interface RouteParams {
  params: {
    id: string; // L'ID sera une chaîne de caractères provenant de l'URL
  };
}

// GET : Récupérer un volontaire par son ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID du volontaire depuis les paramètres de l'URL

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
        { success: false, message: "❌ Volontaire non trouvé." },
        { status: 404 }
      );
    }

    console.log(`Volontaire avec l'ID ${id} trouvé.`);

    return NextResponse.json({ success: true, data: volunteer });
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération du bénévole par ID :",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur serveur lors de la récupération du bénévole.",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH : Mettre à jour un volontaire existant par son ID
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID du volontaire depuis les paramètres de l'URL
    const updateData = await req.json(); // Récupère les données de mise à jour du corps de la requête

    // Convertit l'ID en nombre entier, car Prisma attend un nombre pour l'ID
    const volunteerId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(volunteerId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de volontaire invalide." },
        { status: 400 }
      );
    }

    // Si 'city' est fourni dans les données de mise à jour, on doit trouver son ID
    if (updateData.city) {
      const cityRecord = await prisma.cities.findUnique({
        where: { city_name: updateData.city },
      });

      if (!cityRecord) {
        return NextResponse.json(
          { success: false, message: "❓ Ville non trouvée dans la base." },
          { status: 404 }
        );
      }
      updateData.city_id = cityRecord.id; // Ajoute l'ID de la ville aux données de mise à jour
      delete updateData.city; // Supprime le nom de la ville car on utilise city_id pour Prisma
    }

    // Si 'activity' est fourni dans les données de mise à jour, on doit trouver son ID
    if (updateData.activity) {
      const activityRecord = await prisma.activities.findUnique({
        where: { activity_type: updateData.activity },
      });

      if (!activityRecord) {
        return NextResponse.json(
          { success: false, message: "❌ Activité non trouvée dans la base." },
          { status: 404 }
        );
      }
      updateData.activity_id = activityRecord.id; // Ajoute l'ID de l'activité aux données de mise à jour
      delete updateData.activity; // Supprime le type d'activité car on utilise activity_id pour Prisma
    }

    // Effectue la mise à jour dans la base de données
    const updatedVolunteer = await prisma.volunteers.update({
      where: { id: volunteerId },
      data: updateData, // Prisma mettra à jour uniquement les champs fournis dans updateData
      include: {
        // Inclure les relations pour la réponse
        cities: { select: { city_name: true } },
        activities: { select: { activity_type: true } },
      },
    });

    console.log(`✅ Volontaire avec l'ID ${id} mis à jour.`);

    return NextResponse.json({ success: true, data: updatedVolunteer });
  } catch (error: any) {
    // Gère l'erreur si le volontaire n'existe pas (P2025 de Prisma)
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "❌ Volontaire non trouvé pour la mise à jour.",
        },
        { status: 404 }
      );
    }
    console.error("❌ Erreur lors de la mise à jour du bénévole :", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur serveur lors de la mise à jour.",
        details: error.message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE : Supprimer un volontaire par son ID
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID du volontaire depuis les paramètres de l'URL

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

    console.log(`Volontaire avec l'ID ${id} supprimé.`);

    return NextResponse.json({
      success: true,
      data: deletedVolunteer,
      message: "✅ Volontaire supprimé avec succès.",
    });
  } catch (error: any) {
    // Gère l'erreur si le volontaire n'existe pas (P2025 de Prisma)
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "❓Volontaire non trouvé pour la suppression.",
        },
        { status: 404 }
      );
    }
    console.error("❌ Erreur lors de la suppression du bénévole :", error);
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
