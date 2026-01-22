import { NextResponse } from 'next/server';
import { getMessages, createMessage, getAIResponse, deleteMessages } from '../../../backend/services/chatService';

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function DELETE() {
  await deleteMessages();
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  try {
    const { message, username } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message vide' }, { status: 400 });
    }

    await createMessage('user', message, username);

    const aiResponseContent = await getAIResponse(message);

    const aiMessage = await createMessage('assistant', aiResponseContent);

    return NextResponse.json({
      reply: aiMessage.content,
      ...aiMessage
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
