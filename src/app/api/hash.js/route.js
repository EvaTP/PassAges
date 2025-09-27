import bcrypt from "bcrypt";
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// INSCRIPTION
export async function POST(req) {
  try {
    const body = await req.json();
    const { firstname, password } = body;

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.users.create({
      data: {
        firstname: firstname,
        hash_password: hash,
      },
    });

    console.log("Utilisateur créé :", newUser);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Erreur inscription :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// LOGIN
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, password } = body;

    const user = await prisma.volunteers.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    const result = await bcrypt.compare(password, user.hash_password);

    if (result) {
      console.log("Connexion réussie pour l'utilisateur :", id);
      return NextResponse.json(
        { success: true, message: "Connexion réussie" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erreur login :", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ancienne version
// inscription
// router.post("/", async (req, res) => {
//   const saltRounds = 10;

//   const { firstname: newFirstname, password: newPassword } = req.body;
//   bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
//     console.log("debug hash : ", hash);
//     // Store hash in your password DB.
//     const firstname = await prisma.users.create({
//       data: {
//         firstname: newFirstname,
//         hash_password: hash,
//       },
//     });
//   });
//   res.sendStatus(200);
// });

// login (on va chercher l'user par son ID dans la DB)
// router.post("/login", async (req, res) => {
//   const { id, password } = req.body;

//   const usersUnique = await prisma.volunteers.findUnique({
//     where: { id: id },
//   });
//   bcrypt.compare(
//     password,
//     usersUnique.hash_password,
//     async function (err, result) {
//       console.log("result: ", result);
//     }
//   );
//   res.sendStatus(200);
// });
