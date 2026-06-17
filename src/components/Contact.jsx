import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="accent-glow-bottom"></div>
      
      <div className="container">
        <div className="section-header">
          <h2>Kontaktieren Sie uns</h2>
          <p>Haben Sie Fragen zu unseren Logistiklösungen oder ein spezielles Anliegen? Unser Team berät Sie gerne.</p>
        </div>

        <div className="contact-grid">
          {/* Contact Information Cards */}
          <div className="contact-info-panel">
            <div className="glass-card info-card">
              <span className="info-icon">📍</span>
              <div className="info-details">
                <h3>Hauptsitz</h3>
                <p>
                  Aliyilmaz GmbH <br />
                  Musterstraße 42, <br />
                  9500 Villach, Kärnten, Österreich
                </p>
              </div>
            </div>

            <div className="glass-card info-card">
              <span className="info-icon">📞</span>
              <div className="info-details">
                <h3>Direktkontakt</h3>
                <p>
                  Telefon: <a href="tel:+43557412345">+43 5574 12345</a> <br />
                  E-Mail: <a href="mailto:office@aliyilmaz.gmbh">office@aliyilmaz.gmbh</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form or Success State */}
          <div className="glass-card contact-form-card">
            {!submitted ? (
              <form className="contact-form animate-fade-in" onSubmit={handleSubmit}>
                <h3 className="form-title">Nachricht senden</h3>
                
                <div className="form-group">
                  <label>Ihr Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Max Mustermann"
                  />
                </div>

                <div className="form-group">
                  <label>E-Mail-Adresse *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="max@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Betreff *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Anfrage Express-Zustellung"
                  />
                </div>

                <div className="form-group">
                  <label>Ihre Nachricht *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Beschreiben Sie Ihr Anliegen..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-send">Nachricht senden</button>
              </form>
            ) : (
              <div className="contact-success animate-fade-in">
                <span className="success-icon-box">✓</span>
                <h3>Vielen Dank für Ihre Nachricht!</h3>
                <p>
                  Hallo <strong>{formData.name}</strong>, Ihre Nachricht wurde erfolgreich an unser Support-Team übermittelt. <br />
                  Wir prüfen Ihr Anliegen und antworten Ihnen innerhalb der nächsten 24 Stunden per E-Mail an <strong>{formData.email}</strong>.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>Weitere Nachricht senden</button>
              </div>
            )}
          </div>
        </div>

        {/* Custom Visual stylized map representation of Vorarlberg / Lake Constance / Wolfurt region */}
        <div className="glass-card map-illustration-card">
          <div className="map-header">
            <h4>Liefer- & Stützpunktnetzwerk Villach</h4>
            <span className="map-badge">Zentrale Villach</span>
          </div>
          
          <div className="map-graphic-container">
            <svg className="map-svg" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Lake Wörthersee representation */}
              <path d="M50 50 C120 40, 200 80, 240 100 C200 130, 100 120, 50 50 Z" fill="rgba(227, 6, 19, 0.05)" stroke="rgba(227, 6, 19, 0.15)" strokeWidth="1" />
              <text x="110" y="80" fill="var(--text-secondary)" fontSize="10" className="map-text">Wörthersee</text>
              
              {/* Borders */}
              <path d="M240 100 L300 80 L350 120 L400 180 L380 250 L300 280 L200 240 L220 180 Z" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Delivery nodes/routes */}
              <line x1="280" y1="120" x2="350" y2="160" stroke="rgba(227, 6, 19, 0.2)" strokeWidth="2" className="map-route-line" />
              <line x1="280" y1="120" x2="210" y2="90" stroke="rgba(227, 6, 19, 0.2)" strokeWidth="2" className="map-route-line" />
              <line x1="280" y1="120" x2="260" y2="210" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <line x1="280" y1="120" x2="310" y2="240" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              
              {/* Main Hub: Villach */}
              <circle cx="280" cy="120" r="8" fill="var(--primary-color)" className="main-hub" />
              <circle cx="280" cy="120" r="16" stroke="var(--primary-color)" strokeWidth="1.5" className="main-hub-ring" />
              <text x="296" y="124" fill="#ffffff" fontWeight="bold" fontSize="12" className="map-text">Villach (HQ)</text>
              
              {/* Branch nodes */}
              <circle cx="210" cy="90" r="4" fill="#ffffff" />
              <text x="175" y="82" fill="var(--text-secondary)" fontSize="10" className="map-text">Klagenfurt</text>

              <circle cx="350" cy="160" r="4" fill="#ffffff" />
              <text x="360" y="164" fill="var(--text-secondary)" fontSize="10" className="map-text">Spittal</text>

              <circle cx="260" cy="210" r="4" fill="#ffffff" />
              <text x="215" y="214" fill="var(--text-secondary)" fontSize="10" className="map-text">Wolfsberg</text>

              <circle cx="310" cy="240" r="4" fill="#ffffff" />
              <text x="320" y="244" fill="var(--text-secondary)" fontSize="10" className="map-text">St. Veit</text>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-color);
          border-top: 1px solid var(--border-color);
          position: relative;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          margin-bottom: 50px;
          align-items: start;
        }

        .contact-info-panel {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          text-align: left;
        }

        .info-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-details h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-main);
        }

        .info-details p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .info-details a:hover {
          color: var(--primary-color);
        }

        /* Contact Form */
        .contact-form-card {
          padding: 40px;
          text-align: left;
        }

        .form-title {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .contact-form-card .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .contact-form-card label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .contact-form-card input, .contact-form-card textarea {
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

        .contact-form-card input:focus, .contact-form-card textarea:focus {
          border-color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: var(--red-glow);
        }

        .btn-send {
          width: auto;
          padding: 12px 30px;
        }

        /* Success State */
        .contact-success {
          text-align: center;
          padding: 30px 0;
        }

        .success-icon-box {
          width: 56px;
          height: 56px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .contact-success h3 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .contact-success p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          font-size: 15px;
          line-height: 1.6;
        }

        /* Map Illustration Card */
        .map-illustration-card {
          margin-top: 40px;
          padding: 30px;
          text-align: left;
        }

        .map-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .map-header h4 {
          font-size: 15px;
          font-weight: 700;
        }

        .map-badge {
          background-color: rgba(255,255,255,0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 600;
        }

        .map-graphic-container {
          background-color: rgba(0,0,0,0.2);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .map-svg {
          width: 100%;
          height: auto;
          display: block;
          max-height: 300px;
        }

        .map-text {
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
        }

        .main-hub {
          box-shadow: var(--red-glow-strong);
        }

        .main-hub-ring {
          animation: ringPulse 2s infinite ease-out;
          transform-origin: 280px 120px;
        }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .map-route-line {
          stroke-dasharray: 4;
          animation: lineFlow 1.5s infinite linear;
        }

        @keyframes lineFlow {
          from { stroke-dashoffset: 8; }
          to { stroke-dashoffset: 0; }
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-form-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
