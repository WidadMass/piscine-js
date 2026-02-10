import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  
  const date = message.createdAt ? new Date(message.createdAt) : null;
  const time = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`row ${isUser ? "userRow" : "assistantRow"}`}>
      {!isUser && (
        <div className="avatar ai-avatar">
          <div className="avatar-content">AI</div>
        </div>
      )}
      
      <div className={`bubble ${isUser ? "userBubble" : "assistantBubble"}`}>
        {!isUser && (
          <button className="copy-btn" onClick={handleCopy} title="Copier le texte">
            {copied ? "COPIÉ" : "COPIER"}
          </button>
        )}
        
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
          max-width: 85%;
          background: rgba(255, 255, 255, 0.08); /* Gris clair translucide */
          border-top-left-radius: 4px;
          backdrop-filter: blur(8px);
          margin-left: 12px;
          min-width: 120px; /* Ensure space for copy button */
        }
        .copy-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 0.6rem;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          z-index: 10;
          opacity: 0;
          transform: translateY(-2px);
          user-select: none;
        }
        .bubble:hover .copy-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .copy-btn:hover {
          background: rgba(255,255,255,0.2);
          color: white;
          border-color: rgba(255,255,255,0.3);
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
          user-select: none;
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
        
        /* Markdown Styles for CVs */
        .message-content {
          line-height: 1.6;
          font-size: 0.95rem;
          padding-top: 10px; /* Space for copy button */
        }
        .message-content :global(p) { margin: 0 0 0.8em 0; }
        .message-content :global(h1) {
          font-size: 1.4em;
          border-bottom: 2px solid rgba(255,255,255,0.2);
          padding-bottom: 8px;
          margin-bottom: 16px;
          margin-top: 8px;
          color: #e879f9;
        }
        .message-content :global(h2) {
          font-size: 1.15em;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          padding-bottom: 4px;
          margin-top: 20px;
          margin-bottom: 12px;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .message-content :global(h3) {
          font-size: 1.05em;
          font-weight: 700;
          color: #e2e8f0;
          margin-top: 16px;
        }
        .message-content :global(ul), .message-content :global(ol) {
          margin: 0.5em 0;
          padding-left: 1.5em;
          color: #e2e8f0;
        }
        .message-content :global(hr) {
          border: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin: 20px 0;
        }
        .message-content :global(strong) {
          color: #fff;
          font-weight: 600;
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
          user-select: none;
        }
      `}</style>
    </div>
  );
}
