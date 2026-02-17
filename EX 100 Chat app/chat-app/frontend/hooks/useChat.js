import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function nowIso() {
  return new Date().toISOString();
}

export function useChat(user = null, conversationId = null, onNewConversation = null) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const canSend = useMemo(() => {
    return !isSending && input.trim().length > 0;
  }, [isSending, input]);

  // Annule la requête si on change de page/reload
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  // Charger les messages quand la conversation change
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    // Si on est en train d'envoyer (création de nouvelle conv), on ne recharge pas tout de suite
    // pour éviter d'effacer les messages en cours de streaming.
    if (isSending) return;

    if (conversationId) {
      // Charger messages de la conversation
      setMessages([]); // Reset pour feedback visuel immédiat
      fetch(`/api/conversations/${conversationId}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setMessages(data);
        })
        .catch(err => console.error(err));
    } else {
      setMessages([]); // Nouvelle conversation vide
    }
  }, [conversationId, user, isSending]);

  const send = useCallback(async () => {
    const content = input.trim();
    if (!content || isSending) return;

    setError("");
    setIsSending(true);

    const tempUserMsg = {
      id: `tmp-u-${Date.now()}`,
      role: "user",
      content,
      username: user ? user.username : null,
      createdAt: nowIso(),
    };

    // Message "assistant" temporaire (typing)
    const tempAssistantMsg = {
      id: `tmp-a-${Date.now() + 1}`,
      role: "assistant",
      content: "...",
      createdAt: nowIso(),
      _pending: true,
    };

    setMessages((prev) => [...prev, tempUserMsg, tempAssistantMsg]);
    setInput("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const body = { message: content };
      if (user && user.username) {
        body.username = user.username;
      }
      if (conversationId) {
        body.conversationId = conversationId;
      }

      // Récupération du token pour l'ajouter aux headers
      const token = localStorage.getItem('chat_token');
      const headers = { 
        "Content-Type": "application/json" 
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        signal: controller.signal,
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      // Gestion du streaming
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let streamedResponse = "";
      let isFirstChunk = true;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        let textToAdd = chunk;

        // Traitement du header JSON spécial
        if (isFirstChunk) {
            const parts = chunk.split("\n__JSON_END__\n");
            if (parts.length > 1) {
                try {
                    const meta = JSON.parse(parts[0]);
                    if (!conversationId && meta.conversationId && onNewConversation) {
                        onNewConversation(meta.conversationId);
                    }
                    textToAdd = parts[1]; // Le reste est du texte
                } catch (e) { console.error("Error parsing meta", e); }
            }
            isFirstChunk = false;
        }

        streamedResponse += textToAdd;

        setMessages((prev) =>
            prev.map((m) =>
            m._pending ? { ...m, content: streamedResponse } : m
            )
        );
      }
      
      // Finalisation
      setMessages((prev) =>
        prev.map((m) =>
          m._pending ? { ...m, content: streamedResponse, _pending: false } : m
        )
      );

      setIsSending(false);
      abortRef.current = null;
    } catch (e) {
      if (e.name === 'AbortError') return;
      // On retire le message pending et on garde le message user
      setMessages((prev) => prev.filter((m) => !m._pending));
      setError(e?.message || "Erreur réseau.");
      setIsSending(false);
      abortRef.current = null;
    }
  }, [input, isSending, user]);

  const onKeyDown = useCallback(
    (e) => {
      // Enter = envoyer, Shift+Enter = nouvelle ligne
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (canSend) send();
      }
    },
    [canSend, send]
  );

  const clearHistory = useCallback(async () => {
    if (!globalThis.confirm("Voulez-vous vraiment effacer tout l'historique ?")) return;
    
    if (!user || !user.username) return;

    try {
      setIsSending(true);
      const token = localStorage.getItem('chat_token');
      const headers = token ? { "Authorization": `Bearer ${token}` } : {};

      await fetch(`/api/chat?username=${encodeURIComponent(user.username)}`, { 
        method: 'DELETE',
        headers
      });
      setMessages([]);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setIsSending(false);
    }
  }, []);

  return {
    messages,
    input,
    setInput,
    isSending,
    canSend,
    error,
    send,
    onKeyDown,
    clearHistory,
  };
}
