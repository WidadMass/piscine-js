import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const date = message.createdAt ? new Date(message.createdAt) : null;
  const time = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`row ${isUser ? "userRow" : "assistantRow"}`}>
      {!isUser && (
        <div className="avatar ai-avatar">
          <div className="avatar-content">AI</div>
        </div>
      )}
      
      <div className={`bubble ${isUser ? "userBubble" : "assistantBubble"}`}>
        <div className="message-content">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div className="meta">
          {time && <span className="time">{time}</span>}
        </div>
      </div>

      {isUser && (
        <div className="avatar user-avatar">
          <div className="avatar-content">Moi</div>
        </div>
      )}

      <style jsx>{`
        .row {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
        }
        .userRow {
          justify-content: flex-end;
        }
        .assistantRow {
          justify-content: flex-start;
        }
        .bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .userBubble {
          background: rgba(59, 130, 246, 0.2); /* Bleu translucide */
          border-top-right-radius: 4px;
          border-color: rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(8px);
          margin-right: 8px;
        }
        .assistantBubble {
          background: rgba(255, 255, 255, 0.08); /* Gris clair translucide */
          border-top-left-radius: 4px;
          backdrop-filter: blur(8px);
          margin-left: 8px;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .ai-avatar {
          background: linear-gradient(135deg, #7c3aed, #e879f9);
          color: white;
          margin-right: 4px;
        }
        .user-avatar {
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          color: white;
          margin-left: 4px;
        }
        .message-content {
          line-height: 1.5;
          font-size: 0.95rem;
        }
        .message-content :global(p) {
          margin: 0 0 0.5em 0;
        }
        .message-content :global(p:last-child) {
          margin-bottom: 0;
        }
        .message-content :global(ul), .message-content :global(ol) {
          margin: 0.5em 0;
          padding-left: 1.2em;
        }
        .message-content :global(li) {
          margin-bottom: 0.25em;
        }
        .message-content :global(h1), .message-content :global(h2), .message-content :global(h3) {
          font-weight: 700;
          margin: 0.75em 0 0.5em 0;
          font-size: 1.1em;
        }
        .message-content :global(code) {
          background: rgba(0,0,0,0.2);
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .message-content :global(pre) {
          background: rgba(0,0,0,0.2);
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 0.5em 0;
        }
        .message-content :global(pre code) {
          background: transparent;
          padding: 0;
        }
        .time {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
