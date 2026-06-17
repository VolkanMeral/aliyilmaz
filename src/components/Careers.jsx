import React, { useState } from 'react';

export default function Careers() {
  const [employmentType, setEmploymentType] = useState('angestellt'); // angestellt, selbststaendig
  const [isNonEU, setIsNonEU] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    citizenship: 'AT',
    gdprConsent: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="careers" className="careers-section">
      <div className="accent-glow-top"></div>
      
      <div className="container">
        <div className="section-header">
          <h2>Werde Teil unseres Teams</h2>
          <p>Wir suchen motivierte Fahrer (m/w/d) für Express-Zustellungen in Vorarlberg. Bewerben Sie sich direkt online.</p>
        </div>

        <div className="careers-container">
          {!submitted ? (
            <form className="glass-card careers-form animate-fade-in" onSubmit={handleSubmit}>
              <h3 className="form-section-title">Online-Bewerbungsformular</h3>
              
              {/* Personal Data */}
              <div className="form-section">
                <h4 className="section-subtitle">1. Persönliche Daten</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Vorname *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder="Max" />
                  </div>
                  <div className="form-group">
                    <label>Nachname *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder="Mustermann" />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Geburtsdatum *</label>
                    <input type="date" name="birthdate" required value={formData.birthdate} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>E-Mail-Adresse *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="max@example.com" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Telefonnummer *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+43 664 123456" />
                  </div>
                  <div className="form-group">
                    <label>Adresse (Straße & Hausnr.) *</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleInputChange} placeholder="Musterstraße 12" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>PLZ *</label>
                    <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} placeholder="6922" />
                  </div>
                  <div className="form-group">
                    <label>Ort *</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="Wolfurt" />
                  </div>
                </div>
              </div>

              {/* Anstellungsverhältnis */}
              <div className="form-section">
                <h4 className="section-subtitle">2. Anstellungsart & Aufenthaltsstatus</h4>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Gewünschtes Arbeitsverhältnis *</label>
                    <select 
                      name="employmentType" 
                      value={employmentType} 
                      onChange={(e) => {
                        setEmploymentType(e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="angestellt">Angestellt (Teilzeit / Vollzeit / Geringfügig)</option>
                      <option value="selbststaendig">Selbstständig (mit eigenem Gewerbeschein & Fahrzeug)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Staatsbürgerschaft *</label>
                    <select 
                      name="citizenship" 
                      value={formData.citizenship} 
                      onChange={(e) => {
                        handleInputChange(e);
                        setIsNonEU(e.target.value === 'NON_EU');
                      }}
                      className="form-select"
                    >
                      <option value="AT">Österreich</option>
                      <option value="DE">Deutschland</option>
                      <option value="CH">Schweiz</option>
                      <option value="EU">Anderer EU-Staat</option>
                      <option value="NON_EU">Nicht-EU-Staat (Drittstaat)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="form-section">
                <h4 className="section-subtitle">3. Dokumente hochladen</h4>
                <p className="upload-note">Unterstützte Formate: PDF, JPG, PNG. Max. 5MB pro Datei.</p>
                
                <div className="upload-grid">
                  <div className="upload-box glass-card">
                    <span className="upload-icon">🪪</span>
                    <span className="upload-label">Reisepass / Personalausweis *</span>
                    <input type="file" required className="file-input" />
                  </div>

                  <div className="upload-box glass-card">
                    <span className="upload-icon">🪪</span>
                    <span className="upload-label">Führerschein (Vorderseite) *</span>
                    <input type="file" required className="file-input" />
                  </div>

                  <div className="upload-box glass-card">
                    <span className="upload-icon">🪪</span>
                    <span className="upload-label">Führerschein (Rückseite) *</span>
                    <input type="file" required className="file-input" />
                  </div>

                  <div className="upload-box glass-card">
                    <span className="upload-icon">🏥</span>
                    <span className="upload-label">E-Card (Sozialversicherungsausweis) *</span>
                    <input type="file" required className="file-input" />
                  </div>

                  {/* Conditional: Gewerbeschein for freelancers */}
                  {employmentType === 'selbststaendig' && (
                    <div className="upload-box glass-card alert-upload animate-fade-in">
                      <span className="upload-icon">📄</span>
                      <span className="upload-label">Gewerbeschein (Gewerbeberechtigung) *</span>
                      <input type="file" required className="file-input" />
                    </div>
                  )}

                  {/* Conditional: Visa for non-EU */}
                  {isNonEU && (
                    <div className="upload-box glass-card alert-upload animate-fade-in">
                      <span className="upload-icon">🛂</span>
                      <span className="upload-label">Visum / Aufenthaltstitel / RWR-Karte *</span>
                      <input type="file" required className="file-input" />
                    </div>
                  )}
                </div>
              </div>

              {/* GDPR and submit */}
              <div className="form-section bottom-section">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    name="gdprConsent" 
                    required 
                    checked={formData.gdprConsent}
                    onChange={handleInputChange} 
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    Ich stimme zu, dass meine Daten zum Zweck der Bewerbungsabwicklung bei der Aliyilmaz GmbH gespeichert und verarbeitet werden dürfen. Abgelehnte Bewerbungen werden nach 6 Monaten DSGVO-konform gelöscht. *
                  </span>
                </label>

                <button type="submit" className="btn btn-primary btn-submit">Bewerbung absenden</button>
              </div>
            </form>
          ) : (
            <div className="glass-card success-card-container animate-fade-in">
              <span className="success-badge-icon">✓</span>
              <h3>Bewerbung erfolgreich übermittelt!</h3>
              <p>
                Hallo <strong>{formData.firstName}</strong>, vielen Dank für Ihr Interesse an einer Mitarbeit bei der Aliyilmaz GmbH. <br />
                Wir haben Ihre Unterlagen erhalten und prüfen diese sorgfältig. Unser HR-Team wird sich innerhalb der nächsten 3-5 Werktage bei Ihnen melden.
              </p>
              <div className="info-summary glass-card">
                <div><strong>Bewerber:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>E-Mail:</strong> {formData.email}</div>
                <div><strong>Status:</strong> In Prüfung (HR-Dokumente gespeichert)</div>
              </div>
              <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>Neues Formular ausfüllen</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .careers-section {
          background-color: rgba(255, 255, 255, 0.01);
          border-top: 1px solid var(--border-color);
          position: relative;
        }

        .careers-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .careers-form {
          padding: 50px;
          text-align: left;
        }

        .form-section-title {
          font-size: 32px;
          font-weight: 850;
          margin-bottom: 40px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
        }

        .form-section {
          margin-bottom: 40px;
        }

        .section-subtitle {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 24px;
          color: var(--primary-color);
        }

        .form-select {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-main);
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
          width: 100%;
        }

        .form-select:focus {
          border-color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: var(--red-glow);
        }

        /* Upload Grid */
        .upload-note {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .upload-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .upload-box {
          padding: 24px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          cursor: pointer;
        }

        .alert-upload {
          border-color: var(--primary-color);
          background-color: rgba(227, 6, 19, 0.02);
        }

        .upload-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }

        .upload-label {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .file-input {
          font-size: 11px;
          color: var(--text-secondary);
          width: 100%;
          cursor: pointer;
        }

        /* Checkbox Styling */
        .bottom-section {
          border-top: 1px solid var(--border-color);
          padding-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 0;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          user-select: none;
          gap: 12px;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          height: 20px;
          width: 20px;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          flex-shrink: 0;
          margin-top: 2px;
          transition: all 0.2s;
        }

        .checkbox-container:hover input ~ .checkmark {
          border-color: var(--primary-color);
        }

        .checkbox-container input:checked ~ .checkmark {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          box-shadow: var(--red-glow);
        }

        .checkmark:after {
          content: "";
          display: none;
          position: absolute;
        }

        .checkbox-container input:checked ~ .checkmark:after {
          display: block;
        }

        .checkbox-container .checkmark:after {
          left: 7px;
          top: 3px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-text {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .btn-submit {
          align-self: flex-start;
          padding: 16px 32px;
        }

        /* Success Card */
        .success-card-container {
          padding: 60px;
          text-align: center;
        }

        .success-badge-icon {
          width: 64px;
          height: 64px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 24px;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .success-card-container h3 {
          font-size: 28px;
          margin-bottom: 16px;
        }

        .success-card-container p {
          color: var(--text-secondary);
          margin-bottom: 30px;
          font-size: 16px;
          line-height: 1.6;
        }

        .info-summary {
          padding: 24px;
          border-radius: 12px;
          text-align: left;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .careers-form {
            padding: 30px;
          }
          .form-section-title {
            font-size: 26px;
          }
          .upload-grid {
            grid-template-columns: 1fr;
          }
          .btn-submit {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
