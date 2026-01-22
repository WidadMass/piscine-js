import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (!messages || messages.length === 0) {
    return (
      <div className="messages">
        <div className="hint">
          Écris un message pour commencer.<br />
          Note : <kbd>Entrée</kbd> pour envoyer, <kbd>Shift</kbd> +{" "}
          <kbd>Entrée</kbd> pour aller à la ligne.
        </div>
      </div>
    );
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <MessageBubble key={m.id || `${m.role}-${m.createdAt}`} message={m} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
