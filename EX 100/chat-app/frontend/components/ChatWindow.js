import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (!messages || messages.length === 0) {
    return (
      <div className="messages empty">
        <div className="hint">
          <div className="hint-icon">💬</div>
          <h3>Commencer la conversation</h3>
          <p>Écrivez un message ci-dessous pour démarrer.</p>
          <div className="shortcuts">
            <kbd>Entrée</kbd> Envoyer
            <kbd>Shift + Entrée</kbd> Ligne
          </div>
        </div>
        <style jsx>{`
          .messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .empty {
            align-items: center;
            justify-content: center;
          }
          .hint {
            background: rgba(255, 255, 255, 0.03);
            border: 1px dashed rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            backdrop-filter: blur(10px);
          }
          .hint-icon {
            font-size: 40px;
            margin-bottom: 20px;
            opacity: 0.8;
          }
          h3 {
            margin: 0 0 10px;
            color: white;
            font-size: 1.2rem;
          }
          p {
            color: rgba(255, 255, 255, 0.6);
            margin: 0 0 20px;
          }
          .shortcuts {
            display: flex;
            gap: 15px;
            justify-content: center;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
          }
          kbd {
            background: rgba(255, 255, 255, 0.1);
            padding: 4px 8px;
            border-radius: 6px;
            font-family: inherit;
            color: rgba(255, 255, 255, 0.9);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="messages">
      {messages.map((m) => (
        <MessageBubble key={m.id || `${m.role}-${m.createdAt}`} message={m} />
      ))}
      <div ref={endRef} />
      
      <style jsx>{`
        .messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .messages::-webkit-scrollbar {
          width: 6px;
        }
        .messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .messages::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .messages::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}
