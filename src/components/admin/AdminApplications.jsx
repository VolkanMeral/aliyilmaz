import React, { useState } from 'react';

export default function AdminApplications({ applications, onApprove, onReject }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [tempPassword, setTempPassword] = useState('');
  const [hiredDriverName, setHiredDriverName] = useState('');

  const handleApprove = (app) => {
    const randPass = Math.random().toString(36).slice(-8).toUpperCase() + Math.floor(10 + Math.random() * 90);
    onApprove(app.id);
    setHiredDriverName(`${app.firstName} ${app.lastName}`);
    setTempPassword(randPass);
    setSelectedApp(null);
  };

  const handleReject = (id) => {
    onReject(id);
    setSelectedApp(null);
  };

  return (
    <div className="admin-applications animate-fade-in">
      <div className="applications-header">
        <h2>Fahrer-Bewerbungen</h2>
        <span className="count-badge">{applications.filter(a => a.status === 'pending').length} Offen</span>
      </div>

      {/* Temporary Password Notification after Hiring */}
      {tempPassword && (
        <div className="glass-card temp-password-card animate-fade-in">
          <div className="alert-top">
            <span className="alert-emoji">🎉</span>
            <div>
              <h3>Fahrer erfolgreich eingestellt!</h3>
              <p>
                Ein neuer Fahrer-Account wurde für <strong>{hiredDriverName}</strong> erstellt.
              </p>
            </div>
            <button className="btn-close-alert" onClick={() => setTempPassword('')}>&times;</button>
          </div>
          <div className="alert-body">
            <p>Geben Sie dem neuen Mitarbeiter sein temporäres Login-Passwort:</p>
            <div className="password-display">
              <code>{tempPassword}</code>
            </div>
            <span className="alert-note">Hinweis: Dieses Passwort wird beim ersten Einloggen im Sürücü portalı geändert.</span>
          </div>
        </div>
      )}

      <div className="applications-layout">
        {/* Table of applications */}
        <div className="glass-card apps-list-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Telefon</th>
                  <th>Anstellung</th>
                  <th>Uhrzeit / Status</th>
                  <th>Aktion</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id} className={selectedApp?.id === app.id ? 'row-selected' : ''}>
                      <td><strong>{app.firstName} {app.lastName}</strong></td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>
                        <span className={`type-tag ${app.employment}`}>
                          {app.employment === 'selbststaendig' ? 'Selbstständig' : 'Angestellt'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill ${app.status}`}>
                          {app.status === 'pending' ? 'Warten' : app.status === 'approved' ? 'Eingestellt' : 'Abgelehnt'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-xs"
                          onClick={() => setSelectedApp(app)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-table-msg">Keine Bewerbungen im System gefunden.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail View Panel on select */}
        {selectedApp && (
          <div className="glass-card app-detail-card animate-fade-in">
            <div className="detail-header">
              <h3>Bewerber-Details</h3>
              <button className="btn-close-detail" onClick={() => setSelectedApp(null)}>&times;</button>
            </div>
            
            <div className="detail-body">
              <div className="detail-row-name">
                <h4>{selectedApp.firstName} {selectedApp.lastName}</h4>
                <span>Geburtsdatum: {selectedApp.birthdate || '12.04.1995'}</span>
              </div>

              <div className="detail-info-block">
                <div><strong>Adresse:</strong> {selectedApp.address || 'Hauptstraße 15'}, {selectedApp.zip || '9500'} {selectedApp.city || 'Villach'}</div>
                <div><strong>Staatsbürgerschaft:</strong> {selectedApp.citizenship === 'NON_EU' ? 'Nicht-EU (Drittstaat)' : selectedApp.citizenship}</div>
                <div><strong>Anstellungsart:</strong> {selectedApp.employment === 'selbststaendig' ? 'Selbstständig' : 'Angestellt'}</div>
              </div>

              <div className="detail-divider"></div>

              {/* Uploaded Documents List */}
              <h4>Eingereichte Dokumente (Sicher verarbeitet)</h4>
              <div className="docs-list">
                <div className="doc-item">
                  <span>🪪 Reisepass / Ausweis</span>
                  <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: Reisepass_Mustermann.pdf'); }} className="doc-link">Ansehen</a>
                </div>
                <div className="doc-item">
                  <span>🪪 Führerschein Vorderseite</span>
                  <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: License_Front.jpg'); }} className="doc-link">Ansehen</a>
                </div>
                <div className="doc-item">
                  <span>🪪 Führerschein Rückseite</span>
                  <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: License_Back.jpg'); }} className="doc-link">Ansehen</a>
                </div>
                <div className="doc-item">
                  <span>🏥 E-Card (SV-Ausweis)</span>
                  <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: ECard_Mustermann.pdf'); }} className="doc-link">Ansehen</a>
                </div>
                {selectedApp.employment === 'selbststaendig' && (
                  <div className="doc-item highlight-doc">
                    <span>📄 Gewerbeschein</span>
                    <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: Gewerbeberechtigung.pdf'); }} className="doc-link">Ansehen</a>
                  </div>
                )}
                {selectedApp.citizenship === 'NON_EU' && (
                  <div className="doc-item highlight-doc">
                    <span>Passport Visum / RWR-Karte</span>
                    <a href="#view" onClick={(e) => { e.preventDefault(); alert('Dokumenten-Vorschau: Aufenthaltstitel.pdf'); }} className="doc-link">Ansehen</a>
                  </div>
                )}
              </div>

              <div className="detail-divider"></div>

              {selectedApp.status === 'pending' ? (
                <div className="detail-actions">
                  <button className="btn btn-secondary btn-reject" onClick={() => handleReject(selectedApp.id)}>Ablehnen</button>
                  <button className="btn btn-primary btn-approve" onClick={() => handleApprove(selectedApp)}>Als Fahrer einstellen</button>
                </div>
              ) : (
                <div className="detail-status-msg">
                  Bewerbung wurde bereits {selectedApp.status === 'approved' ? 'angenommen' : 'abgelehnt'}.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .applications-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
          text-align: left;
        }

        .applications-header h2 {
          font-size: 28px;
          font-weight: 850;
        }

        .count-badge {
          background-color: var(--primary-color);
          color: white;
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 700;
          box-shadow: var(--red-glow);
        }

        .applications-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 30px;
          align-items: start;
        }

        /* Detail Card */
        .app-detail-card {
          padding: 30px;
          text-align: left;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .btn-close-detail {
          background: transparent;
          color: var(--text-secondary);
          font-size: 28px;
          border: none;
          cursor: pointer;
        }

        .btn-close-detail:hover {
          color: var(--primary-color);
        }

        .detail-row-name h4 {
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .detail-row-name span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .detail-info-block {
          margin-top: 16px;
          font-size: 13px;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .detail-info-block strong {
          color: var(--text-main);
        }

        .detail-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 20px 0;
        }

        .app-detail-card h4 {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .docs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .doc-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(255,255,255,0.02);
          border: 1px solid var(--border-color);
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
        }

        .doc-item.highlight-doc {
          border-color: rgba(227, 6, 19, 0.2);
          background-color: rgba(227, 6, 19, 0.01);
        }

        .doc-link {
          color: var(--primary-color);
          font-weight: 600;
        }

        .doc-link:hover {
          color: var(--primary-hover);
        }

        .detail-actions {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 12px;
        }

        .detail-status-msg {
          text-align: center;
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* Type tags */
        .type-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .type-tag.angestellt { background-color: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .type-tag.selbststaendig { background-color: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .row-selected td {
          background-color: rgba(255, 255, 255, 0.02) !important;
        }

        /* Temporary Password Notification style */
        .temp-password-card {
          padding: 24px;
          border-color: #10b981;
          background-color: rgba(16, 185, 129, 0.03);
          margin-bottom: 30px;
          text-align: left;
        }

        .alert-top {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        .alert-emoji {
          font-size: 28px;
        }

        .alert-top h3 {
          font-size: 16px;
          color: #10b981;
        }

        .alert-top p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .btn-close-alert {
          position: absolute;
          top: -4px;
          right: 0;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
        }

        .alert-body {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(16, 185, 129, 0.15);
          font-size: 13px;
        }

        .password-display {
          background-color: #0b0f17;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin: 12px 0;
        }

        .password-display code {
          font-size: 20px;
          font-weight: 800;
          color: #10b981;
          letter-spacing: 0.1em;
        }

        .alert-note {
          font-size: 11px;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .applications-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
