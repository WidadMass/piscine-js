"use client";

import { useState } from 'react';
import ChatWindow from "../frontend/components/ChatWindow";
import Composer from "../frontend/components/Composer";
import LoginModal from "../frontend/components/LoginModal";
import { useChat } from "../frontend/hooks/useChat";
import { useAuth } from "../frontend/hooks/useAuth";

export default function HomePage() {
  const { user, logout } = useAuth();
  const { messages, input, setInput, isSending, canSend, error, send, onKeyDown, clearHistory } = useChat(user);
  const [showLogin, setShowLogin] = useState(false);

  // Interception de l'envoi
  const handleSend = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    send();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (!user) {
        e.preventDefault();
        setShowLogin(true);
        return;
      }
    }
    onKeyDown(e);
  };

  return (
    <div className="container">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      
      <div className="header">
        <div className="brand">
          <div className="logo" />
          <div className="title">
            <h1>SuNa-GPT</h1>
            {user && <span className="subtitle">Bonjour, {user.username}</span>}
          </div>
        </div>

        <div className="actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {user ? (
            <>
              <button 
                onClick={clearHistory} 
                className="btn-secondary" 
                title="Effacer historique"
                style={{
                  background: 'rgba(255, 50, 50, 0.2)',
                  border: '1px solid rgba(255, 50, 50, 0.4)',
                  color: '#ff6b6b'
                }}
              >
                🗑️
              </button>
              <button onClick={logout} className="btn-secondary">
                Déconnexion
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} className="btn-primary">
              Connexion
            </button>
          )}
          
          <div className="pill">
            <span className="dot" />
            <span>{isSending ? "..." : "Prêt"}</span>
          </div>
        </div>
      </div>

      <div className="shell chatWrap">
        <ChatWindow messages={messages} />
        <Composer
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          // On ne désactive pas, mais on intercepte
          disabled={isSending} 
          error={error}
          placeholder={user ? "Écrivez un message..." : "Connectez-vous pour parler..."}
        />
      </div>

      <style jsx>{`
        .subtitle {
          font-size: 0.8rem;
          color: #666;
          margin-left: 10px;
        }
        .btn-secondary {
          background: #f0f0f0;
          border: 1px solid #ccc;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-primary {
          background: #0070f3;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
