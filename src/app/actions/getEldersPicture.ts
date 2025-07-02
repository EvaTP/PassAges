"use server";

import { prisma } from "@/app/lib/prisma";

export async function getEldersPicture() {
  try {
    const elders = await prisma.elders.findMany({
      select: {
        id: true,
        picture: true,
      },
    });
    return elders;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des images :", error.message);
    throw new Error("Erreur de récupération des images");
  }
}
