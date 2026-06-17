import React, { useState, useEffect } from 'react';

export default function PriceCalculator({ onBookOrder }) {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState('pkw'); // pkw, kombi, transporter
  const [packageSize, setPackageSize] = useState('small'); // small, medium, large
  const [distance, setDistance] = useState(25); // in KM
  const [isExpress, setIsExpress] = useState(false);
  const [price, setPrice] = useState(0);
  
  // Booking Form State
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    pickup: '',
    delivery: '',
    date: '',
    time: ''
  });

  // Pricing Logic Sourced from docs/config/preis_berechnung.php
  const vehicles = {
    pkw: { name: 'PKW-Kurier (Same-Day)', base: 15.00, perKm: 0.90, maxWeight: '15 kg', icon: '🚗' },
    kombi: { name: 'Kombi-Transport', base: 25.00, perKm: 1.25, maxWeight: '100 kg', icon: '🚙' },
    transporter: { name: 'Transporter (Sprinter)', base: 45.00, perKm: 1.65, maxWeight: '1000 kg', icon: '🚚' }
  };

  const packageSizes = {
    small: { name: 'Klein (Umschlag / Dokumente)', surcharge: 0.00 },
    medium: { name: 'Mittel (Pakete bis 20kg)', surcharge: 10.00 },
    large: { name: 'Groß (Sperrgut / Paletten)', surcharge: 35.00 }
  };

  useEffect(() => {
    // Calculate total price
    const selectedVehicle = vehicles[vehicle];
    const selectedPackage = packageSizes[packageSize];
    
    let base = selectedVehicle.base;
    let kmCost = distance * selectedVehicle.perKm;
    let pkgCost = selectedPackage.surcharge;
    
    let subtotal = base + kmCost + pkgCost;
    
    if (isExpress) {
      subtotal *= 1.25; // +25% Express charge
    }
    
    setPrice(parseFloat(subtotal.toFixed(2)));
  }, [vehicle, packageSize, distance, isExpress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const orderId = `FR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      name: bookingData.name,
      company: bookingData.company,
      email: bookingData.email,
      phone: bookingData.phone,
      pickup: bookingData.pickup,
      delivery: bookingData.delivery,
      price: price,
      status: 'pending',
      date: bookingData.date,
      time: bookingData.time
    };
    if (onBookOrder) {
      onBookOrder(newOrder);
    }
    setBookingData({ ...bookingData, orderId });
    setBookingSubmitted(true);
  };

  const resetCalculator = () => {
    setStep(1);
    setBookingSubmitted(false);
    setBookingData({
      name: '',
      email: '',
      company: '',
      phone: '',
      pickup: '',
      delivery: '',
      date: '',
      time: '',
      orderId: ''
    });
  };

  return (
    <section id="calculator" className="calculator-section">
      <div className="container">
        <div className="section-header">
          <h2>Sofort-Tarifrechner</h2>
          <p>Kalkulieren Sie die Kosten für Ihren Transport direkt online und buchen Sie Ihren Kurier mit wenigen Klicks.</p>
        </div>

        <div className="calculator-grid">
          {/* Left Panel: Configurations */}
          <div className="glass-card calculator-panel">
            {step === 1 && (
              <div className="calc-step animate-fade-in">
                <div className="step-indicator">Schritt 1 von 3</div>
                <h3 className="step-title">Fahrzeugtyp auswählen</h3>
                
                <div className="vehicles-selector-grid">
                  {Object.keys(vehicles).map((key) => (
                    <div
                      key={key}
                      className={`vehicle-card glass-card ${vehicle === key ? 'active' : ''}`}
                      onClick={() => setVehicle(key)}
                    >
                      <span className="v-icon">{vehicles[key].icon}</span>
                      <span className="v-name">{vehicles[key].name}</span>
                      <div className="v-specs">
                        <span>Max. Gewicht: {vehicles[key].maxWeight}</span>
                        <span>Basis: €{vehicles[key].base.toFixed(2)} + €{vehicles[key].perKm.toFixed(2)}/km</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="step-footer">
                  <button className="btn btn-primary ml-auto" onClick={() => setStep(2)}>
                    <span>Weiter</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="calc-step animate-fade-in">
                <div className="step-indicator">Schritt 2 von 3</div>
                <h3 className="step-title">Sendung und Optionen</h3>
                
                <label className="input-label">Paketgröße / Gewichtsklasse</label>
                <div className="package-selector-grid">
                  {Object.keys(packageSizes).map((key) => (
                    <div
                      key={key}
                      className={`package-card glass-card ${packageSize === key ? 'active' : ''}`}
                      onClick={() => setPackageSize(key)}
                    >
                      <span className="p-name">{packageSizes[key].name}</span>
                      {packageSizes[key].surcharge > 0 ? (
                        <span className="p-price">+€{packageSizes[key].surcharge.toFixed(2)}</span>
                      ) : (
                        <span className="p-price free">Inklusive</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="express-toggle-container glass-card">
                  <div className="toggle-text">
                    <strong>⚡ Express-Zustellung (Same-Day Priority)</strong>
                    <p>Schnellstmögliche Abholung und Zustellung (+25% Express-Zuschlag)</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={isExpress}
                      onChange={(e) => setIsExpress(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="step-footer">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>&larr; Zurück</button>
                  <button className="btn btn-primary" onClick={() => setStep(3)}>Weiter &rarr;</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="calc-step animate-fade-in">
                <div className="step-indicator">Schritt 3 von 3</div>
                <h3 className="step-title">Entfernung & Route</h3>
                
                <div className="distance-slider-box glass-card">
                  <div className="slider-header">
                    <span>Geschätzte Fahrtstrecke:</span>
                    <strong className="distance-value">{distance} KM</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="distance-range"
                  />
                  <div className="slider-footer">
                    <span>1 KM</span>
                    <span>Innerhalb EU (max. 500 KM)</span>
                  </div>
                </div>

                <div className="quick-routes">
                  <span>Schnellauswahl:</span>
                  <div className="quick-btn-grid">
                    <button className="btn btn-secondary btn-sm" onClick={() => setDistance(15)}>Vorarlberg Lokal (15 km)</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setDistance(120)}>München / Zürich (120 km)</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setDistance(350)}>Wien / Frankfurt (350 km)</button>
                  </div>
                </div>

                <div className="step-footer">
                  <button className="btn btn-secondary" onClick={() => setStep(2)}>&larr; Zurück</button>
                  <button className="btn btn-primary" onClick={() => setStep(4)}>Angebot ansehen</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="calc-step animate-fade-in">
                {!bookingSubmitted ? (
                  <>
                    <h3 className="step-title">Transport buchen</h3>
                    <form className="booking-form" onSubmit={handleBookingSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Name / Ansprechpartner *</label>
                          <input type="text" name="name" required value={bookingData.name} onChange={handleInputChange} placeholder="Max Mustermann" />
                        </div>
                        <div className="form-group">
                          <label>Firma (Optional)</label>
                          <input type="text" name="company" value={bookingData.company} onChange={handleInputChange} placeholder="Muster GmbH" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>E-Mail-Adresse *</label>
                          <input type="email" name="email" required value={bookingData.email} onChange={handleInputChange} placeholder="max@muster.at" />
                        </div>
                        <div className="form-group">
                          <label>Telefonnummer *</label>
                          <input type="tel" name="phone" required value={bookingData.phone} onChange={handleInputChange} placeholder="+43 664 123456" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Abholadresse *</label>
                          <input type="text" name="pickup" required value={bookingData.pickup} onChange={handleInputChange} placeholder="Strasse, PLZ Ort (z.B. Wolfurt)" />
                        </div>
                        <div className="form-group">
                          <label>Lieferadresse *</label>
                          <input type="text" name="delivery" required value={bookingData.delivery} onChange={handleInputChange} placeholder="Strasse, PLZ Ort" />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Abholdatum *</label>
                          <input type="date" name="date" required value={bookingData.date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label>Uhrzeit *</label>
                          <input type="time" name="time" required value={bookingData.time} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="step-footer mt-4">
                        <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>&larr; Route ändern</button>
                        <button type="submit" className="btn btn-primary">Verbindlich Buchen</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="booking-success animate-fade-in">
                    <span className="success-icon">✓</span>
                    <h3>Buchung erfolgreich eingegangen!</h3>
                    <p>
                      Vielen Dank für Ihren Auftrag. Eine Bestätigungs-E-Mail wurde an <strong>{bookingData.email}</strong> gesendet. <br />
                      Ein Mitarbeiter wird sich in Kürze zur Bestätigung der Abholzeit bei Ihnen melden.
                    </p>
                    <div className="booking-summary-box glass-card">
                      <div><strong>Auftrags-ID:</strong> {bookingData.orderId}</div>
                      <div><strong>Abholung:</strong> {bookingData.pickup} ({bookingData.date} - {bookingData.time})</div>
                      <div><strong>Lieferung:</strong> {bookingData.delivery}</div>
                      <div><strong>Gesamtpreis:</strong> €{(price * 1.2).toFixed(2)} (Inkl. 20% USt.)</div>
                    </div>
                    <button className="btn btn-secondary" onClick={resetCalculator}>Neuen Tarif berechnen</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel: Live Pricing Ticket */}
          <div className="glass-card pricing-ticket">
            <div className="ticket-header">
              <h4>Kostenübersicht</h4>
              <span className="ticket-badge">Angebot</span>
            </div>
            
            <div className="ticket-body">
              <div className="ticket-line">
                <span>Fahrzeug ({vehicles[vehicle].icon}):</span>
                <span>€{vehicles[vehicle].base.toFixed(2)}</span>
              </div>
              <div className="ticket-line">
                <span>Strecke ({distance} KM):</span>
                <span>€{(distance * vehicles[vehicle].perKm).toFixed(2)}</span>
              </div>
              <div className="ticket-line">
                <span>Gewicht/Zustand:</span>
                <span>
                  {packageSizes[packageSize].surcharge > 0 
                    ? `+€${packageSizes[packageSize].surcharge.toFixed(2)}` 
                    : 'Kostenlos'}
                </span>
              </div>
              
              {isExpress && (
                <div className="ticket-line express-line">
                  <span>⚡ Express-Zuschlag (+25%):</span>
                  <span>Berechnet</span>
                </div>
              )}

              <div className="ticket-divider"></div>
              
              <div className="ticket-total-box">
                <div className="total-netto">
                  <span>Netto Gesamt:</span>
                  <strong>€{price.toFixed(2)}</strong>
                </div>
                <div className="total-brutto">
                  <span>Inkl. 20% MwSt:</span>
                  <span>€{(price * 1.20).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="ticket-footer">
              <p>Berechnungen basieren auf Standard-Kilometertarifen der Aliyilmaz GmbH. Mautgebühren im Ausland sind nicht inbegriffen.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calculator-section {
          background-color: var(--bg-color);
          position: relative;
        }

        .calculator-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: start;
        }

        .calculator-panel {
          padding: 40px;
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }

        .calc-step {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex-grow: 1;
        }

        .step-indicator {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .step-title {
          font-size: 28px;
          font-weight: 850;
          margin-bottom: 30px;
        }

        /* Step 1: Vehicles */
        .vehicles-selector-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 30px;
        }

        .vehicle-card {
          display: grid;
          grid-template-columns: 50px 1.2fr 1fr;
          align-items: center;
          padding: 20px;
          cursor: pointer;
          border-radius: 12px;
          text-align: left;
        }

        .vehicle-card.active {
          border-color: var(--primary-color);
          background-color: rgba(227, 6, 19, 0.03);
          box-shadow: var(--red-glow);
        }

        .v-icon {
          font-size: 28px;
        }

        .v-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 16px;
        }

        .v-specs {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: var(--text-secondary);
          text-align: right;
        }

        .step-footer {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        .ml-auto {
          margin-left: auto;
        }

        /* Step 2: Package & Options */
        .input-label {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 12px;
          display: block;
          text-align: left;
        }

        .package-selector-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }

        .package-card {
          padding: 20px;
          cursor: pointer;
          text-align: center;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .package-card.active {
          border-color: var(--primary-color);
          background-color: rgba(227, 6, 19, 0.03);
          box-shadow: var(--red-glow);
        }

        .p-name {
          font-weight: 600;
          font-size: 13px;
        }

        .p-price {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-color);
        }

        .p-price.free {
          color: #10b981;
        }

        /* Toggle switch */
        .express-toggle-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .toggle-text {
          text-align: left;
        }

        .toggle-text strong {
          color: var(--text-main);
          font-size: 15px;
        }

        .toggle-text p {
          color: var(--text-secondary);
          font-size: 13px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 26px;
          flex-shrink: 0;
        }

        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #374151;
          transition: .4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: var(--primary-color);
          box-shadow: var(--red-glow);
        }

        input:checked + .slider:before {
          transform: translateX(24px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        /* Step 3: Route */
        .distance-slider-box {
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .slider-header span {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .distance-value {
          font-size: 28px;
          font-family: var(--font-heading);
          color: var(--primary-color);
        }

        .distance-range {
          width: 100%;
          height: 6px;
          background: #374151;
          border-radius: 5px;
          outline: none;
          -webkit-appearance: none;
          accent-color: var(--primary-color);
          margin-bottom: 12px;
        }

        .slider-footer {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text-muted);
        }

        .quick-routes {
          text-align: left;
          margin-bottom: 30px;
        }

        .quick-routes span {
          display: block;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .quick-btn-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 13px;
          border-radius: 8px;
        }

        /* Step 4: Booking Form */
        .booking-form {
          text-align: left;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group input {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-main);
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }

        .form-group input:focus {
          border-color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: var(--red-glow);
        }

        .mt-4 {
          margin-top: 24px;
        }

        /* Booking Success */
        .booking-success {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
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

        .booking-success h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .booking-success p {
          color: var(--text-secondary);
          margin-bottom: 30px;
          font-size: 15px;
          line-height: 1.6;
        }

        .booking-summary-box {
          padding: 24px;
          border-radius: 12px;
          text-align: left;
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14px;
        }

        .booking-summary-box strong {
          color: var(--text-main);
        }

        /* Ticket Style Panel */
        .pricing-ticket {
          padding: 40px;
          background: linear-gradient(180deg, rgba(22, 28, 38, 0.8) 0%, rgba(13, 17, 24, 0.8) 100%);
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          min-height: 480px;
          text-align: left;
        }

        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .ticket-header h4 {
          font-size: 18px;
          font-weight: 700;
        }

        .ticket-badge {
          background-color: var(--primary-color);
          color: white;
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: var(--red-glow-strong);
        }

        .ticket-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1;
        }

        .ticket-line {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          color: var(--text-secondary);
        }

        .express-line {
          color: var(--primary-color);
          font-weight: 600;
        }

        .ticket-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 10px 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .ticket-total-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .total-netto {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
        }

        .total-netto strong {
          font-size: 24px;
          color: var(--text-main);
          font-family: var(--font-heading);
        }

        .total-brutto {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .ticket-footer {
          margin-top: auto;
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
        }

        .ticket-footer p {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1fr;
          }
          .pricing-ticket {
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .calculator-panel {
            padding: 24px;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .package-selector-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
