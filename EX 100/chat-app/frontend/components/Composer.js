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
        <textarea
          className="textarea"
          placeholder="Écris ton message…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={false}
        />

        <button className="btn" type="submit" disabled={disabled}>
          {disabled ? "Envoi…" : "Envoyer"}
        </button>
      </form>

      <div className="footerLine">
        <span>
          {error ? `${error}` : "Thème violet/mauve"}
        </span>
        <span>API: <code>/api/chat</code></span>
      </div>
    </div>
  );
}
