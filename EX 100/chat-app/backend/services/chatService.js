import prisma from '../lib/prisma';
import Groq from 'groq-sdk';

// On utilise une clé vide par défaut pour le build
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key_for_build', 
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

export async function deleteMessages() {
  try {
    return await prisma.message.deleteMany({});
  } catch (error) {
    console.error("Erreur DB (deleteMessages):", error);
    throw new Error('Impossible de supprimer les messages');
  }
}

export async function createMessage(role, content, username = null) {
  try {
    const data = { role, content };
    if (username) {
      data.username = username;
    }
    return await prisma.message.create({
      data,
    });
  } catch (error) {
    console.error("Erreur DB (createMessage):", error);
    throw new Error('Impossible de sauvegarder le message');
  }
}

export async function getAIResponse(userMessage) {
  try {
    // 1. Récupérer les 10 derniers messages pour le contexte
    const lastMessages = await prisma.message.findMany({
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

    const chatCompletion = await groq.chat.completions.create({
      messages: messagesToSend,
      model: 'llama-3.1-8b-instant',
    });

    return chatCompletion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Erreur Groq:", error);
    return "Je rencontre des difficultés techniques pour répondre pour le moment.";
  }
}
