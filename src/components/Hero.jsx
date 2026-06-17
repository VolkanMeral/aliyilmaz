import React from 'react';

export default function Hero({ onNavigate }) {
  const handleScrollTo = (id) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="hero" className="hero-section">
      <div className="accent-glow-top"></div>
      
      {/* Background Graphic Lines */}
      <div className="bg-routes-container">
        <svg className="bg-routes-svg" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 C300 120, 500 450, 900 150 C1200 -50, 1300 350, 1600 280" stroke="rgba(227, 6, 19, 0.05)" strokeWidth="3" strokeDasharray="10 8" />
          <path d="M-50 400 C400 350, 700 100, 1000 480 C1200 680, 1400 300, 1500 200" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="2" />
          <circle cx="900" cy="150" r="4" fill="var(--primary-color)" className="pulse-point" />
          <circle cx="1000" cy="480" r="3" fill="#ffffff" className="pulse-point" />
        </svg>
      </div>

      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge-container">
            <span className="hero-badge">⚡ Same-Day & Express Kurier</span>
          </div>
          <h1 className="hero-title">
            Schnelle Zustellung. <br />
            <span className="gradient-text">Ohne Umwege.</span>
          </h1>
          <p className="hero-desc">
            Zuverlässige Express-Logistik und Kleintransporte. Wir liefern Ihre Sendungen pünktlich und sicher – in Vorarlberg, ganz Österreich ve EU-weit.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg-scale"
              onClick={() => handleScrollTo('calculator')}
            >
              <span>Tarif berechnen</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </button>
            <button 
              className="btn btn-secondary btn-lg-scale"
              onClick={() => handleScrollTo('careers')}
            >
              Bewerben als Fahrer
            </button>
          </div>
        </div>

        {/* Hero Interactive Feature Panel */}
        <div className="hero-stats-panel glass-card">
          <div className="stats-header">
            <h3>Liefergebiet & Kennzahlen</h3>
            <span className="live-dot-container">
              <span className="live-dot"></span>
              Live-Betrieb
            </span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🗺️</div>
              <div className="stat-info">
                <h4>AT & EU-Weit</h4>
                <p>Zustellungsbereich</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <h4>&lt; 60 Min.</h4>
                <p>Reaktionszeit Vorarlberg</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <h4>100% Sicher</h4>
                <p>Versicherter Transport</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 180px;
          padding-bottom: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-height: 90vh;
          justify-content: center;
        }

        .bg-routes-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .bg-routes-svg {
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }

        .pulse-point {
          animation: pulse 2s infinite alternate;
        }

        @keyframes pulse {
          0% { r: 3; opacity: 0.5; }
          100% { r: 8; opacity: 1; }
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: left;
        }

        .badge-container {
          margin-bottom: 20px;
        }

        .hero-badge {
          background-color: rgba(227, 6, 19, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(227, 6, 19, 0.2);
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: inline-block;
        }

        .hero-title {
          font-size: 64px;
          line-height: 1.1;
          font-weight: 850;
          margin-bottom: 24px;
          letter-spacing: -0.04em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 40%, var(--primary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(227, 6, 19, 0.15);
        }

        .hero-desc {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 540px;
          font-weight: 400;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-lg-scale {
          padding: 16px 32px;
          font-size: 16px;
        }

        /* Stats Panel */
        .hero-stats-panel {
          padding: 30px;
          width: 100%;
          border-radius: 24px;
        }

        .stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .stats-header h3 {
          font-size: 18px;
          font-weight: 700;
        }

        .live-dot-container {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px #10b981;
          animation: livePulse 1.5s infinite alternate;
        }

        @keyframes livePulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.02);
          transition: background-color 0.2s;
        }

        .stat-item:hover {
          background-color: rgba(255, 255, 255, 0.04);
        }

        .stat-icon {
          font-size: 24px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 12px;
        }

        .stat-info h4 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .stat-info p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }

          .hero-content {
            text-align: center;
          }

          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }
          
          .hero-title {
            font-size: 48px;
          }
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions button {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
}
