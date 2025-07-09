// app/api/cities/route.ts : toutes les villes
// http://localhost:3000/api/cities

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const allCities = await prisma.cities.findMany();

    console.log("Nombre de villes trouvés:", allCities.length);

    return NextResponse.json({
      success: true,
      data: allCities,
      count: allCities.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des villes",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
