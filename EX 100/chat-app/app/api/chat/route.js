import { NextResponse } from 'next/server';
import { getMessages, createMessage, getAIResponse, deleteMessages } from '../../../backend/services/chatService';

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

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  
  if (!username) {
     return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  await deleteMessages(username);
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  try {
    const { message, username } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 });
    }

    await createMessage('user', message, username);

    const aiResponseContent = await getAIResponse(message, username);

    // IMPORTANT: On passe aussi le username au message de l'IA pour qu'il soit lié à l'utilisateur
    const aiMessage = await createMessage('assistant', aiResponseContent, username);

    // Retourner l'historique mis à jour (optionnel, mais utile pour sync)
    // Ici on retourne juste la réponse pour l'instant
    return NextResponse.json({
      reply: aiMessage.content,
      ...aiMessage
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
