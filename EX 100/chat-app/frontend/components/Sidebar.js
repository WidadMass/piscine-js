
export default function Sidebar({ isOpen, onNewChat, history = [] }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span className="plus">+</span> Nouveau Chat
        </button>
      </div>
      
      <div className="history-list">
        <div className="section-title">Aujourd'hui</div>
        {history.length > 0 ? (
          history.map((chat, idx) => (
            <button key={chat.id || idx} className="history-item">
              <span className="icon">💬</span>
              <span className="text">{chat.title || "Nouvelle conversation"}</span>
            </button>
          ))
        ) : (
          <div className="empty-history">Aucun historique récent</div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="footer-link">Gérer mon compte</div>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100%;
          background: rgba(10, 10, 20, 0.6);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: width 0.3s ease, transform 0.3s ease;
        }
        
        .sidebar.closed {
          width: 0;
          transform: translateX(-100%);
          overflow: hidden;
          opacity: 0;
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

        .sidebar-header {
          padding: 20px;
        }

        .new-chat-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .new-chat-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .history-list {
          flex: 1;
          overflow-y: auto;
          padding: 0 10px;
        }

        .section-title {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          padding: 10px 10px 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .history-item {
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          transition: background 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .history-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .empty-history {
          padding: 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.85rem;
          font-style: italic;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-link {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </aside>
  );
}
