import prisma from '../lib/prisma';

// Création d'un User si besoin
export async function loginOrRegister(username, password) {
  try {
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Inscription automatique simplifiée pour l'exercice
      user = await prisma.user.create({
        data: { username, password },
      });
    } else {
      // Vérification mot de passe basique
      if (user.password !== password) {
        throw new Error('Mot de passe incorrect');
      }
    }
    
    // On ne renvoie pas le mot de passe
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Auth Error:", error);
    throw error;
  }
}
