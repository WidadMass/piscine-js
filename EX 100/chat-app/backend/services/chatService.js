import prisma from '../lib/prisma';
import OpenAI from 'openai';

// Configuration pour Grok (xAI)
const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || 'dummy_key',
  baseURL: 'https://api.x.ai/v1',
});

export async function getMessages(username = null) {
  try {
    const where = {};
    if (username) {
      where.username = username;
    }
    
    return await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });
  } catch (error) {
    console.error("Erreur DB (getMessages):", error);
    return [];
  }
}

export async function deleteMessages(username = null) {
  try {
    const where = {};
    if (username) {
      where.username = username;
    }
    return await prisma.message.deleteMany({ where });
  } catch (error) {
    console.error("Erreur DB (deleteMessages):", error);
    throw new Error('Impossible de supprimer les messages');
  }
}

export async function createMessage(role, content, username = null) {
  try {
    const data = { role, content };
    
    // Gestion du username et de la relation User
    if (username) {
      data.username = username;
      
      // Si c'est un message utilisateur, on essaie de lier à la table User
      if (role === 'user') {
        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
          data.user = { connect: { id: user.id } };
        }
      }
    }

    return await prisma.message.create({
      data,
    });
  } catch (error) {
    console.error("Erreur DB (createMessage):", error);
    throw new Error('Impossible de sauvegarder le message');
  }
}

export async function getAIResponse(userMessage, username = null) {
  try {
    // 1. Récupérer les 10 derniers messages pour le contexte
    const where = {};
    if (username) {
      where.username = username;
    }

    const lastMessages = await prisma.message.findMany({
      where,
      take: 10,
      orderBy: { createdAt: 'desc' }, // On prend les plus récents
    });

    // 2. Les remettre dans l'ordre chronologique et format Groq
    const history = lastMessages.reverse().map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // 3. Ajouter le message système et le nouveau message utilisateur (qui n'est pas encore en DB quand on appelle cette fonction, ou on pourrait l'ajouter avant)
    // Note: Dans route.js, on sauvegarde le userMessage AVANT d'appeler getAIResponse.
    // Donc il est PEUT-ÊTRE déjà dans lastMessages si on ne fait pas attention.
    // Vérifions route.js: await createMessage('user', message); PUIS getAIResponse(message).
    // Donc le dernier message en DB EST le message actuel.
    // Cependant, pour éviter les doublons ou confusions, on va construire le prompt explicitement.
    
    // Pour être propre : on prend l'historique *précédent* le message actuel.
    // Mais le plus simple avec l'API "chat" est d'envoyer toute la conversation.
    
    const messagesToSend = [
      { role: 'system', content: 'Tu es un assistant utile et concis en français. Tu as accès à l\'historique de la conversation ci-dessous.' },
      ...history
    ];

    // Si le dernier message de l'historique n'est PAS le message actuel (cas de latence d'écriture), on l'ajoute. 
    // Mais comme on a fait await createMessage, il DEVRAIT y être.
    // Par sécurité, si le dernier message de history n'est pas userMessage, on l'ajoute.
    const lastHistoryMsg = history[history.length - 1];
    if (!lastHistoryMsg || lastHistoryMsg.content !== userMessage) {
       messagesToSend.push({ role: 'user', content: userMessage });
    }

    const completion = await openai.chat.completions.create({
      messages: messagesToSend,
      model: 'grok-4-latest',
    });

    return completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Erreur Grok (xAI):", error);
    return "Je rencontre des difficultés techniques pour répondre pour le moment.";
  }
}
