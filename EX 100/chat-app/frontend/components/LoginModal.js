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
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          color: #333;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 4px;
          color: #333;
          background: #fff;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 1.5rem;
        }
        .login-btn {
          background: #0070f3;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancel-btn {
          background: #f5f5f5;
          color: #333;
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        .toggle-mode {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        .link-btn {
          background: none;
          border: none;
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
          font-size: inherit;
          padding: 0;
        }
        .link-btn:hover {
          color: #0056b3;
        }
      `}</style>
    </div>
  );
}
