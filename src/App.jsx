import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PriceCalculator from './components/PriceCalculator';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPortal from './components/admin/AdminPortal';

function App() {
  const [view, setView] = useState('public'); // 'public', 'admin'
  const [activePage, setActivePage] = useState('hero');

  // 1. Sürücüler (Default active drivers)
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Ali Yılmaz', phone: '+43 664 111111', vehicle: 'Transporter', status: 'active' },
    { id: 2, name: 'Michael Huber', phone: '+43 664 222222', vehicle: 'PKW', status: 'active' },
    { id: 3, name: 'Stefan Berger', phone: '+43 664 333333', vehicle: 'Kombi', status: 'active' }
  ]);

  // 2. Siparişler (Default orders list)
  const [orders, setOrders] = useState([
    {
      id: 'FR-2026-1029',
      name: 'Max Klinger',
      company: 'Klinger AG',
      email: 'office@klinger.at',
      phone: '+43 5574 54321',
      pickup: 'Klagenfurt',
      delivery: 'Villach',
      price: 180.00,
      status: 'assigned',
      driverId: 1,
      date: '2026-06-17',
      time: '10:30'
    },
    {
      id: 'FR-2026-1030',
      name: 'Julia Beck',
      company: '',
      email: 'julia.beck@gmail.com',
      phone: '+43 660 777777',
      pickup: 'Villach',
      delivery: 'Klagenfurt',
      price: 52.00,
      status: 'delivered',
      driverId: 2,
      date: '2026-06-16',
      time: '15:00'
    },
    {
      id: 'FR-2026-1031',
      name: 'Hannes Lang',
      company: 'Linde Tech GmbH',
      email: 'h.lang@lindetech.at',
      phone: '+43 5574 98765',
      pickup: 'Spittal',
      delivery: 'Villach',
      price: 85.00,
      status: 'pending',
      date: '2026-06-17',
      time: '16:30'
    }
  ]);

  // 3. Başvurular (Default applicant list)
  const [applications, setApplications] = useState([
    {
      id: 1,
      firstName: 'Thomas',
      lastName: 'Miller',
      birthdate: '1995-04-12',
      email: 'thomas@miller.com',
      phone: '+49 176 123456',
      address: 'Hauptstraße 15',
      zip: '9020',
      city: 'Klagenfurt',
      citizenship: 'DE',
      employment: 'angestellt',
      status: 'pending'
    },
    {
      id: 2,
      firstName: 'Adnan',
      lastName: 'Kovac',
      birthdate: '1992-09-24',
      email: 'adnan@kovac.com',
      phone: '+43 664 888888',
      address: 'Bahnhofstraße 3',
      zip: '9500',
      city: 'Villach',
      citizenship: 'NON_EU',
      employment: 'selbststaendig',
      status: 'pending'
    }
  ]);

  // 4. Faturalar (Default invoices linked to orders)
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: 'RE-2026-4029',
      orderId: 'FR-2026-1029',
      clientName: 'Max Klinger',
      clientCompany: 'Klinger AG',
      amount: 180.00,
      date: '17.06.2026',
      dueDate: '01.07.2026',
      status: 'unpaid'
    },
    {
      id: 2,
      invoiceNo: 'RE-2026-4030',
      orderId: 'FR-2026-1030',
      clientName: 'Julia Beck',
      clientCompany: '',
      amount: 52.00,
      date: '16.06.2026',
      dueDate: '30.06.2026',
      status: 'paid'
    }
  ]);

  // Observer to highlight navigation item in view on scroll
  useEffect(() => {
    if (view !== 'public') return;

    const sections = ['hero', 'services', 'calculator', 'careers', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePage(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [view]);

  // --- State Modifiers ---

  const handleBookOrder = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
    
    // Auto-generate invoice
    const newInvoice = {
      id: invoices.length + 1,
      invoiceNo: `RE-${new Date().getFullYear()}-${Math.floor(4000 + Math.random() * 5999)}`,
      orderId: newOrder.id,
      clientName: newOrder.name,
      clientCompany: newOrder.company,
      amount: newOrder.price,
      date: new Date().toLocaleDateString('de-AT'),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('de-AT'),
      status: 'unpaid'
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const handleSubmitApplication = (newApp) => {
    setApplications(prev => [...prev, newApp]);
  };

  const handleApproveApplication = (appId) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: 'approved' } : app));
    
    const app = applications.find(a => a.id === appId);
    if (app) {
      const newDriver = {
        id: drivers.length + 1,
        name: `${app.firstName} ${app.lastName}`,
        phone: app.phone,
        vehicle: app.employment === 'selbststaendig' ? 'Kombi' : 'PKW',
        status: 'active'
      };
      setDrivers(prev => [...prev, newDriver]);
    }
  };

  const handleRejectApplication = (appId) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: 'rejected' } : app));
  };

  const handleMarkInvoicePaid = (invoiceId) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: 'paid' } : inv));
    
    const invoice = invoices.find(i => i.id === invoiceId);
    if (invoice) {
      setOrders(prev => prev.map(o => o.id === invoice.orderId ? { ...o, status: 'delivered' } : o));
    }
  };

  const handleToggleDriverStatus = (driverId) => {
    setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d));
  };

  const handleAssignDriver = (orderId, driverId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, driverId, status: 'assigned' } : o));
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // Switch to main site
  const handleBackToSite = () => {
    setView('public');
    // Scroll back to top
    setTimeout(() => {
      const el = document.getElementById('hero');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (view === 'admin') {
    return (
      <AdminPortal
        orders={orders}
        drivers={drivers}
        applications={applications}
        invoices={invoices}
        onAssignDriver={handleAssignDriver}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onApproveApplication={handleApproveApplication}
        onRejectApplication={handleRejectApplication}
        onMarkInvoicePaid={handleMarkInvoicePaid}
        onToggleDriverStatus={handleToggleDriverStatus}
        onBackToSite={handleBackToSite}
      />
    );
  }

  return (
    <>
      <Navbar onNavigate={setActivePage} activePage={activePage} onViewChange={setView} />
      <main>
        <Hero onNavigate={setActivePage} />
        <Services />
        <PriceCalculator onBookOrder={handleBookOrder} />
        <Careers onSubmitApplication={handleSubmitApplication} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
