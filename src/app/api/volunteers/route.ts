// app/api/volunteers/route.ts : tous les volunteers
// http://localhost:3000/api/volunteers

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const allVolunteers = await prisma.volunteers.findMany();

    console.log("Nombre de bénévoles trouvés:", allVolunteers.length);

    return NextResponse.json({
      success: true,
      data: allVolunteers,
      count: allVolunteers.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des bénévoles :", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des bénévoles",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
