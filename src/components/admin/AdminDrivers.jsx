import React, { useState } from 'react';

export default function AdminDrivers({ drivers, onToggleStatus }) {
  const [activeSubTab, setActiveSubTab] = useState('list'); // 'list', 'import', 'kpi'
  const [isDragging, setIsDragging] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importedData, setImportedData] = useState(null);

  // Mock excel file import simulation
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    simulateImport();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      simulateImport();
    }
  };

  const simulateImport = () => {
    setImportSuccess(true);
    setImportedData({
      fileName: 'Rider_Payout_Report_June_2026.xlsx',
      fileSize: '412 KB',
      rowsCount: 142,
      mappedColumns: {
        'Fahrer Name': 'Name',
        'Stunden': 'Arbeitsstunden',
        'KM': 'KM Bestätigt',
        'Aufträge': 'Bestellungen Geliefert'
      },
      kpiResults: [
        { name: 'Ali Yılmaz', hours: 140, km: 3240, acceptance: '98%', ordersPerHour: 2.1, risk: true, riskReason: 'estimated_total_km > 3000' },
        { name: 'Michael Huber', hours: 96, km: 1200, acceptance: '88%', ordersPerHour: 1.8, risk: false },
        { name: 'Stefan Berger', hours: 110, km: 1450, acceptance: '74%', ordersPerHour: 1.2, risk: true, riskReason: 'acceptance_rate < 80% UND orders_per_hour < 1.5' }
      ]
    });
  };

  return (
    <div className="admin-drivers animate-fade-in">
      <div className="drivers-header">
        <h2>Fahrer & Fuhrpark</h2>
        <div className="filter-tabs">
          <button className={`filter-tab ${activeSubTab === 'list' ? 'active' : ''}`} onClick={() => setActiveSubTab('list')}>Fahrerliste</button>
          <button className={`filter-tab ${activeSubTab === 'import' ? 'active' : ''}`} onClick={() => setActiveSubTab('import')}>KPI / Rider-Report Import</button>
        </div>
      </div>

      {activeSubTab === 'list' && (
        <div className="glass-card drivers-table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Telefonnummer</th>
                  <th>Fahrzeugklasse</th>
                  <th>Status</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td><strong>#{driver.id}</strong></td>
                    <td>
                      <div className="driver-name-cell">
                        <strong>{driver.name}</strong>
                        <span>Schnittstelle: Sürücü</span>
                      </div>
                    </td>
                    <td>{driver.phone}</td>
                    <td>
                      <span className="vehicle-badge-pill">
                        {driver.vehicle === 'Transporter' ? '🚚 Transporter' : driver.vehicle === 'Kombi' ? '🚙 Kombi' : '🚗 PKW'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill-dot ${driver.status}`}>
                        <span className="dot"></span>
                        {driver.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn btn-xs ${driver.status === 'active' ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => onToggleStatus(driver.id)}
                      >
                        {driver.status === 'active' ? 'Deaktivieren' : 'Aktivieren'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'import' && (
        <div className="import-wrapper">
          {!importSuccess ? (
            <div 
              className={`dropzone glass-card ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="dropzone-content">
                <span className="drop-emoji">📊</span>
                <h3>Excel Rider-Report hochladen</h3>
                <p>Ziehen Sie die Monatsabrechnung (Excel/CSV) hierher oder wählen Sie eine Datei aus</p>
                <label className="btn btn-primary btn-select-file">
                  <span>Datei auswählen</span>
                  <input type="file" onChange={handleFileChange} accept=".xlsx,.xls,.csv" style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          ) : (
            <div className="import-results-layout animate-fade-in">
              {/* Left results card */}
              <div className="glass-card import-details-card">
                <div className="results-header">
                  <span className="success-icon-badge">✓</span>
                  <div>
                    <h3>{importedData.fileName}</h3>
                    <p>Erfolgreich importiert ({importedData.fileSize})</p>
                  </div>
                </div>

                <div className="divider-line"></div>

                <h4>Spalten-Zuordnung (Column Mapping)</h4>
                <div className="mapping-grid">
                  {Object.entries(importedData.mappedColumns).map(([key, val]) => (
                    <div key={key} className="mapping-item">
                      <span className="excel-col">🟢 Excel: "{key}"</span>
                      <span className="arrow-icon">&rarr;</span>
                      <span className="db-col">Datenbank: <strong>{val}</strong></span>
                    </div>
                  ))}
                </div>

                <div className="divider-line"></div>

                <button className="btn btn-secondary w-full" onClick={() => setImportSuccess(false)}>Neuen Report hochladen</button>
              </div>

              {/* Right KPI evaluation card */}
              <div className="glass-card kpi-card">
                <div className="kpi-header">
                  <h3>Sicherheitsbewertung & Risikologik</h3>
                  <span className="risk-indicator">DSGVO-Konform</span>
                </div>
                <p className="kpi-subtitle">Fahrer erscheinen als "Risikobehaftet" (Riskant) bei extremen Distanzen, hohen Fehlzeiten oder mangelnder Acceptance.</p>

                <div className="kpi-list">
                  {importedData.kpiResults.map((result, i) => (
                    <div key={i} className={`kpi-row glass-card ${result.risk ? 'risk-alert' : ''}`}>
                      <div className="kpi-name-sec">
                        <strong>{result.name}</strong>
                        <span>Arbeitsstunden: {result.hours} Std.</span>
                      </div>
                      <div className="kpi-stats">
                        <span>Kilometer: {result.km} km</span>
                        <span>Acceptance: {result.acceptance}</span>
                      </div>
                      <div className="kpi-status-tag">
                        {result.risk ? (
                          <div className="risk-badge-alert">
                            <strong>⚠️ Risiko</strong>
                            <p>{result.riskReason}</p>
                          </div>
                        ) : (
                          <span className="no-risk-tag">✅ Normal</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .drivers-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .drivers-header h2 {
          font-size: 28px;
          font-weight: 850;
        }

        .drivers-table-card {
          padding: 24px;
        }

        .driver-name-cell {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .driver-name-cell strong {
          color: var(--text-main);
        }

        .driver-name-cell span {
          font-size: 11px;
          color: var(--text-muted);
        }

        .vehicle-badge-pill {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: var(--text-main);
          font-weight: 600;
        }

        /* Status Pills Dot style */
        .status-pill-dot {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .status-pill-dot .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-pill-dot.active { color: #10b981; }
        .status-pill-dot.active .dot { background-color: #10b981; box-shadow: 0 0 6px #10b981; }
        
        .status-pill-dot.inactive { color: var(--text-muted); }
        .status-pill-dot.inactive .dot { background-color: var(--text-muted); }

        /* Excel Import dropzone */
        .dropzone {
          border: 2px dashed var(--border-color);
          border-radius: 20px;
          padding: 80px 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dropzone.dragging {
          border-color: var(--primary-color);
          background-color: rgba(227, 6, 19, 0.02);
        }

        .drop-emoji {
          font-size: 48px;
          margin-bottom: 20px;
          display: block;
        }

        .dropzone h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .dropzone p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .btn-select-file {
          display: inline-flex;
        }

        /* Import results layout */
        .import-results-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 30px;
          align-items: start;
        }

        .import-details-card, .kpi-card {
          padding: 30px;
          text-align: left;
        }

        .results-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .success-icon-badge {
          width: 44px;
          height: 44px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }

        .results-header h3 {
          font-size: 16px;
          color: var(--text-main);
        }

        .results-header p {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .divider-line {
          height: 1px;
          background-color: var(--border-color);
          margin: 20px 0;
        }

        .import-details-card h4 {
          font-size: 14px;
          margin-bottom: 16px;
          color: var(--text-secondary);
        }

        .mapping-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mapping-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.02);
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
        }

        .arrow-icon {
          color: var(--primary-color);
        }

        /* KPI Eval Card */
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .kpi-header h3 {
          font-size: 18px;
        }

        .risk-indicator {
          font-size: 10px;
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .kpi-subtitle {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .kpi-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .kpi-row {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1.1fr;
          align-items: center;
          padding: 16px;
          background-color: rgba(255, 255, 255, 0.01);
          border-radius: 10px;
        }

        .kpi-row.risk-alert {
          border-color: rgba(227, 6, 19, 0.25);
          background-color: rgba(227, 6, 19, 0.01);
        }

        .kpi-name-sec {
          display: flex;
          flex-direction: column;
        }

        .kpi-name-sec strong {
          color: var(--text-main);
          font-size: 14px;
        }

        .kpi-name-sec span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .kpi-stats {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          color: var(--text-secondary);
          text-align: left;
          gap: 4px;
        }

        .kpi-status-tag {
          text-align: right;
        }

        .no-risk-tag {
          color: #10b981;
          font-size: 12px;
          font-weight: 600;
        }

        .risk-badge-alert {
          color: var(--primary-color);
          text-align: right;
        }

        .risk-badge-alert strong {
          font-size: 12px;
          font-weight: 700;
          display: block;
        }

        .risk-badge-alert p {
          font-size: 10px;
          color: var(--text-secondary);
          margin-top: 2px;
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .import-results-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
