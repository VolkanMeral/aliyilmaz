import React, { useState } from 'react';

export default function AdminSettings() {
  const [success, setSuccess] = useState(false);
  const [prices, setPrices] = useState({
    pkwBase: 15.00,
    pkwKm: 0.90,
    kombiBase: 25.00,
    kombiKm: 1.25,
    transBase: 45.00,
    transKm: 1.65
  });

  const [company, setCompany] = useState({
    name: 'Aliyilmaz GmbH',
    street: 'Musterstraße 42',
    city: 'Villach',
    state: 'Kärnten',
    zip: '9500',
    email: 'office@aliyilmaz.gmbh',
    phone: '+43 5574 12345',
    uid: 'ATU12345678',
    court: 'Landesgericht Klagenfurt'
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrices({ ...prices, [name]: parseFloat(value) || 0 });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000); // hide message after 3 sec
  };

  return (
    <div className="admin-settings animate-fade-in">
      <div className="settings-header">
        <h2>System-Einstellungen</h2>
        {success && <span className="save-success-badge animate-fade-in">✓ Einstellungen gespeichert!</span>}
      </div>

      <form onSubmit={handleSubmit} className="settings-layout-grid">
        {/* Prices panel */}
        <div className="glass-card settings-card">
          <h3>Tarif-Parameter</h3>
          <p className="card-subtitle">Steuern Sie die Berechnungslogik des Online-Tarifrechners für Ihre Kunden.</p>

          <div className="pricing-settings-group">
            <h4 className="v-group-title">🚗 PKW-Kurier (Same-Day)</h4>
            <div className="price-inputs-row">
              <div className="form-group">
                <label>Basisgebühr (€)</label>
                <input type="number" step="0.01" name="pkwBase" value={prices.pkwBase} onChange={handlePriceChange} />
              </div>
              <div className="form-group">
                <label>Kilometertarif (€/km)</label>
                <input type="number" step="0.01" name="pkwKm" value={prices.pkwKm} onChange={handlePriceChange} />
              </div>
            </div>

            <h4 className="v-group-title">🚙 Kombi-Transport</h4>
            <div className="price-inputs-row">
              <div className="form-group">
                <label>Basisgebühr (€)</label>
                <input type="number" step="0.01" name="kombiBase" value={prices.kombiBase} onChange={handlePriceChange} />
              </div>
              <div className="form-group">
                <label>Kilometertarif (€/km)</label>
                <input type="number" step="0.01" name="kombiKm" value={prices.kombiKm} onChange={handlePriceChange} />
              </div>
            </div>

            <h4 className="v-group-title">🚚 Transporter (Sprinter)</h4>
            <div className="price-inputs-row">
              <div className="form-group">
                <label>Basisgebühr (€)</label>
                <input type="number" step="0.01" name="transBase" value={prices.transBase} onChange={handlePriceChange} />
              </div>
              <div className="form-group">
                <label>Kilometertarif (€/km)</label>
                <input type="number" step="0.01" name="transKm" value={prices.transKm} onChange={handlePriceChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Company Settings */}
        <div className="glass-card settings-card">
          <h3>Firmendaten & Website</h3>
          <p className="card-subtitle">Diese Angaben werden auf der Website, im Impressum und auf Rechnungs-PDFs angezeigt.</p>

          <div className="company-inputs-group">
            <div className="form-group">
              <label>Firmenname</label>
              <input type="text" name="name" value={company.name} onChange={handleCompanyChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Straße & Hausnr.</label>
                <input type="text" name="street" value={company.street} onChange={handleCompanyChange} />
              </div>
              <div className="form-group">
                <label>PLZ</label>
                <input type="text" name="zip" value={company.zip} onChange={handleCompanyChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ort</label>
                <input type="text" name="city" value={company.city} onChange={handleCompanyChange} />
              </div>
              <div className="form-group">
                <label>Bundesland</label>
                <input type="text" name="state" value={company.state} onChange={handleCompanyChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>E-Mail-Adresse</label>
                <input type="email" name="email" value={company.email} onChange={handleCompanyChange} />
              </div>
              <div className="form-group">
                <label>Telefonnummer</label>
                <input type="text" name="phone" value={company.phone} onChange={handleCompanyChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>UID-Nummer</label>
                <input type="text" name="uid" value={company.uid} onChange={handleCompanyChange} />
              </div>
              <div className="form-group">
                <label>Firmenbuchgericht</label>
                <input type="text" name="court" value={company.court} onChange={handleCompanyChange} />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full btn-save-settings">Speichern</button>
        </div>
      </form>

      <style>{`
        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          text-align: left;
        }

        .settings-header h2 {
          font-size: 28px;
          font-weight: 850;
        }

        .save-success-badge {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
        }

        .settings-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
          align-items: start;
        }

        .settings-card {
          padding: 30px;
          text-align: left;
        }

        .settings-card h3 {
          font-size: 18px;
          margin-bottom: 4px;
        }

        .card-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .pricing-settings-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .v-group-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--primary-color);
          margin-top: 10px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 6px;
        }

        .price-inputs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .settings-card .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .settings-card label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .settings-card input {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 10px;
          color: var(--text-main);
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
          width: 100%;
        }

        .settings-card input:focus {
          border-color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: var(--red-glow);
        }

        .company-inputs-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .btn-save-settings {
          padding: 12px;
        }

        @media (max-width: 1024px) {
          .settings-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
