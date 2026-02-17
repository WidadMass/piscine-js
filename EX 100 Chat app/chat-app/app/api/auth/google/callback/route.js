import { NextResponse } from 'next/server';
import prisma from '../../../../../backend/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/?error=google_auth_error', request.url));
  }

  try {
    // 1. Échanger le code contre un token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000/api/auth/google/callback',
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    
    if (!tokens.access_token) {
      console.error('Google Token Error:', tokens);
      return NextResponse.redirect(new URL('/?error=google_token_error', request.url));
    }

    // 2. Récupérer les infos utilisateur
    const userResponse = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${tokens.access_token}`
    );
    const googleUser = await userResponse.json();

    // 3. Trouver ou Créer l'utilisateur dans la DB
    // On cherche d'abord par googleId, puis par email
    let user = await prisma.user.findFirst({
      where: { 
        OR: [
          { googleId: googleUser.id },
          { googleEmail: googleUser.email }
        ]
      }
    });

    if (!user) {
      // Création d'un nouveau compte
      // Génération d'un username unique
      let baseUsername = googleUser.given_name || googleUser.name?.split(' ')[0] || "User";
      // Nettoyage du username (lettres et chiffres seulement)
      baseUsername = baseUsername.replace(/[^a-zA-Z0-9]/g, '');
      
      let uniqueUsername = baseUsername;
      let counter = 1;
      
      while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
        uniqueUsername = `${baseUsername}${counter}`;
        counter++;
      }

      user = await prisma.user.create({
        data: {
          username: uniqueUsername,
          googleId: googleUser.id,
          googleEmail: googleUser.email,
          avatar: googleUser.picture,
          // Pas de password pour les utilisateurs Google
        }
      });
    } else {
      // Mise à jour si compte existant (Link Account)
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { 
            googleId: googleUser.id,
            avatar: googleUser.picture || user.avatar
          }
        });
      }
    }

    // 4. Créer le JWT de notre application
    const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Rediriger vers l'accueil avec le token
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('token', token);
    redirectUrl.searchParams.set('username', user.username);
    
    return NextResponse.redirect(redirectUrl);

  } catch (err) {
    console.error('Callback Error:', err);
    return NextResponse.redirect(new URL('/?error=server_error', request.url));
  }
}
