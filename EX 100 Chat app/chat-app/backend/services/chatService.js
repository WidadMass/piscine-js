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

export async function createMessage(role, content, username = null, conversationId = null) {
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

    if (conversationId) {
      data.conversation = { connect: { id: parseInt(conversationId) } };
    }

    const message = await prisma.message.create({
      data,
    });

    // Optionnel : Mettre à jour le titre de la conversation si c'est le premier message
    if (conversationId && role === 'user') {
      const count = await prisma.message.count({ where: { conversationId: parseInt(conversationId) } });
      if (count <= 1) {
        // C'est le premier message, on utilise une version tronquée comme titre
        const shortTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
        await prisma.conversation.update({
          where: { id: parseInt(conversationId) },
          data: { title: shortTitle }
        });
      }

      // Toujours mettre à jour updatedAt
      await prisma.conversation.update({
         where: { id: parseInt(conversationId) },
         data: { updatedAt: new Date() }
      });
    }

    return message;
  } catch (error) {
    console.error("Erreur DB (createMessage):", error);
    throw new Error('Impossible de sauvegarder le message');
  }
}

export async function getAIResponse(userMessage, username = null, conversationId = null) {
  try {
    // 1. Récupérer le contexte : soit par conversationId (prioritaire), soit par username (legacy)
    const where = {};
    if (conversationId) {
      where.conversationId = parseInt(conversationId);
    } else if (username) {
      where.username = username;
    }

    // On récupère moins de messages pour ne pas saturer le contexte
    const lastMessages = await prisma.message.findMany({
      where,
      take: 20, 
      orderBy: { createdAt: 'desc' }, 
    });

    // 2. Les remettre dans l'ordre chronologique et format Groq
    const history = lastMessages.reverse().map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // SYSTEM PROMPT optimisé pour CV professionnel
    const { getSystemPromptForCV } = await import('./cvTemplates.js');
    const systemPrompt = getSystemPromptForCV();
    
    const messagesToSend = [
      { role: 'system', content: systemPrompt },
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

export async function getAIStream(userMessage, username = null, conversationId = null) {
  try {
    const where = {};
    if (conversationId) where.conversationId = parseInt(conversationId);
    else if (username) where.username = username;

    const lastMessages = await prisma.message.findMany({
      where,
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    const history = lastMessages.reverse().map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    const { getSystemPromptForCV } = await import('./cvTemplates.js');
    const systemPrompt = getSystemPromptForCV();
    
    const messagesToSend = [
      { role: 'system', content: systemPrompt },
      ...history
    ];

    const lastHistoryMsg = history[history.length - 1];
    if (!lastHistoryMsg || lastHistoryMsg.content !== userMessage) {
       messagesToSend.push({ role: 'user', content: userMessage });
    }

    return await openai.chat.completions.create({
      messages: messagesToSend,
      model: 'grok-4-latest',
      stream: true,
    });
  } catch (error) {
    console.error("Erreur Grok Stream:", error);
    throw error;
  }
}
