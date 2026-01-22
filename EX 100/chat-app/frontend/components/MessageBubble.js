export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const date = message.createdAt ? new Date(message.createdAt) : null;
  const time = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`row ${isUser ? "userRow" : "assistantRow"}`}>
      <div className={`bubble ${isUser ? "userBubble" : "assistantBubble"}`}>
        {message.content}
        <div className="meta">
          <span className="tag">{isUser ? "Vous" : "IA"}</span>
          {time ? <span>{time}</span> : null}
        </div>
      </div>
    </div>
  );
}
