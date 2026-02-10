import { useState, useRef } from 'react';

export default function CVPreview({ data }) {
  const [editableData, setEditableData] = useState(data);
  const [editMode, setEditMode] = useState(false);
  const cvRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CV export</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <style>
            @page { size: A4; margin: 0; }
            body { font-family: 'Open Sans', sans-serif; background: white; margin: 0; padding: 0; }
            .cv-container { width: 210mm; min-height: 297mm; padding: 2cm; margin: 0 auto; box-sizing: border-box; }
            h1 { font-family: 'Montserrat', sans-serif; font-size: 24pt; text-transform: uppercase; margin: 0; color: #2c3e50; }
            h2 { font-family: 'Montserrat', sans-serif; font-size: 14pt; color: #2c3e50; text-transform: uppercase; border-left: 4px solid #3b82f6; padding-left: 10px; margin-top: 20px; background: #f8fafc; }
            .subtitle { font-family: 'Montserrat', sans-serif; font-size: 11pt; color: #64748b; margin-bottom: 20px; border-bottom: 2px solid #2c3e50; padding-bottom: 10px; }
            .job-title { font-weight: 700; font-size: 11pt; color: #1e293b; margin-top: 10px; }
            .company { color: #3b82f6; font-weight: 600; }
            .date { color: #64748b; font-size: 0.9rem; float: right; }
            ul { padding-left: 18px; color: #475569; margin-top: 5px; }
            li { margin-bottom: 4px; font-size: 10pt; }
        </style>
      </head>
      <body>
        <div class="cv-container">
            ${cvRef.current.innerHTML}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  if (!editableData) return null;

  const { personalInfo, summary, experience, education, skills, projects } = editableData;

  return (
    <div className="cv-wrapper">
      <div className="cv-controls">
        <button onClick={() => setEditMode(!editMode)} className="control-btn">
          {editMode ? '💾 Terminer' : '✏️ Éditer'}
        </button>
        <button onClick={handlePrint} className="control-btn">
          📄 PDF
        </button>
      </div>

      <div className={`cv-paper ${editMode ? 'editing' : ''}`} ref={cvRef} contentEditable={editMode}>
        <header>
          <h1>{personalInfo?.fullName || "Votre Nom"}</h1>
          <div className="subtitle">
            {personalInfo?.title} <br/>
            {personalInfo?.email} | {personalInfo?.phone} | {personalInfo?.location}
          </div>
        </header>

        {summary && (
            <div className="section summary">
                <p>{summary}</p>
            </div>
        )}

        {experience && experience.length > 0 && (
          <section>
            <h2>Expérience Professionnelle</h2>
            {experience.map((exp, i) => (
              <div key={i} className="job-item">
                <div className="job-header">
                  <span className="job-title">{exp.role}</span>
                  <span className="date">{exp.period}</span>
                </div>
                <div className="company">{exp.company}</div>
                <ul>
                  {exp.description && exp.description.map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education && education.length > 0 && (
          <section>
            <h2>Formation</h2>
            {education.map((edu, i) => (
              <div key={i} className="edu-item">
                <div className="job-header">
                  <span className="job-title">{edu.degree}</span>
                  <span className="date">{edu.year}</span>
                </div>
                <div className="company">{edu.school}</div>
              </div>
            ))}
          </section>
        )}

        {skills && (
          <section>
            <h2>Compétences</h2>
            <div className="skills-grid">
               {skills.technical && skills.technical.length > 0 && (
                   <div className="skill-cat">
                       <strong>Techniques:</strong> {skills.technical.join(', ')}
                   </div>
               )}
               {skills.languages && skills.languages.length > 0 && (
                   <div className="skill-cat">
                       <strong>Langues:</strong> {skills.languages.join(', ')}
                   </div>
               )}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        .cv-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }
        .cv-controls {
          display: flex;
          gap: 10px;
        }
        .control-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .control-btn:hover {
          background: rgba(255,255,255,0.2);
        }
        
        .cv-paper {
          background: white;
          color: #1e293b;
          width: 100%;
          max-width: 210mm;
          min-height: 297mm; /* Aspect ratio A4ish scaled down for chat */
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          font-family: 'Segoe UI', sans-serif;
          font-size: 14px;
          zoom: 0.8; /* Zoom out to fit in chat */
          outline: none;
        }
        
        .cv-paper.editing {
          border: 2px dashed #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        h1 { margin: 0; color: #0f172a; text-transform: uppercase; font-size: 2em; border-bottom: none !important; }
        .subtitle { color: #64748b; margin-bottom: 20px; border-bottom: 2px solid #0f172a; padding-bottom: 10px; line-height: 1.5; }
        
        h2 { 
          color: #1e293b;
          font-size: 1.2em;
          text-transform: uppercase;
          border-left: 4px solid #3b82f6;
          padding-left: 10px;
          background: #f1f5f9;
          margin-top: 25px;
          margin-bottom: 15px;
          padding-top: 4px;
          padding-bottom: 4px;
        }

        .job-header { display: flex; justify-content: space-between; align-items: baseline; }
        .job-title { font-weight: 700; font-size: 1.1em; color: #334155; }
        .company { color: #3b82f6; font-weight: 600; margin-bottom: 5px; }
        .date { color: #94a3b8; font-size: 0.9em; }
        
        ul { margin-top: 5px; padding-left: 20px; }
        li { margin-bottom: 4px; color: #475569; }
        
        .skill-cat { margin-bottom: 8px; }
        strong { color: #0f172a; }
      `}</style>
    </div>
  );
}
