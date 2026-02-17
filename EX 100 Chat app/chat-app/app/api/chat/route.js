import { NextResponse } from 'next/server';
import { getMessages, createMessage, getAIStream, deleteMessages } from '../../../backend/services/chatService';
import { verifyToken } from '../../../backend/services/authService';
import prisma from '../../../backend/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  // Sécurisation basique : check token header
  /*
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || decoded.username !== username) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  */

  if (!username) return NextResponse.json([]);

  const messages = await getMessages(username);
  return NextResponse.json(messages);
}

export async function POST(request) {
  try {
    // Vérification du Token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
    }

    let { message, username, conversationId } = await request.json();

    // Sécurité : On force le username du token à la place de celui du body
    // pour empêcher l'usurpation
    username = decoded.username;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 });
    }

    // 0. Si pas de conversationId, on en crée une nouvelle
    if (!conversationId && username) {
       const user = await prisma.user.findUnique({ where: { username } });
       if (user) {
         const newConv = await prisma.conversation.create({
           data: {
             userId: user.id,
             title: message.substring(0, 30) + "..."
           }
         });
         conversationId = newConv.id;
       }
    }

    // 1. Sauvegarder le message utilisateur
    await createMessage('user', message, username, conversationId);

    // 2. Générer le stream IA
    const stream = await getAIStream(message, username, conversationId);

    // 3. Créer une réponse lisible (ReadableStream) qui intercepte pour sauvegarder
    const encoder = new TextEncoder();
    let fullResponse = "";

    const customStream = new ReadableStream({
      async start(controller) {
        try {
          // On envoie d'abord les métadonnées (conversationId) dans un format spécial
          // Par exemple un préfixe JSON sur la première ligne
          const meta = JSON.stringify({ conversationId });
          controller.enqueue(encoder.encode(meta + "\n__JSON_END__\n"));

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              fullResponse += text;
              controller.enqueue(encoder.encode(text));
            }
          }
          
          // Fin du stream : sauvegarde en DB
          if (fullResponse) {
             console.log("Saving full response to DB length:", fullResponse.length);
             await createMessage('assistant', fullResponse, username, conversationId);
          }
          controller.close();
        } catch (err) {
          console.error("Stream error", err);
          controller.error(err);
        }
      }
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  
  if (!username) {
     return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  await deleteMessages(username);
  return NextResponse.json({ success: true });
}
