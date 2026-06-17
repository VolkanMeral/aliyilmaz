import React from 'react';

export default function AdminOverview({ orders, drivers, applications, invoices, setActiveTab }) {
  // Calculate stats
  const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').reduce((acc, inv) => acc + inv.amount, 0);
  const activeDriversCount = drivers.filter(d => d.status === 'active').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;

  return (
    <div className="admin-overview animate-fade-in">
      <h2 className="overview-title">Dashboard-Übersicht</h2>

      {/* Grid of Stats Cards */}
      <div className="stats-grid-row">
        <div className="glass-card stat-card" onClick={() => setActiveTab('invoices')}>
          <div className="card-top">
            <span className="card-emoji">💰</span>
            <span className="card-badge green">Abrechnung</span>
          </div>
          <div className="card-main">
            <h3>€{paidInvoices.toFixed(2)}</h3>
            <p>Eingenommener Umsatz</p>
          </div>
          <div className="card-footer">
            <span>Gesamtforderung: €{totalInvoiced.toFixed(2)}</span>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('orders')}>
          <div className="card-top">
            <span className="card-emoji">📦</span>
            <span className="card-badge red">Disposition</span>
          </div>
          <div className="card-main">
            <h3>{pendingOrdersCount}</h3>
            <p>Offene Bestellungen</p>
          </div>
          <div className="card-footer">
            <span>Gesamtbestellungen: {orders.length}</span>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('drivers')}>
          <div className="card-top">
            <span className="card-emoji">🚚</span>
            <span className="card-badge blue">Fuhrpark</span>
          </div>
          <div className="card-main">
            <h3>{activeDriversCount}</h3>
            <p>Aktive Fahrer</p>
          </div>
          <div className="card-footer">
            <span>Registrierte Fahrer: {drivers.length}</span>
          </div>
        </div>

        <div className="glass-card stat-card" onClick={() => setActiveTab('applications')}>
          <div className="card-top">
            <span className="card-emoji">🪪</span>
            <span className="card-badge purple">Karriere</span>
          </div>
          <div className="card-main">
            <h3>{pendingAppsCount}</h3>
            <p>Offene Bewerbungen</p>
          </div>
          <div className="card-footer">
            <span>Gesamtbewerbungen: {applications.length}</span>
          </div>
        </div>
      </div>

      {/* Recent Orders and System Logs */}
      <div className="overview-dashboard-layout">
        {/* Recent Orders List */}
        <div className="glass-card overview-list-card">
          <div className="card-header-row">
            <h3>Aktuelle Buchungen</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('orders')}>Alle anzeigen</button>
          </div>
          
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kunde</th>
                  <th>Route</th>
                  <th>Betrag</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(-4).reverse().map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.company || order.name}</td>
                    <td>{order.pickup} &rarr; {order.delivery}</td>
                    <td>€{order.price.toFixed(2)}</td>
                    <td>
                      <span className={`status-pill ${order.status}`}>
                        {order.status === 'pending' ? 'Warten' : order.status === 'assigned' ? 'Zugewiesen' : 'Geliefert'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="glass-card log-card">
          <h3>Aktivitätsprotokoll</h3>
          <div className="log-entries">
            <div className="log-entry">
              <span className="log-dot green"></span>
              <div className="log-text">
                <strong>Tarifrechner Online</strong>
                <span>System läuft stabil auf aliyilmaz.gmbh</span>
                <span className="log-time">Live</span>
              </div>
            </div>
            <div className="log-entry">
              <span className="log-dot blue"></span>
              <div className="log-text">
                <strong>FTP-Deploy-Erfolg</strong>
                <span>Hosttech-Synchronisation abgeschlossen</span>
                <span className="log-time">Vor wenigen Minuten</span>
              </div>
            </div>
            {orders.length > 3 && (
              <div className="log-entry">
                <span className="log-dot red"></span>
                <div className="log-text">
                  <strong>Neue Buchung eingegangen</strong>
                  <span>Kunde: {orders[orders.length-1].name} ({orders[orders.length-1].id})</span>
                  <span className="log-time">Kürzlich</span>
                </div>
              </div>
            )}
            {applications.length > 2 && (
              <div className="log-entry">
                <span className="log-dot purple"></span>
                <div className="log-text">
                  <strong>Neue Bewerbung eingetroffen</strong>
                  <span>Bewerber: {applications[applications.length-1].firstName}</span>
                  <span className="log-time">Heute</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .overview-title {
          font-size: 28px;
          font-weight: 850;
          margin-bottom: 30px;
          text-align: left;
        }

        .stats-grid-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          padding: 24px;
          text-align: left;
          cursor: pointer;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .card-emoji {
          font-size: 24px;
        }

        .card-badge {
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .card-badge.green { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .card-badge.red { background: rgba(227, 6, 19, 0.1); color: var(--primary-color); }
        .card-badge.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .card-badge.purple { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

        .card-main h3 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 4px;
          font-family: var(--font-heading);
        }

        .card-main p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .card-footer {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Lists and logs layout */
        .overview-dashboard-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 30px;
        }

        .overview-list-card {
          padding: 30px;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-header-row h3 {
          font-size: 18px;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .admin-table th, .admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table th {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .admin-table td {
          color: var(--text-main);
        }

        .admin-table tr:hover td {
          background-color: rgba(255,255,255,0.01);
        }

        /* Status Pills */
        .status-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          display: inline-block;
        }

        .status-pill.pending { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .status-pill.assigned { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .status-pill.delivered { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        /* Log Card */
        .log-card {
          padding: 30px;
          text-align: left;
        }

        .log-card h3 {
          font-size: 18px;
          margin-bottom: 24px;
        }

        .log-entries {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .log-entry {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .log-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
          position: relative;
        }

        .log-dot.green { background-color: #10b981; box-shadow: 0 0 8px #10b981; }
        .log-dot.blue { background-color: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
        .log-dot.red { background-color: var(--primary-color); box-shadow: 0 0 8px var(--primary-color); }
        .log-dot.purple { background-color: #8b5cf6; box-shadow: 0 0 8px #8b5cf6; }

        .log-text {
          display: flex;
          flex-direction: column;
          font-size: 13px;
        }

        .log-text strong {
          color: var(--text-main);
          font-weight: 600;
        }

        .log-text span {
          color: var(--text-secondary);
        }

        .log-time {
          font-size: 11px;
          color: var(--text-muted) !important;
          margin-top: 2px;
        }

        @media (max-width: 1200px) {
          .stats-grid-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .overview-dashboard-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .stats-grid-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
