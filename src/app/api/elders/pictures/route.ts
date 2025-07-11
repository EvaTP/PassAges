// // app/api/elders/pictures/route.ts - Photos des elders
// // http://localhost:3000/api/elders/pictures

// import { PrismaClient } from "@prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// // GET - Récupérer toutes les photos des elders
// export async function GET(request: NextRequest) {
//   try {
//     // Récupérer tous les elders avec leurs photos
//     const eldersPicture = await prisma.elders.findMany({
//       select: {
//         id: true,
//         picture: true,
//       },
//     });
//     console.log("Nombre de photos d'elders trouvées:", eldersPicture.length);

//     return NextResponse.json({
//       success: true,
//       data: eldersPicture,
//       count: eldersPicture.length,
//     });
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération des photos des elders:",
//       error
//     );

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Erreur lors de la récupération des photos des elders",
//         details: error instanceof Error ? error.message : "Erreur inconnue",
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }
