import React, { useState } from 'react';

export default function Footer() {
  const [modalType, setModalType] = useState(null); // 'impressum', 'datenschutz', null

  const handleOpenModal = (type, e) => {
    e.preventDefault();
    setModalType(type);
    document.body.style.overflow = 'hidden'; // block scroll
  };

  const handleCloseModal = () => {
    setModalType(null);
    document.body.style.overflow = 'auto'; // restore scroll
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <span className="logo-text">Aliyilmaz</span>
              <span className="logo-sub">GmbH</span>
              <span className="logo-dot"></span>
            </div>
            <p className="brand-desc">
              Ihr zuverlässiger Express-Logistikdienstleister in Villach und Kärnten. Schnelle und sichere Lieferungen, ohne Umwege.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="links-title">Unternehmen</h4>
            <ul className="footer-links">
              <li><a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById('hero').scrollIntoView({ behavior: 'smooth' }); }}>Startseite</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services').scrollIntoView({ behavior: 'smooth' }); }}>Dienstleistungen</a></li>
              <li><a href="#calculator" onClick={(e) => { e.preventDefault(); document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' }); }}>Tarifrechner</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); document.getElementById('careers').scrollIntoView({ behavior: 'smooth' }); }}>Karriere / Jobs</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="links-title">Rechtliches</h4>
            <ul className="footer-links">
              <li><a href="#impressum" onClick={(e) => handleOpenModal('impressum', e)}>Impressum</a></li>
              <li><a href="#datenschutz" onClick={(e) => handleOpenModal('datenschutz', e)}>Datenschutzerklärung</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Kontakt</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span className="copyright">
            &copy; {new Date().getFullYear()} Aliyilmaz GmbH. Alle Rechte vorbehalten.
          </span>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
          </div>
        </div>
      </div>

      {/* Impressum / Datenschutz Modal Overlay */}
      {modalType && (
        <div className="modal-overlay animate-fade-in" onClick={handleCloseModal}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal} aria-label="Schließen">&times;</button>
            
            <div className="modal-body-scroll">
              {modalType === 'impressum' && (
                <div className="legal-text-content">
                  <h2>Impressum</h2>
                  <p className="legal-updated">Gemäß § 5 E-Commerce-Gesetz (ECG) und Offenlegungspflicht laut § 25 Mediengesetz:</p>
                  
                  <div className="legal-section-block">
                    <strong>Aliyilmaz GmbH</strong> <br />
                    Express-Logistik & Kleintransporte <br />
                    Musterstraße 42, 9500 Villach, Kärnten, Österreich <br /> <br />
                    <strong>Geschäftsführung:</strong> Ali Yılmaz <br />
                    <strong>Firmenbuchnummer:</strong> FN 123456 z <br />
                    <strong>Firmenbuchgericht:</strong> Landesgericht Klagenfurt <br />
                    <strong>UID-Nummer:</strong> ATU12345678 <br />
                    <strong>Gewerbeberechtigung:</strong> Güterbeförderungsgewerbe (Konzessioniert) <br />
                    <strong>Gewerbebehörde:</strong> Magistrat der Stadt Villach <br />
                    <strong>Mitgliedschaft:</strong> Wirtschaftskammer Kärnten, Fachgruppe Güterbeförderung <br />
                  </div>

                  <h3>Haftungsausschluss</h3>
                  <p>
                    Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                  </p>
                  
                  <h3>Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              )}

              {modalType === 'datenschutz' && (
                <div className="legal-text-content">
                  <h2>Datenschutzerklärung</h2>
                  <p className="legal-updated">Stand: Juni 2026</p>
                  
                  <p>
                    Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
                  </p>

                  <h3>1. Kontakt mit uns</h3>
                  <p>
                    Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>

                  <h3>2. Datenspeicherung bei Buchungen</h3>
                  <p>
                    Wir weisen darauf hin, dass zum Zweck des einfacheren Einkaufsvorganges und zur späteren Vertragsabwicklung vom Webseitenbetreiber im Rahmen von Cookies die IP-Daten des Anschlussinhabers gespeichert werden, ebenso wie Name, Anschrift, E-Mail und Kreditkartennummer des Bestellers. Die von Ihnen bereitgestellten Daten sind zur Vertragserfüllung bzw. zur Durchführung vorvertraglicher Maßnahmen erforderlich.
                  </p>

                  <h3>3. Fahrer-Bewerbungen (Bewerberportal)</h3>
                  <p>
                    Wenn Sie sich über unser Bewerbungsformular bewerben, werden Ihre übermittelten persönlichen Daten und Dokumente (Ausweise, Führerscheine, E-Card, etc.) ausschließlich zur Durchführung des Bewerbungsverfahrens genutzt. Bei einer Ablehnung Ihrer Bewerbung werden all Ihre Daten und Dokumente nach Ablauf von 6 Monaten gelöscht. Im Falle einer Anstellung werden die Dokumente in die Personalakte überführt.
                  </p>

                  <h3>4. Cookies & Web-Analyse</h3>
                  <p>
                    Unsere Website verwendet so genannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                  </p>

                  <h3>5. Ihre Rechte</h3>
                  <p>
                    Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Österreich ist dies die Datenschutzbehörde.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .footer-section {
          background-color: #0b0f17;
          border-top: 1px solid var(--border-color);
          padding: 80px 0 40px;
          text-align: left;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 420px;
        }

        /* Logo reuse */
        .footer-brand .nav-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.03em;
        }

        .brand-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
        }

        .links-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-color);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .footer-links a:hover {
          color: var(--text-main);
          padding-left: 4px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: var(--text-muted);
          font-size: 13px;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-icon {
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
        }

        .social-icon:hover {
          color: var(--primary-color);
        }

        /* Modal Overlay Styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .modal-content {
          width: 100%;
          max-width: 720px;
          max-height: 85vh;
          padding: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 32px;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s;
        }

        .modal-close:hover {
          color: var(--primary-color);
        }

        .modal-body-scroll {
          overflow-y: auto;
          flex-grow: 1;
          padding-right: 12px;
        }

        .legal-text-content {
          text-align: left;
        }

        .legal-text-content h2 {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .legal-updated {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .legal-section-block {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .legal-section-block strong {
          color: var(--text-main);
        }

        .legal-text-content h3 {
          font-size: 18px;
          margin: 24px 0 12px;
        }

        .legal-text-content p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .modal-content {
            padding: 24px;
          }
        }
      `}</style>
    </footer>
  );
}
