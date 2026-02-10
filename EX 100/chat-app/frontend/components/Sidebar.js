export default function Sidebar({ isOpen, onNewChat, history = [], currentId, onSelectChat, onOpenTemplates, onLogout, user }) {
  // Organiser par date
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const categorized = {
    today: [],
    yesterday: [],
    thisWeek: [],
    older: []
  };

  history.forEach(chat => {
    const chatDate = new Date(chat.updatedAt || chat.createdAt);
    if (chatDate >= today) {
      categorized.today.push(chat);
    } else if (chatDate >= yesterday) {
      categorized.yesterday.push(chat);
    } else if (chatDate >= weekAgo) {
      categorized.thisWeek.push(chat);
    } else {
      categorized.older.push(chat);
    }
  });

  const renderSection = (title, chats) => {
    if (chats.length === 0) return null;
    return (
      <div className="history-group">
        <h3 className="section-title">{title}</h3>
        {chats.map((chat) => (
          <div key={chat.id} className="history-item-wrapper">
            <button 
              className={`history-item ${currentId === chat.id ? 'active' : ''}`}
              onClick={() => onSelectChat && onSelectChat(chat.id)}
              type="button"
            >
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="chat-icon" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="text-truncate">{chat.title || "Nouvelle conversation"}</span>
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="action-btn new-chat" onClick={onNewChat}>
          <span className="icon">+</span> Nouvelle conversation
        </button>
        {onOpenTemplates && (
          <button className="action-btn templates" onClick={onOpenTemplates}>
            <span className="icon"></span> Templates CV
          </button>
        )}
      </div>
      
      <div className="history-list">
        {history.length > 0 ? (
          <>
            {renderSection("Aujourd'hui", categorized.today)}
            {renderSection("Hier", categorized.yesterday)}
            {renderSection("7 derniers jours", categorized.thisWeek)}
            {renderSection("Plus ancien", categorized.older)}
          </>
        ) : (
          <div className="empty-history">
            <p>Historique vide</p>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {user && (
          <>
            <div className="user-profile">
              <div className="avatar-mini">{user.username.charAt(0).toUpperCase()}</div>
              <div className="user-name">{user.username}</div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              Déconnexion
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100%;
          background: #0f0f15;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 100;
        }
        
        button {
          font-family: inherit;
        }

        .sidebar.closed {
          width: 0;
          transform: translateX(-100%);
          overflow: hidden;
          opacity: 0;
        }
        
        .sidebar-header {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .action-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
        }
        
        .action-btn.new-chat {
          background: white;
          color: black;
          border: none;
        }
        .action-btn.new-chat:hover {
          background: #e2e8f0;
        }

        .action-btn.templates {
          background: rgba(255,255,255,0.05);
          color: #e2e8f0;
        }
        .action-btn.templates:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .icon {
          font-size: 1.1rem;
        }

        .history-list {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
        }
        
        .history-group {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
          padding-left: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .history-item-wrapper {
          display: block;
          width: 100%;
          margin-bottom: 4px;
        }

        .history-item {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 10px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
          outline: none;
          position: relative;
        }
        
        .history-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }
        
        .history-item.active {
          background: rgba(124, 58, 237, 0.15);
          color: white;
          border-left: 3px solid #7c3aed;
          padding-left: 9px; /* Compensate border */
        }

        .chat-icon {
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        
        .history-item:hover .chat-icon,
        .history-item.active .chat-icon {
          opacity: 1;
        }

        .text-truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.2;
        }

        /* Custom Scrollbar */
        .history-list {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
        }

        .history-list::-webkit-scrollbar {
          width: 4px;
        }
        .history-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .history-list::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .history-list::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .avatar-mini {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #e879f9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: bold;
          color: white;
        }

        .user-name {
          font-size: 0.85rem;
          color: white;
          font-weight: 500;
        }

        .logout-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          border-color: rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }
        
        .empty-history {
          text-align: center;
          padding: 40px 20px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 50;
            width: 80%;
            transform: translateX(-100%);
          }
          .sidebar.open {
            transform: translateX(0);
            width: 80%;
            opacity: 1;
            overflow: visible;
          }
        }
      `}</style>
    </aside>
  );
}
