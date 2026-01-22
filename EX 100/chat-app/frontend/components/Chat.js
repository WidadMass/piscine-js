"use client";

import { useChat } from '../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function Chat() {
  const { messages, loading, sendMessage } = useChat();

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} disabled={loading} />
    </div>
  );
}
