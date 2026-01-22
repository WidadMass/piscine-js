"use client";

import ChatWindow from "../frontend/components/ChatWindow";
import Composer from "../frontend/components/Composer";
import { useChat } from "../frontend/hooks/useChat";

export default function HomePage() {
  const { messages, input, setInput, isSending, canSend, error, send, onKeyDown } =
    useChat();

  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="logo" />
          <div className="title">
            <h1>SuNa-GPT</h1>
          </div>
        </div>

        <div className="pill">
          <span className="dot" />
          <span>{isSending ? "Entrain de répondre…" : "Prêt"}</span>
        </div>
      </div>

      <div className="shell chatWrap">
        <ChatWindow messages={messages} />
        <Composer
          value={input}
          onChange={setInput}
          onSend={send}
          onKeyDown={onKeyDown}
          disabled={!canSend}
          error={error}
        />
      </div>
    </div>
  );
}
