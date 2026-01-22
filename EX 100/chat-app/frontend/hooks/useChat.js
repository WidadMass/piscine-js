import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function nowIso() {
  return new Date().toISOString();
}

export function useChat() {
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

  const send = useCallback(async () => {
    const content = input.trim();
    if (!content || isSending) return;

    setError("");
    setIsSending(true);

    const tempUserMsg = {
      id: `tmp-u-${Date.now()}`,
      role: "user",
      content,
      createdAt: nowIso(),
    };

    // Message "assistant" temporaire (typing)
    const tempAssistantMsg = {
      id: `tmp-a-${Date.now() + 1}`,
      role: "assistant",
      content: "…",
      createdAt: nowIso(),
      _pending: true,
    };

    setMessages((prev) => [...prev, tempUserMsg, tempAssistantMsg]);
    setInput("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ message: content }),
      });

      if (!res.ok) {
        let txt = "Erreur serveur.";
        try {
          const data = await res.json();
          if (data?.error) txt = data.error;
        } catch {}
        throw new Error(txt);
      }

      const data = await res.json();

      // Si le backend renvoie l'historique complet
      if (Array.isArray(data?.messages)) {
        setMessages(data.messages);
        setIsSending(false);
        abortRef.current = null;
        return;
      }

      // Sinon, on remplace juste le "…" par reply
      const reply = data?.reply ?? "(Pas de réponse)";
      setMessages((prev) =>
        prev.map((m) =>
          m._pending ? { ...m, content: reply, _pending: false } : m
        )
      );

      setIsSending(false);
      abortRef.current = null;
    } catch (e) {
      // On retire le message pending et on garde le message user (optionnel)
      setMessages((prev) => prev.filter((m) => !m._pending));
      setError(e?.message || "Erreur réseau.");
      setIsSending(false);
      abortRef.current = null;
    }
  }, [input, isSending]);

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

  return {
    messages,
    input,
    setInput,
    isSending,
    canSend,
    error,
    send,
    onKeyDown,
  };
}
