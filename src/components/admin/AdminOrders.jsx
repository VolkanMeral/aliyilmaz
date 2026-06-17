import React, { useState } from 'react';

export default function AdminOrders({ orders, drivers, onAssignDriver, onUpdateStatus }) {
  const [filter, setFilter] = useState('all');
  const [assigningOrderId, setAssigningOrderId] = useState(null);

  // Filter orders
  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  const getDriverName = (driverId) => {
    const d = drivers.find(drv => drv.id === parseInt(driverId));
    return d ? d.name : 'Nicht zugewiesen';
  };

  const handleAssignClick = (orderId) => {
    setAssigningOrderId(orderId);
  };

  const handleSelectDriver = (orderId, driverId) => {
    onAssignDriver(orderId, parseInt(driverId));
    setAssigningOrderId(null);
  };

  return (
    <div className="admin-orders animate-fade-in">
      <div className="orders-header">
        <h2>Auftragsverwaltung</h2>
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Alle</button>
          <button className={`filter-tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Warten</button>
          <button className={`filter-tab ${filter === 'assigned' ? 'active' : ''}`} onClick={() => setFilter('assigned')}>Zugewiesen</button>
          <button className={`filter-tab ${filter === 'delivered' ? 'active' : ''}`} onClick={() => setFilter('delivered')}>Geliefert</button>
        </div>
      </div>

      <div className="glass-card orders-table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Datum & Zeit</th>
                <th>Kunde</th>
                <th>Abholung &rarr; Lieferung</th>
                <th>Preis (Netto)</th>
                <th>Zugeordneter Fahrer</th>
                <th>Status</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.date} <br /><span className="text-muted-small">{order.time}</span></td>
                    <td>
                      <div className="client-cell">
                        <strong>{order.company || order.name}</strong>
                        <span>{order.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="route-cell">
                        <span className="pickup-text">📍 {order.pickup}</span>
                        <span className="delivery-text">🏁 {order.delivery}</span>
                      </div>
                    </td>
                    <td>€{order.price.toFixed(2)}</td>
                    <td>
                      {assigningOrderId === order.id ? (
                        <div className="assign-select-container">
                          <select 
                            className="assign-select"
                            onChange={(e) => handleSelectDriver(order.id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Fahrer wählen...</option>
                            {drivers.filter(d => d.status === 'active').map(d => (
                              <option key={d.id} value={d.id}>{d.name} ({d.vehicle})</option>
                            ))}
                          </select>
                          <button className="btn btn-secondary btn-xs-close" onClick={() => setAssigningOrderId(null)}>&times;</button>
                        </div>
                      ) : (
                        <div className="driver-display">
                          <span>{getDriverName(order.driverId)}</span>
                          {order.status === 'pending' && (
                            <button className="btn btn-secondary btn-xs ml-2" onClick={() => handleAssignClick(order.id)}>Zuweisen</button>
                          )}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-pill ${order.status}`}>
                        {order.status === 'pending' ? 'Warten' : order.status === 'assigned' ? 'Zugewiesen' : 'Geliefert'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {order.status === 'assigned' && (
                          <button 
                            className="btn btn-primary btn-xs"
                            onClick={() => onUpdateStatus(order.id, 'delivered')}
                          >
                            Als geliefert markieren
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <span className="action-success-text">Erledigt ✓</span>
                        )}
                        {order.status === 'pending' && (
                          <span className="action-pending-text">Wartet auf Zuweisung</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-table-msg">Keine Aufträge in dieser Kategorie gefunden.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .orders-header h2 {
          font-size: 28px;
          font-weight: 850;
        }

        /* Filter Tabs */
        .filter-tabs {
          display: flex;
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 4px;
          border-radius: 10px;
        }

        .filter-tab {
          padding: 8px 16px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-tab:hover {
          color: var(--text-main);
        }

        .filter-tab.active {
          background-color: var(--primary-color);
          color: white;
          box-shadow: var(--red-glow);
        }

        .orders-table-card {
          padding: 24px;
        }

        .text-muted-small {
          font-size: 11px;
          color: var(--text-muted);
        }

        .client-cell, .route-cell {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .client-cell strong {
          color: var(--text-main);
        }

        .client-cell span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .route-cell span {
          font-size: 13px;
        }

        .pickup-text {
          color: #3b82f6;
        }

        .delivery-text {
          color: #10b981;
          margin-top: 4px;
        }

        .empty-table-msg {
          text-align: center;
          padding: 40px !important;
          color: var(--text-secondary);
        }

        /* Inline driver assign */
        .driver-display {
          display: flex;
          align-items: center;
        }

        .assign-select-container {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .assign-select {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 6px 10px;
          color: var(--text-main);
          font-size: 13px;
          outline: none;
        }

        .btn-xs {
          padding: 6px 12px;
          font-size: 11px;
          border-radius: 6px;
        }

        .btn-xs-close {
          background: transparent;
          color: var(--text-secondary);
          font-size: 20px;
          border: none;
          cursor: pointer;
        }

        .btn-xs-close:hover {
          color: var(--primary-color);
        }

        .ml-2 {
          margin-left: 8px;
        }

        .action-success-text {
          color: #10b981;
          font-weight: 600;
          font-size: 13px;
        }

        .action-pending-text {
          color: var(--text-muted);
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}
