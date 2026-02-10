import ReactMarkdown from 'react-markdown';
import { useState, useRef, useMemo } from 'react';
import CVPreview from './CVPreview';

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);
  
  const cvData = useMemo(() => {
    if (isUser || !message.content) return null;
    try {
      let cleanContent = message.content.replace(/```json\n?|```/g, '').trim();
      if (cleanContent.startsWith('{')) {
         const parsed = JSON.parse(cleanContent);
         if (parsed && (parsed.personalInfo || parsed.experience)) return parsed;
      }
      return null;
    } catch (e) { return null; }
  }, [message.content, isUser]);
  
  const date = message.createdAt ? new Date(message.createdAt) : null;
  const time = date
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDF = () => {
    if (!contentRef.current) return;
    
    // Création d'une fenêtre invisible pour l'impression
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Veuillez autoriser les pop-ups pour télécharger le PDF");
      return;
    }

    // Récupérer le contenu HTML
    const htmlContent = contentRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CV Export</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <style>
          @page {
            size: A4;
            margin: 0;
          }
          body {
            font-family: 'Open Sans', Helvetica, Arial, sans-serif;
            background: #fff;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cv-page {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 2cm;
            box-sizing: border-box;
            background: white;
            position: relative;
          }
          
          /* Nettoyage des parasites potentiels */
          .cv-page > *:first-child { margin-top: 0; }
          
          /* Styles CV Professionnel */
          h1, h2, h3, h4 {
            font-family: 'Montserrat', sans-serif;
            margin-top: 0;
          }

          /* NOM PRÉNOM */
          h1 { 
            font-size: 26pt; 
            text-transform: uppercase; 
            letter-spacing: 2px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 5px;
            line-height: 1.1;
            border-bottom: none !important; /* Override chat styles */
          }

          /* Titre / Contact qui suit souvent le h1 */
          h1 + p {
            font-size: 11pt;
            color: #555;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #2c3e50;
            display: block;
          }

          /* TITRES DE SECTIONS */
          h2 { 
            font-size: 14pt; 
            color: #2c3e50; 
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 1px;
            margin-top: 25px; 
            margin-bottom: 15px;
            padding-left: 10px;
            border-left: 4px solid #3b82f6; /* Accent bleu */
            background: #f8fafc;
            padding-top: 4px;
            padding-bottom: 4px;
            border-bottom: none !important;
          }

          /* SOUS-TITRES (Postes, Diplômes) */
          h3 { 
            font-size: 12pt; 
            margin-top: 15px; 
            margin-bottom: 5px;
            font-weight: 600; 
            color: #334155;
          }

          p { 
            font-size: 10.5pt;
            line-height: 1.5;
            margin-bottom: 8px;
            color: #333;
          }

          ul { 
            padding-left: 18px; 
            margin-bottom: 12px; 
          }
          
          li { 
            font-size: 10.5pt;
            margin-bottom: 4px; 
            color: #475569;
          }

          strong { 
            color: #0f172a; 
            font-weight: 600; 
          }

          a { 
            color: #3b82f6; 
            text-decoration: none; 
          }
          
          /* Masquer les éléments indésirables s'ils existent (boutons copiés accidentellement) */
          button, .copy-btn, .action-btn { display: none !important; }
        </style>
      </head>
      <body>
        <div class="cv-page">
          ${htmlContent}
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    // Petit délai pour assurer le chargement des styles et de la police
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 800);
  };

  return (
    <div className={`row ${isUser ? "userRow" : "assistantRow"}`}>
      {!isUser && (
        <div className="avatar ai-avatar">
          <div className="avatar-content">AI</div>
        </div>
      )}
      
      <div className={`bubble ${isUser ? "userBubble" : "assistantBubble"} ${cvData ? 'cv-bubble' : ''}`}>
        {!isUser && !cvData && (
          <div className="bubble-header">
            <span className="model-name">Gemini Pro</span>
            <div className="action-buttons">
              <button className="action-btn" onClick={handleCopy} title="Copier le texte">
                {copied ? <span className="icon-check">✓</span> : <span className="icon-copy">📋</span>}
              </button>
              <button className="action-btn" onClick={handlePDF} title="Générer un PDF propre">
                <span className="icon-pdf">📄 PDF</span>
              </button>
            </div>
          </div>
        )}
        
        <div className="message-content" ref={contentRef}>
          {cvData ? <CVPreview data={cvData} /> : <ReactMarkdown>{message.content}</ReactMarkdown>}
        </div>
        {!cvData && (
          <div className="meta">
            {time && <span className="time">{time}</span>}
          </div>
        )}
      </div>

      {isUser && (
        <div className="avatar user-avatar">
          <div className="avatar-content">Moi</div>
        </div>
      )}

      <style jsx>{`
        .row {
          display: flex;
          margin-bottom: 20px;
          width: 100%;
        }
        .userRow {
          justify-content: flex-end;
        }
        .assistantRow {
          justify-content: flex-start;
        }
        .bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .cv-bubble.assistantBubble {
            max-width: 95%;
            width: 100%;
            padding: 10px;
            background: transparent;
            border: none;
            box-shadow: none;
        }
        .userBubble {
          background: rgba(59, 130, 246, 0.2); /* Bleu translucide */
          border-top-right-radius: 4px;
          border-color: rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(8px);
          margin-right: 8px;
        }
        .assistantBubble {
          max-width: 85%;
          background: rgba(255, 255, 255, 0.05);
          border-top-left-radius: 4px;
          backdrop-filter: blur(8px);
          margin-left: 12px;
          min-width: 200px;
          display: flex;
          flex-direction: column;
        }
        
        .bubble-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          height: 32px;
        }

        .model-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #e879f9;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-size: 0.7rem;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .action-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          border-color: rgba(255,255,255,0.3);
        }
        
        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.8rem;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          z-index: 1; /* Ensure visible */
        }
        .ai-avatar {
          background: linear-gradient(135deg, #a855f7, #ec4899); /* Purple/Pink gradient */
          color: white;
          margin-right: 0px; /* Reset margin */
        }
        
        /* Markdown Styles for CVs */
        .message-content {
          line-height: 1.6;
          font-size: 0.95rem;
          width: 100%; /* Fix width */
        }
        .message-content :global(p) { margin: 0 0 0.8em 0; }
        .message-content :global(h1) {
          font-size: 1.4em;
          border-bottom: 2px solid rgba(255,255,255,0.2);
          padding-bottom: 8px;
          margin-bottom: 16px;
          margin-top: 8px;
          color: #e879f9;
        }
        .message-content :global(h2) {
          font-size: 1.15em;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          padding-bottom: 4px;
          margin-top: 20px;
          margin-bottom: 12px;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .message-content :global(h3) {
          font-size: 1.05em;
          font-weight: 700;
          color: #e2e8f0;
          margin-top: 16px;
        }
        .message-content :global(ul), .message-content :global(ol) {
          margin: 0.5em 0;
          padding-left: 1.5em;
          color: #e2e8f0;
        }
        .message-content :global(hr) {
          border: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin: 20px 0;
        }
        .message-content :global(strong) {
          color: #fff;
          font-weight: 600;
        }
        .message-content :global(code) {
          background: rgba(0,0,0,0.2);
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .message-content :global(pre) {
          background: rgba(0,0,0,0.2);
          padding: 10px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 0.5em 0;
        }
        .message-content :global(pre code) {
          background: transparent;
          padding: 0;
        }
        .time {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
          text-align: right;
          user-select: none;
        }
      `}</style>
    </div>
  );
}
