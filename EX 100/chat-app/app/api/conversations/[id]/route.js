import { NextResponse } from 'next/server';
import prisma from '../../../../backend/lib/prisma';

// GET: Récupérer les messages d'une conversation spécifique
export async function GET(request, { params }) {
  const { id } = params;
  const conversationId = parseInt(id);

  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching conversation messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Supprimer une conversation
export async function DELETE(request, { params }) {
  const { id } = params;
  const conversationId = parseInt(id);

  try {
    await prisma.conversation.delete({
      where: { id: conversationId }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
