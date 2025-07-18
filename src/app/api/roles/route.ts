// app/api/roles/route.ts : tous les status (roles dans DB)
// http://localhost:3000/api/roles

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allRoles = await prisma.roles.findMany();

    console.log("Nombre de villes trouvés:", allRoles.length);

    return NextResponse.json({
      success: true,
      data: allRoles,
      count: allRoles.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statuts :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des statuts",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
