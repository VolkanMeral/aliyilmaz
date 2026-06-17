import React from 'react';

export default function Services() {
  const services = [
    {
      icon: '⚡',
      title: 'Same-Day & Express Kurier',
      desc: 'Dringende Dokumente, Pakete oder Ersatzteile müssen sofort geliefert werden? Unser Express-Dienst stellt Sendungen in Vorarlberg innerhalb kürzester Zeit und am selben Tag zu.',
      badge: 'Schnellste Option'
    },
    {
      icon: '💼',
      title: 'B2B Logistiklösungen',
      desc: 'Maßgeschneiderte Transportkonzepte für Unternehmen. Feste Routen, regelmäßige Fahrten (z.B. Postläufe, Laborproben, Werkverkehr) und verlässliche Zustellung zu Ihren Konditionen.',
      badge: 'Für Firmen'
    },
    {
      icon: '🌐',
      title: 'Auslandstransporte',
      desc: 'Umfassende Logistik über die Landesgrenzen hinaus. Wir transportieren Ihre Waren direkt und sicher nach Deutschland, in die Schweiz, nach Liechtenstein und in die gesamte EU.',
      badge: 'Grenzenlos'
    },
    {
      icon: '🚚',
      title: 'Fahrzeugvermietung',
      desc: 'Benötigen Sie kurzfristig ein Transportfahrzeug? Aliyilmaz GmbH bietet einen modernen Fuhrpark von Kombis und Transportern zur Miete an – flexibel, unkompliziert und voll versichert.',
      badge: 'Zusatzmodul'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="accent-glow-bottom"></div>
      
      <div className="container">
        <div className="section-header">
          <h2>Unsere Dienstleistungen</h2>
          <p>Zuverlässigkeit und Professionalität für jede Sendung. Entdecken Sie unsere Transport- und Logistiklösungen.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="glass-card service-card">
              <div className="service-header">
                <div className="service-icon-box">{service.icon}</div>
                {service.badge && <span className="service-badge">{service.badge}</span>}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-footer">
                <span className="learn-more">Mehr erfahren &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: rgba(255, 255, 255, 0.01);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .service-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .service-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          margin-bottom: 24px;
        }

        .service-icon-box {
          width: 56px;
          height: 56px;
          background-color: rgba(227, 6, 19, 0.05);
          border: 1px solid rgba(227, 6, 19, 0.15);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .service-badge {
          background-color: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .service-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .service-desc {
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .service-footer {
          width: 100%;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          margin-top: auto;
        }

        .learn-more {
          color: var(--primary-color);
          font-weight: 600;
          font-size: 14px;
          font-family: var(--font-heading);
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .service-card:hover .learn-more {
          transform: translateX(4px);
          color: var(--primary-hover);
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .service-card {
            padding: 30px;
          }
        }
      `}</style>
    </section>
  );
}
