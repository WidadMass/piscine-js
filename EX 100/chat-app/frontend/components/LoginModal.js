"use client";

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      onClose(); // Fermer la modale après succès
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Connexion / Inscription</h2>
        <p>Veuillez vous identifier pour participer.</p>
        
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
            <button type="submit" className="login-btn">Connexion / Inscription</button>
          </div>
        </form>
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
          color: #333; /* Force text color to dark */
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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
          background: transparent;
          border: 1px solid #ccc;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .error-message {
          color: red;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
