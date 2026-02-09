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
        <div className="message-content">{message.content}</div>
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
        }
        .time {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }
      `}</style>
    </div>
  );
}
