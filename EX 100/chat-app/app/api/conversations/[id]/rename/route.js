import { NextResponse } from 'next/server';
import prisma from '../../../../../backend/lib/prisma';

// PATCH: Renommer une conversation
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { title } = await request.json();
    
    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Titre requis' }, { status: 400 });
    }

    const updated = await prisma.conversation.update({
      where: { id: parseInt(id) },
      data: { title: title.trim() }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error renaming conversation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
