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
          padding: 20px;
          background: rgba(30,30,40, 0.4);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .form {
          max-width: 800px;
          margin: 0 auto;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 6px;
          transition: all 0.2s;
        }
        .input-wrapper:focus-within {
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
          background: rgba(0,0,0,0.3);
        }
        .textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 12px 16px;
          font-family: inherit;
          resize: none;
          outline: none;
          min-height: 46px;
          max-height: 120px;
        }
        .textarea::placeholder {
          color: rgba(255,255,255,0.4);
        }
        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #db2777);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          margin-right: 4px;
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
        }
        .send-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .send-btn svg {
          width: 20px;
          height: 20px;
          transform: translateX(1px); /* optical adjustment */
        }
        .error-message {
          color: #ef4444;
          font-size: 0.8rem;
          margin-top: 10px;
          text-align: center;
        }
        .status-line {
          margin-top: 10px;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
        }
        .spinner {
          width: 16px;
          height: 16px;
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
