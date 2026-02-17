import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const PEPPER = process.env.PEPPER_SECRET || 'dev_pepper';

export async function register(username, password) {
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new Error('Cet utilisateur existe déjà.');
  }

  // Ajout du "Pepper" au mot de passe avant hashage
  const saltedPassword = password + PEPPER;
  const hashedPassword = await bcrypt.hash(saltedPassword, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  
  // Génération du Token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' } // Valable 7 jours
  );

  return { user: userWithoutPassword, token };
}

export async function login(username, password) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error('Utilisateur inconnu.');
  }

  // Vérification avec le Pepper
  const saltedPassword = password + PEPPER;

  // Si l'utilisateur n'a pas de mot de passe (ex: compte Google), on refuse l'accès par mot de passe
  if (!user.password) {
    throw new Error('Ce compte ne possède pas de mot de passe (Connexion Google ?).');
  }

  const isValid = await bcrypt.compare(saltedPassword, user.password);

  if (!isValid) {
    throw new Error('Mot de passe incorrect.');
  }

  const { password: _, ...userWithoutPassword } = user;

  // Génération du Token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { user: userWithoutPassword, token };
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
