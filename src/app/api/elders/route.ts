// app/api/users/photos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET - Récupérer toutes les photos des utilisateurs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    // Si un userId spécifique est demandé
    if (userId) {
      const userPhotos = await prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          id: true,
          name: true,
          photos: true // Assumant que vous avez une relation photos
        }
      })
      
      if (!userPhotos) {
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(userPhotos)
    }
    
    // Récupérer toutes les photos de tous les utilisateurs
    const usersWithPhotos = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        photos: {
          select: {
            id: true,
            url: true,
            title: true,
            createdAt: true
          }
        }
      },
      where: {
        photos: {
          some: {} // Seulement les utilisateurs qui ont des photos
        }
      }
    })
    
    return NextResponse.json(usersWithPhotos)
    
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST - Ajouter une photo à un utilisateur (optionnel)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, url, title } = body
    
    if (!userId || !url) {
      return NextResponse.json(
        { error: 'userId et url sont requis' },
        { status: 400 }
      )
    }
    
    const newPhoto = await prisma.photo.create({
      data: {
        url,
        title: title || null,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    
    return NextResponse.json(newPhoto, { status: 201 })
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la photo:', error)
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}