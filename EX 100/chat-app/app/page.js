"use client";

import { useState, useEffect, Suspense } from 'react';
import ChatWindow from "../frontend/components/ChatWindow";
import Composer from "../frontend/components/Composer";
import LoginModal from "../frontend/components/LoginModal";
import Sidebar from "../frontend/components/Sidebar"; // Import Sidebar
import { useChat } from "../frontend/hooks/useChat";
import { useAuth } from "../frontend/hooks/useAuth";
import { useRouter, useSearchParams } from 'next/navigation';

// Composant séparé pour gérer le retour Google
function GoogleAuthHandler() {
  const { loginWithToken } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    const username = searchParams.get('username');

    if (token && username) {
      loginWithToken({ username }, token);
      router.replace('/');
    }
  }, [searchParams, router, loginWithToken]);

  return null;
}

export default function HomePage() {
  const { user, logout } = useAuth();
  const { messages, input, setInput, isSending, canSend, error, send, onKeyDown, clearHistory } = useChat(user);
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // État pour la sidebar

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
      <Suspense fallback={null}>
        <GoogleAuthHandler />
      </Suspense>
      
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      
      <div className="layout">
        <Sidebar 
          isOpen={sidebarOpen} 
          onNewChat={clearHistory}
          history={[]} /* Pour l'instant vide, à connecter plus tard */
        />

        <div className="main-content">
          <div className="header">
            <div className="brand">
              <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
              </button>
              <div className="logo" />
              <div className="title">
                <h1>SuNa-GPT</h1>
                {user && <span className="subtitle">Bonjour, {user.username}</span>}
              </div>
            </div>

            <div className="actions">
              {user ? (
                <>
                  <button 
                    onClick={clearHistory} 
                    className="btn-icon" 
                    title="Effacer historique"
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
            </div>
          </div>

          <div className="shell chatWrap">
            <ChatWindow messages={messages} />
            <Composer
              value={input}
              onChange={setInput}
              onSend={handleSend}
              onKeyDown={handleKeyDown}
              disabled={isSending} 
              error={error}
              placeholder={user ? "Écrivez un message..." : "Connectez-vous pour parler..."}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .layout {
          display: flex;
          height: 100%;
          overflow: hidden;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
          height: 100%;
          position: relative;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          margin-bottom: 20px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
        }

        .toggle-sidebar-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          font-size: 1.5rem;
          cursor: pointer;
          margin-right: 15px;
          padding: 5px;
          border-radius: 8px;
        }
        .toggle-sidebar-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #e879f9);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .title h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(to right, #fff, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          display: block;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 20px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 10px #4ade80;
        }

        .shell {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          overflow: hidden;
          position: relative;
          min-height: 0;
        }

        .chatWrap {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .btn-primary {
          background: #7c3aed;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          background: #6d28d9;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .btn-icon {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: #fca5a5;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-icon:hover {
          background: rgba(220, 38, 38, 0.2);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
