import { NextResponse } from 'next/server';
import { getMessages, createMessage, getAIResponse, deleteMessages } from '../../../backend/services/chatService';
import prisma from '../../../backend/lib/prisma'; // Need prisma here for creating conversation

export async function GET(request) {
  // Récupération du username depuis les query params
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  // Si pas de username, on renvoie une liste vide pour éviter de leaker les données des autres
  if (!username) {
    return NextResponse.json([]);
  }

  const messages = await getMessages(username);
  return NextResponse.json(messages);
}

export async function POST(request) {
  try {
    let { message, username, conversationId } = await request.json();

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
             title: message.substring(0, 30) + "..." // Titre temporaire
           }
         });
         conversationId = newConv.id;
       }
    }

    // 1. Sauvegarder le message utilisateur lié à la conversation
    await createMessage('user', message, username, conversationId);

    // 2. Générer la réponse IA avec le contexte de cette conversation
    const aiResponseContent = await getAIResponse(message, username, conversationId);

    // 3. Sauvegarder le message de l'IA lié à la même conversation
    const aiMessage = await createMessage('assistant', aiResponseContent, username, conversationId);

    // Retourner la réponse ET l'ID de la conversation (pour que le front s'y accroche)
    return NextResponse.json({
      reply: aiMessage.content,
      conversationId: conversationId,
      ...aiMessage
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
