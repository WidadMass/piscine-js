import { NextResponse } from 'next/server';
import prisma from '../../../backend/lib/prisma';

// GET: Récupérer toutes les conversations d'un utilisateur
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json([], { status: 200 }); // User not found, empty list
    }

    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { messages: true }
        }
      }
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Créer une nouvelle conversation
export async function POST(request) {
  try {
    const { username, title } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const conversation = await prisma.conversation.create({
      data: {
        title: title || 'Nouvelle conversation',
        userId: user.id
      }
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
