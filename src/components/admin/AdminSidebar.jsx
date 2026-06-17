import React from 'react';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Aufträge', icon: '📦' },
    { id: 'drivers', label: 'Fahrer & Reports', icon: '🚚' },
    { id: 'applications', label: 'Bewerbungen', icon: '🪪' },
    { id: 'invoices', label: 'Buchhaltung', icon: '💼' },
    { id: 'settings', label: 'Einstellungen', icon: '⚙️' }
  ];

  return (
    <aside className="admin-sidebar glass-card">
      <div className="sidebar-brand">
        <span className="logo-text">Aliyilmaz</span>
        <span className="logo-sub">GmbH</span>
        <span className="logo-dot"></span>
      </div>
      <div className="sidebar-role">Admin-Panel</div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-secondary w-full btn-logout" onClick={onLogout}>
          <span>Abmelden</span>
          <span>🚪</span>
        </button>
      </div>

      <style>{`
        .admin-sidebar {
          width: 260px;
          height: calc(100vh - 48px);
          position: sticky;
          top: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          border-radius: 20px;
          border-color: var(--border-color);
        }

        .sidebar-brand {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .sidebar-role {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary-color);
          font-weight: 700;
          margin-bottom: 30px;
          text-align: left;
        }

        .sidebar-nav {
          flex-grow: 1;
        }

        .sidebar-nav ul {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-link {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.03);
          color: var(--text-main);
        }

        .sidebar-link.active {
          background-color: rgba(227, 6, 19, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(227, 6, 19, 0.15);
        }

        .sidebar-icon {
          font-size: 16px;
        }

        .sidebar-footer {
          margin-top: auto;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
        }

        .btn-logout {
          padding: 10px;
          font-size: 13px;
          border-radius: 8px;
        }
      `}</style>
    </aside>
  );
}
