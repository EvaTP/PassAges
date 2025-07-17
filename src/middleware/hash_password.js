


console.log("début du script de hashage");

const bcrypt = require("bcrypt");
const saltRounds = 10; // Facteur de travail : nombre de fois que l'algorithme sera exécuté
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// hasher un mot de passe
const hashPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log("🔐 Mot de passe haché :", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("❌ Erreur lors du hachage du mot de passe :", error);
    throw error;
  }
};

hashPassword("monMotDePassesuperclasse");

// comparer les mots de passe
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      console.log("✅ Mot de passe valide");
    } else {
      console.log("❌ ⚠️ Mot de passe invalide");
    }
    return match;
  } catch (error) {
    console.error("Erreur lors de la vérification du mot de passe :", error);
    throw error;
  }
};

const plainPassword = "monMotDePasseSuperSecret";
const hashedPassword = "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p3t8PxyeKnVSS";
verifyPassword(plainPassword, hashedPassword);
