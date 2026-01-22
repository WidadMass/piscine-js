import prisma from '../lib/prisma';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getMessages() {
  try {
    return await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
    });
  } catch (error) {
    console.error("Erreur DB (getMessages):", error);
    return [];
  }
}

export async function createMessage(role, content) {
  try {
    return await prisma.message.create({
      data: { role, content },
    });
  } catch (error) {
    console.error("Erreur DB (createMessage):", error);
    throw new Error('Impossible de sauvegarder le message');
  }
}

export async function getAIResponse(userMessage) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'Tu es un assistant utile et concis en français.' },
        { role: 'user', content: userMessage },
      ],
      model: 'llama-3.1-8b-instant',
    });

    return chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Erreur Groq:", error);
    return "Je rencontre des difficultés techniques pour répondre pour le moment.";
  }
}
