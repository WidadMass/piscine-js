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

        <div className="divider">
          <span>OU</span>
        </div>

        <button 
          className="google-btn"
          onClick={() => window.location.href = '/api/auth/google'}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.23856)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.424 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.424 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Continuer avec Google
        </button>

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
        .divider {
          display: flex;
          align-items: center;
          margin: 1.5rem 0;
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
        }
        .divider::before, .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.1);
        }
        .divider span {
          padding: 0 10px;
        }
        .google-btn {
          width: 100%;
          background: white;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          border-radius: 12px;
          font-weight: 500;
          transition: background 0.2s;
        }
        .google-btn:hover {
          background: #f1f1f1;
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
