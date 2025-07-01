 // routes/elders.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()// GET - Récupérer toutes les photos des elders
export async function GET(request: NextRequest) {
  try {
    // Récupérer tous les elders avec leurs photos
    const eldersPicture = await prisma.elders.findMany({
      select: {
        id: true,
        picture: true
      }
    })   
     return NextResponse.json(eldersPicture)  } catch (error) {
    console.error('Erreur lors de la récupération des photos des elders:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}