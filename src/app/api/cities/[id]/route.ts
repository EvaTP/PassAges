// src/app/api/cities/[id]/route.ts
// toutes les actions nécessitant de l'id de la ville :
// GET by ID, Patch et Delete

// - GET http://localhost:3000/api/cities/12
// - PATCH http://localhost:3000/api/cities/12 (avec un corps JSON pour la mise à jour)
// - DELETE http://localhost:3000/api/cities/12

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/handleApiError"; // Importation de la fonction de gestion des erreurs
import { ParamsWithId } from "@/app/types/paramsid";

const prisma = new PrismaClient();

// GET : Récupérer une ville par son ID
export async function GET(req: NextRequest, context: { params: ParamsWithId }) {
  try {
    const { id } = context.params;
    // Convertit l'ID en nombre entier
    const cityId = parseInt(id, 10);

    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de la ville invalide." },
        { status: 400 }
      );
    }

    const city = await prisma.cities.findUnique({
      where: { id: cityId },
    });

    if (!city) {
      return NextResponse.json(
        { success: false, message: "❌ Ville non trouvée." },
        { status: 404 }
      );
    }

    console.log(`Ville avec l'ID ${cityId} trouvée.`);
    return NextResponse.json({ success: true, data: city });
  } catch (error) {
    return handleApiError(error, "la récupération de la ville");
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH : Mettre à jour une ville par son ID
export async function PATCH(
  req: NextRequest,
  context: { params: ParamsWithId }
) {
  try {
    const { id } = context.params;
    const updateData = await req.json();
    const cityId = parseInt(id, 10);

    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de la ville invalide." },
        { status: 400 }
      );
    }

    const updatedCity = await prisma.cities.update({
      where: { id: cityId },
      data: updateData,
    });

    console.log(`✅ Ville avec l'ID ${id} mise à jour.`);
    return NextResponse.json({ success: true, data: updatedCity });
  } catch (error: unknown) {
    return handleApiError(error, "la mise à jour de la ville");
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE : Supprimer une ville par son ID
export async function DELETE(
  req: NextRequest,
  context: { params: ParamsWithId }
) {
  try {
    const { id } = context.params; // Récupère l'ID de la ville depuis les paramètres de l'URL
    const cityId = parseInt(id, 10);

    if (isNaN(cityId)) {
      return NextResponse.json(
        { success: false, message: "❌ ID de la ville invalide." },
        { status: 400 }
      );
    }

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
    return handleApiError(error, "la suppression de la ville");
  } finally {
    await prisma.$disconnect();
  }
}

// ancienne version du DELETE avec gestion d'erreurs manuelle
// DELETE : Supprimer une ville par son ID
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params; // Récupère l'ID de la ville depuis les paramètres de l'URL

//     // Convertit l'ID en nombre entier
//     const cityId = parseInt(id, 10);

//     // Vérifie si l'ID est un nombre valide
//     if (isNaN(cityId)) {
//       return NextResponse.json(
//         { success: false, message: "❌ ID de la ville invalide." },
//         { status: 400 }
//       );
//     }

//     // Effectue la suppression dans la base de données
//     const deletedCity = await prisma.cities.delete({
//       where: { id: cityId },
//     });

//     console.log(`Ville avec l'ID ${id} supprimé.`);

//     return NextResponse.json({
//       success: true,
//       data: deletedCity,
//       message: "✅ Ville supprimée avec succès.",
//     });
//   } catch (error: unknown) {
//     const errorMessage =
//       typeof error === "object" && error !== null && "message" in error
//         ? (error as { message: string }).message
//         : String(error);

//     // Gère l'erreur si la ville n'existe pas (erreur P2025 de Prisma)
//     // Vérifie si l'erreur est un objet avec une propriété 'code'
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "code" in error &&
//       error.code === "P2025"
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "❓Ville non trouvé pour la suppression.",
//         },
//         { status: 404 }
//       );
//     }
//     console.error(
//       "❌ Erreur lors de la suppression de la ville :",
//       errorMessage
//     );
//     return NextResponse.json(
//       {
//         success: false,
//         message: "❌ Erreur serveur lors de la suppression.",
//         details: errorMessage,
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
