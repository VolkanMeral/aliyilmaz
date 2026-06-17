import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import AdminOrders from './AdminOrders';
import AdminDrivers from './AdminDrivers';
import AdminApplications from './AdminApplications';
import AdminInvoices from './AdminInvoices';
import AdminSettings from './AdminSettings';

export default function AdminPortal({
  orders,
  drivers,
  applications,
  invoices,
  onAssignDriver,
  onUpdateOrderStatus,
  onApproveApplication,
  onRejectApplication,
  onMarkInvoicePaid,
  onToggleDriverStatus,
  onBackToSite
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} onBack={onBackToSite} />;
  }

  return (
    <div className="admin-portal-container">
      <div className="admin-layout animate-fade-in">
        {/* Sol Sidebar Menü */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

        {/* Sağ Modül Alanı */}
        <main className="admin-main-content">
          {activeTab === 'overview' && (
            <AdminOverview 
              orders={orders} 
              drivers={drivers} 
              applications={applications} 
              invoices={invoices} 
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders 
              orders={orders} 
              drivers={drivers} 
              onAssignDriver={onAssignDriver} 
              onUpdateStatus={onUpdateOrderStatus}
            />
          )}

          {activeTab === 'drivers' && (
            <AdminDrivers 
              drivers={drivers} 
              onToggleStatus={onToggleDriverStatus}
            />
          )}

          {activeTab === 'applications' && (
            <AdminApplications 
              applications={applications} 
              onApprove={onApproveApplication} 
              onReject={onRejectApplication}
            />
          )}

          {activeTab === 'invoices' && (
            <AdminInvoices 
              invoices={invoices} 
              onMarkPaid={onMarkInvoicePaid}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      <style>{`
        .admin-portal-container {
          min-height: 100vh;
          background-color: var(--bg-color);
          color: var(--text-main);
          padding: 24px;
        }

        .admin-layout {
          display: flex;
          gap: 30px;
          max-width: 1600px;
          margin: 0 auto;
          align-items: start;
        }

        .admin-main-content {
          flex-grow: 1;
          min-width: 0; /* fixes flex item overflowing container */
        }

        @media (max-width: 1024px) {
          .admin-layout {
            flex-direction: column;
            gap: 24px;
          }
          .admin-sidebar {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
}
