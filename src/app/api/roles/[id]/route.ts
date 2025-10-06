// src/app/api/roles/[id]/route.ts
// toutes les actions nécessitant de l'id du rôle :
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/roles/2
// - PATCH http://localhost:3000/api/roles/2 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/roles/2

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handleApiError";

const prisma = new PrismaClient();

// GET : Récupérer un rôle par son ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; //  Attend la résolution de la Promise
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
        { success: false, message: "❌ rôle non trouvé." },
        { status: 404 }
      );
    }
    console.log(`Rôle avec l'ID ${roleId} trouvé.`);

    return NextResponse.json({ success: true, data: role });
  } catch (error) {
    console.error("❌ erreur lors de la récupération du rôle par ID :", error);
    return handleApiError(error, "❌ erreur lors de la récupération du rôle");
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH : Mettre à jour un rôle existant par son ID
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Attend la résolution de la Promise
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

    console.log(`✅ Rôle avec l'ID ${roleId} mis à jour.`);

    return NextResponse.json({ success: true, data: updatedRole });
  } catch (error: unknown) {
    return handleApiError(
      error,
      "❌ erreur lors de la mise à jour du rôle du bénévole"
    );
  } finally {
    await prisma.$disconnect();
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
    const roleId = parseInt(id, 10);

    // Vérifie si l'ID est un nombre valide
    if (isNaN(roleId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de rôle invalide." },
        { status: 400 }
      );
    }

    // Effectue la suppression dans la base de données
    const deletedRole = await prisma.roles.delete({
      where: { id: roleId },
    });

    console.log(`Rôle avec l'ID ${roleId} supprimé.`);
    return NextResponse.json({
      success: true,
      data: deletedRole,
      message: "✅ Rôle supprimé avec succès.",
    });
  } catch (error: unknown) {
    return handleApiError(error, "❌ erreur lors de la suppression du rôle");
  } finally {
    await prisma.$disconnect();
  }
}
