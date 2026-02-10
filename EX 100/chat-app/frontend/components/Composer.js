export default function Composer({
  value,
  onChange,
  onSend,
  onKeyDown,
  disabled,
  error,
}) {
  return (
    <div className="composer">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled) onSend();
        }}
      >
        <div className="input-wrapper">
          <textarea
            className="textarea"
            placeholder="Écrivez votre message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={disabled}
            rows={1}
          />
          
          <button className="send-btn" type="submit" disabled={disabled || !value.trim()}>
            {disabled ? (
              <span className="spinner"></span>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </form>

      {error ? (
        <div className="error-message">
          ⚠️ {error}
        </div>
      ) : (
        <div className="status-line">
          Démo Chat App &bull; Powered by Next.js
        </div>
      )}

      <style jsx>{`
        .composer {
          padding: 24px;
          background: rgba(15, 15, 25, 0.8);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .form {
          max-width: 800px;
          margin: 0 auto;
        }
        .input-wrapper {
          display: flex;
          align-items: flex-end;
          background: rgba(30, 30, 40, 0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 8px 12px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .input-wrapper:focus-within {
          border-color: rgba(139, 92, 246, 0.6);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(0,0,0,0.2);
          background: rgba(30, 30, 40, 0.8);
        }
        .textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 12px;
          font-family: inherit;
          font-size: 1rem;
          resize: none;
          outline: none;
          min-height: 24px;
          max-height: 200px;
          line-height: 1.5;
        }
        .textarea::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2px;
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }
        .send-btn:disabled {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.2);
          cursor: not-allowed;
          border-color: transparent;
        }
        .send-btn svg {
          width: 20px;
          height: 20px;
        }
        .error-message {
          color: #fca5a5;
          font-size: 0.85rem;
          margin-top: 12px;
          text-align: center;
          background: rgba(220, 38, 38, 0.1);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }
        .status-line {
          margin-top: 12px;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
