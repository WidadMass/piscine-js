"use client";

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password, mode);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === 'login' ? 'Connexion' : 'Inscription'}</h2>
        <p>
          {mode === 'login' 
            ? 'Veuillez vous identifier pour participer.' 
            : 'Créez un compte pour rejoindre la conversation.'}
        </p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Utilisateur:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Annuler</button>
            <button type="submit" className="login-btn">
              {mode === 'login' ? 'Se connecter' : "S'inscrire"}
            </button>
          </div>
        </form>

        <div className="toggle-mode">
          {mode === 'login' ? (
            <p>
              Pas encore de compte ?{' '}
              <button className="link-btn" onClick={() => setMode('register')}>
                Créer un compte
              </button>
            </p>
          ) : (
             <p>
              Déjà un compte ?{' '}
              <button className="link-btn" onClick={() => setMode('login')}>
                Se connecter
              </button>
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }
        .modal {
          background: rgba(20, 15, 35, 0.85);
          color: white;
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 90%;
          max-width: 420px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease-out;
        }
        h2 {
          margin-top: 0;
          background: linear-gradient(135deg, #a855f7, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.8rem;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        p {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 2rem;
        }
        .error-message {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
          padding: 0.75rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }
        input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 1rem;
          transition: all 0.2s;
        }
        input:focus {
          outline: none;
          border-color: #a855f7;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        button {
          flex: 1;
          padding: 0.75rem;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.1s;
        }
        button:active {
          transform: scale(0.98);
        }
        .cancel-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }
        .cancel-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .login-btn {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
        }
        .login-btn:hover {
          opacity: 0.9;
        }
        .toggle-mode {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }
        .link-btn {
          background: none;
          border: none;
          color: #e879f9;
          padding: 0;
          font: inherit;
          text-decoration: underline;
          cursor: pointer;
        }
        .link-btn:hover {
          color: #f0abfc;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
