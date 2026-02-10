"use client";

import { useState, useEffect, Suspense } from 'react';
import ChatWindow from "../frontend/components/ChatWindow";
import Composer from "../frontend/components/Composer";
import LoginModal from "../frontend/components/LoginModal";
import Sidebar from "../frontend/components/Sidebar";
import TemplateSelector from "../frontend/components/TemplateSelector";
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
  
  // États locaux pour gérer les conversations
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  
  // Fonction pour rafraîchir la liste des conversations
  const refreshConversations = () => {
    if (user) {
      fetch(`/api/conversations?username=${encodeURIComponent(user.username)}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setConversations(data);
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (user) {
      refreshConversations();
    } else {
      setConversations([]);
      setCurrentConversationId(null);
    }
  }, [user]);

  // Callback quand une nouvelle conversation est créée via le chat
  const handleNewConversation = (id) => {
    setCurrentConversationId(id);
    refreshConversations();
  };

  const { messages, input, setInput, isSending, canSend, error, send, onKeyDown, clearHistory } = useChat(
    user, 
    currentConversationId,
    handleNewConversation
  );

  const [showLogin, setShowLogin] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Gestion changement de conversation depuis la sidebar
  const handleSelectChat = (id) => {
    setCurrentConversationId(id);
  };
  
  const handleNewChat = () => {
    setCurrentConversationId(null);
  };

  const handleSelectTemplate = (templateContent) => {
    setInput(templateContent);
  };

  // Suppression d'une conversation spécifique (optionnel, pour l'instant on garde clearHistory global ou on adapte)
  // Pour l'instant clearHistory vide le chat courant dans useChat. 
  // Idéalement on voudrait supprimer la conversation courante.

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
      {showTemplates && (
        <TemplateSelector 
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setShowTemplates(false)} 
        />
      )}
      <Suspense fallback={null}>
        <GoogleAuthHandler />
      </Suspense>
      
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      
      <div className="layout">
        <Sidebar 
          isOpen={sidebarOpen} 
          onNewChat={handleNewChat}
          history={conversations}
          currentId={currentConversationId}
          onSelectChat={handleSelectChat}
          onOpenTemplates={() => setShowTemplates(true)}
          onLogout={logout}
          user={user}
        />

        <div className="main-content">
          <div className="header">
            <div className="brand">
              <button 
                className="toggle-sidebar-btn" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title="Afficher/Masquer la sidebar"
              >
                |||
              </button>
              <div className="logo" />
              <div className="title">
                <h1>SuNa-GPT</h1>
              </div>
            </div>

            <div className="actions">
              {user ? (
                <>
                  <button 
                    onClick={clearHistory} 
                    className="btn-icon" 
                    title="Vider la conversation actuelle"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
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

        .btn-template {
          background: rgba(124, 58, 237, 0.15);
          border: 1px solid rgba(124, 58, 237, 0.3);
          color: #c4b5fd;
          padding: 8px 14px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-template:hover {
          background: rgba(124, 58, 237, 0.25);
          border-color: rgba(124, 58, 237, 0.5);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
