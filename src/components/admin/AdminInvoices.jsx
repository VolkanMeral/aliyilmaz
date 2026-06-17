import React, { useState } from 'react';

export default function AdminInvoices({ invoices, onMarkPaid }) {
  const [activeInvoice, setActiveInvoice] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admin-invoices animate-fade-in">
      <div className="invoices-header">
        <h2>Buchhaltung & Rechnungen</h2>
      </div>

      {!activeInvoice ? (
        <div className="glass-card invoices-table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Rechnungs-Nr.</th>
                  <th>Auftrags-Ref</th>
                  <th>Kunde</th>
                  <th>Datum</th>
                  <th>Fälligkeit</th>
                  <th>Betrag (Brutto)</th>
                  <th>Zahlungsstatus</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td><strong>{inv.invoiceNo}</strong></td>
                    <td>{inv.orderId}</td>
                    <td>
                      <div className="client-cell">
                        <strong>{inv.clientName}</strong>
                        {inv.clientCompany && <span>{inv.clientCompany}</span>}
                      </div>
                    </td>
                    <td>{inv.date}</td>
                    <td>{inv.dueDate}</td>
                    <td>€{(inv.amount * 1.20).toFixed(2)} <br /><span className="text-muted-small">Netto: €{inv.amount.toFixed(2)}</span></td>
                    <td>
                      <span className={`status-pill ${inv.status}`}>
                        {inv.status === 'paid' ? 'Bezahlt' : 'Offen'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {inv.status === 'unpaid' && (
                          <button 
                            className="btn btn-primary btn-xs"
                            onClick={() => onMarkPaid(inv.id)}
                          >
                            Ödendi Yap
                          </button>
                        )}
                        <button 
                          className="btn btn-secondary btn-xs ml-2"
                          onClick={() => setActiveInvoice(inv)}
                        >
                          Drucken
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Printable Invoice View (Print Style Template) */
        <div className="invoice-print-container animate-fade-in">
          <div className="print-actions no-print">
            <button className="btn btn-secondary" onClick={() => setActiveInvoice(null)}>&larr; Zurück</button>
            <button className="btn btn-primary" onClick={handlePrint}>🖨️ Faturayı Yazdır (Drucken)</button>
          </div>

          <div className="printable-invoice glass-card">
            {/* Header info */}
            <div className="invoice-header-block">
              <div className="brand-sec">
                <span className="logo-text">Aliyilmaz</span>
                <span className="logo-sub">GmbH</span>
                <span className="logo-dot"></span>
                <p>Express-Logistik & Kleintransporte</p>
              </div>
              <div className="company-details-sec">
                <strong>Aliyilmaz GmbH</strong> <br />
                Musterstraße 42, 9500 Villach, Kärnten, Österreich <br />
                E-Mail: office@aliyilmaz.gmbh <br />
                UID: ATU12345678
              </div>
            </div>

            <div className="invoice-divider"></div>

            {/* Address fields */}
            <div className="invoice-address-block">
              <div className="client-address">
                <span className="address-label">Empfänger:</span>
                <strong>{activeInvoice.clientCompany || activeInvoice.clientName}</strong> <br />
                {activeInvoice.clientCompany && <span>Ansprechpartner: {activeInvoice.clientName}</span>} <br />
                Mustergasse 10 <br />
                9020 Klagenfurt, Österreich
              </div>
              <div className="invoice-meta-info">
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Rechnungsnummer:</strong></td>
                      <td>{activeInvoice.invoiceNo}</td>
                    </tr>
                    <tr>
                      <td><strong>Rechnungsdatum:</strong></td>
                      <td>{activeInvoice.date}</td>
                    </tr>
                    <tr>
                      <td><strong>Fälligkeitsdatum:</strong></td>
                      <td>{activeInvoice.dueDate}</td>
                    </tr>
                    <tr>
                      <td><strong>Bestell-Referenz:</strong></td>
                      <td>{activeInvoice.orderId}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table of items */}
            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th>Beschreibung</th>
                  <th>Menge</th>
                  <th>Einzelpreis</th>
                  <th>Gesamtpreis (Netto)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Kurierdienstleistung (Same-Day Express)</strong> <br />
                    <span>Express-Transport von Kärnten nach Vorarlberg. Distanz ca. 350km.</span>
                  </td>
                  <td>1</td>
                  <td>€{activeInvoice.amount.toFixed(2)}</td>
                  <td>€{activeInvoice.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Total calculation */}
            <div className="invoice-totals-sec">
              <table className="totals-table">
                <tbody>
                  <tr>
                    <td>Subtotal (Netto):</td>
                    <td>€{activeInvoice.amount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>+20% Umsatzsteuer:</td>
                    <td>€{(activeInvoice.amount * 0.2).toFixed(2)}</td>
                  </tr>
                  <tr className="grand-total-row">
                    <td><strong>Gesamtsumme (Brutto):</strong></td>
                    <td><strong>€{(activeInvoice.amount * 1.2).toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Legal footer info */}
            <div className="invoice-legal-footer">
              <p>Zahlbar innerhalb von 14 Tagen ohne Abzug. Bankverbindung: IBAN AT12 3456 7890 1234 5678, BIC AAAAUTWWXXX. Vielen Dank für Ihren Auftrag!</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .invoices-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          text-align: left;
        }

        .invoices-header h2 {
          font-size: 28px;
          font-weight: 850;
        }

        .invoices-table-card {
          padding: 24px;
        }

        /* Printable Invoice Layout */
        .invoice-print-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .print-actions {
          display: flex;
          justify-content: space-between;
          background-color: rgba(255,255,255,0.02);
          border: 1px solid var(--border-color);
          padding: 16px;
          border-radius: 12px;
        }

        .printable-invoice {
          padding: 60px;
          background-color: #ffffff !important;
          color: #1f2937 !important;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.6;
        }

        .printable-invoice h1, .printable-invoice h2, .printable-invoice h3, .printable-invoice h4, .printable-invoice strong {
          color: #111827 !important;
        }

        .invoice-header-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          text-align: left;
        }

        .brand-sec .logo-text { color: #111827 !important; font-weight: 800; font-size: 26px; }
        .brand-sec .logo-sub { color: var(--primary-color) !important; font-weight: 400; font-size: 22px; }
        .brand-sec .logo-dot { background-color: var(--primary-color) !important; width: 6px; height: 6px; }
        .brand-sec p { font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 4px; }

        .company-details-sec {
          text-align: right;
          font-size: 12px;
          color: #4b5563;
        }

        .invoice-divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 30px 0;
        }

        .invoice-address-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          text-align: left;
          margin-bottom: 40px;
        }

        .address-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .invoice-meta-info {
          display: flex;
          justify-content: flex-end;
        }

        .invoice-meta-info table td {
          padding: 4px 8px;
        }

        .invoice-items-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          margin-bottom: 40px;
        }

        .invoice-items-table th {
          background-color: #f3f4f6;
          color: #374151;
          font-weight: 700;
          padding: 12px 16px;
          border-bottom: 2px solid #e5e7eb;
        }

        .invoice-items-table td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .invoice-items-table td span {
          font-size: 12px;
          color: #6b7280;
        }

        .invoice-totals-sec {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 40px;
        }

        .totals-table {
          width: 320px;
        }

        .totals-table td {
          padding: 8px 12px;
          text-align: right;
        }

        .grand-total-row {
          border-top: 2px solid #e5e7eb;
          font-size: 16px;
        }

        .invoice-legal-footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 24px;
          font-size: 11px;
          color: #6b7280;
          text-align: center;
        }

        /* Print Specific CSS Stylesheet Override */
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-print-container, .printable-invoice, .printable-invoice * {
            visibility: visible;
          }
          .printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 0;
            background: #ffffff !important;
            color: #1f2937 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
