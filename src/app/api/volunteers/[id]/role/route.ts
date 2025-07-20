// src/app/api/volunteers/[id]/role/route.ts

// - PATCH http://localhost:3000/api/volunteers/7/role (avec un corps JSON pour la mise à jour)
// je modifie le rôle du volunteer avec l'id 7
// dans le body (JSON) :
// {
//   "role": "volunteer"
// }

// - DELETE http://localhost:3000/api/volunteers/2

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { role } = await req.json();

  const volunteerId = parseInt(id, 10);
  if (isNaN(volunteerId)) {
    return NextResponse.json({ message: "ID invalide" }, { status: 400 });
  }

  try {
    const updatedVolunteer = await prisma.volunteers.update({
      where: { id: volunteerId },
      data: { role },
    });

    return NextResponse.json({ success: true, data: updatedVolunteer });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
