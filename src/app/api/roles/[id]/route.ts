// src/app/api/roels/[id]/route.ts
// toutes les actions nécessitant de l'id du role
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/roles/2
// - PATCH http://localhost:3000/api/roles/2 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/roles/2

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Définition du type pour les paramètres de la route dynamique
interface RouteParams {
  params: {
    id: string; // L'ID sera une chaîne de caractères provenant de l'URL
  };
}

// GET : Récupérer un rôle par son ID
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID du role depuis les paramètres de l'URL

    // Convertit l'ID en nombre entier, car Prisma attend un nombre pour l'ID
    const roleId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(roleId)) {
      return NextResponse.json(
        { success: false, message: "❓ ID du rôle invalide." },
        { status: 400 }
      );
    }

    // Recherche le rôle unique par son ID
    const role = await prisma.roles.findUnique({
      where: { id: roleId },
    });

    // Si le rôle n'est pas trouvé
    if (!role) {
      return NextResponse.json(
        { success: false, message: "❌ Röle non trouvé." },
        { status: 404 }
      );
    }

    console.log(`Rôle avec l'ID ${id} trouvé.`);

    return NextResponse.json({ success: true, data: role });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du rôle par ID :", error);
    return NextResponse.json(
      {
        success: false,
        message: "❌ Erreur serveur lors de la récupération du rôle.",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH : Mettre à jour un rôle existant par son ID
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params; // Récupère l'ID du rôle depuis les paramètres de l'URL
    const updateData = await req.json(); // Récupère les données de mise à jour du corps de la requête

    // Convertit l'ID en nombre entier, car Prisma attend un nombre pour l'ID
    const roleId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(roleId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID du rôle invalide." },
        { status: 400 }
      );
    }

    // Effectue la mise à jour dans la base de données
    const updatedRole = await prisma.volunteers.update({
      where: { id: roleId },
      data: updateData, // Prisma mettra à jour uniquement les champs fournis dans updateData
    });

    console.log(`✅ Rôle avec l'ID ${id} mis à jour.`);

    return NextResponse.json({ success: true, data: updatedRole });
  } catch (error: any) {
    // Gère l'erreur si le rôle n'existe pas (P2025 de Prisma)
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "❌ Rôle non trouvé pour la mise à jour.",
        },
        { status: 404 }
      );
    }
    console.error("❌ Erreur lors de la mise à jour du rôle :", error);
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
    const { id } = params; // Récupère l'ID du rôle depuis les paramètres de l'URL
    // Convertit l'ID en nombre entier
    const roleId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(roleId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de rôle invalide." },
        { status: 400 }
      );
    }

    // Effectue la suppression dans la base de données
    const deletedRole = await prisma.volunteers.delete({
      where: { id: roleId },
    });

    console.log(`Rôle avec l'ID ${id} supprimé.`);

    return NextResponse.json({
      success: true,
      data: deletedRole,
      message: "✅ Rôle supprimé avec succès.",
    });
  } catch (error: any) {
    // Gère l'erreur si le rôle n'existe pas (P2025 de Prisma)
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "❓Rôle non trouvé pour la suppression.",
        },
        { status: 404 }
      );
    }
    console.error("❌ Erreur lors de la suppression du rôle :", error);
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
