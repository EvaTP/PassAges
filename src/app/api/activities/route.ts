// app/api/activities/route.ts : toutes les activités
// http://localhost:3000/api/activities

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allActivities = await prisma.activities.findMany();

    console.log("Nombre d'activités trouvées :", allActivities.length);

    return NextResponse.json({
      success: true,
      data: allActivities,
      count: allActivities.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des activités :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des activités",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
