"use client";

import { useState, useEffect } from 'react';

export default function TemplateSelector({ onSelectTemplate, onClose }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.cvTemplates || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSelect = async (templateId, type = 'cv') => {
    const res = await fetch('/api/templates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, type })
    });
    const data = await res.json();
    onSelectTemplate(data.template);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choisissez un modèle de CV</h2>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        <div className="templates-grid">
          {loading ? (
            <div className="loading">Chargement...</div>
          ) : (
            <>
              {/* Option Lettre de Motivation */}
              <div 
                className="template-card special-card"
                onClick={() => handleSelect('default', 'lettre')}
              >
                <div className="template-icon">✉️</div>
                <h3>Lettre de Motivation</h3>
                <p>Structure professionnelle VOUS-MOI-NOUS pour candidatures spontanées ou réponses à offre.</p>
              </div>

              {/* Templates CV */}
              {templates.map(template => (
                <div 
                  key={template.id} 
                  className="template-card"
                  onClick={() => handleSelect(template.id, 'cv')}
                >
                  <div className="template-icon">CV</div>
                  <h3>{template.name}</h3>
                  <p>{template.preview}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }

          .modal-content {
            background: rgba(20, 20, 30, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            max-width: 800px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
          }

          .modal-header h2 {
            margin: 0;
            color: white;
            font-size: 1.5rem;
          }

          .close-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.2rem;
          }

          .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          .templates-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
          }

          .template-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .template-card:hover {
            background: rgba(124, 58, 237, 0.1);
            border-color: rgba(124, 58, 237, 0.3);
            transform: translateY(-2px);
          }

          .template-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }

          .template-card h3 {
            color: white;
            font-size: 1rem;
            margin: 0 0 8px 0;
          }

          .template-card p {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.75rem;
            margin: 0;
            line-height: 1.4;
          }

          .loading {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            padding: 40px;
          }
        `}</style>
      </div>
    </div>
  );
}
