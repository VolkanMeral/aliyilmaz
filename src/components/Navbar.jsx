import React, { useState, useEffect } from 'react';

export default function Navbar({ onNavigate, activePage }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Startseite' },
    { id: 'services', label: 'Dienstleistungen' },
    { id: 'calculator', label: 'Tarifrechner' },
    { id: 'careers', label: 'Karriere' },
    { id: 'contact', label: 'Kontakt' }
  ];

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
    
    // Smooth scroll if element exists on current view
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => handleLinkClick('hero')}>
          <span className="logo-text">Aliyilmaz</span>
          <span className="logo-sub">GmbH</span>
          <span className="logo-dot"></span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button (Portal Login Dropdown) */}
        <div className="nav-actions">
          <div className="portal-dropdown-container">
            <button 
              className="btn btn-secondary btn-portal"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Portals</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                <div className="dropdown-backdrop" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="portal-dropdown glass-card">
                  <div className="dropdown-header">Login-Bereich</div>
                  <a href="#portal-kunde" className="dropdown-item" onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); alert('Kundenportal (Etappe 2) wird geladen...'); }}>
                    <div className="item-icon">💼</div>
                    <div className="item-text">
                      <strong>Kundenportal</strong>
                      <span>Aufträge buchen & tracken</span>
                    </div>
                  </a>
                  <a href="#portal-fahrer" className="dropdown-item" onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); alert('Fahrerportal (Etappe 2) wird geladen...'); }}>
                    <div className="item-icon">🚚</div>
                    <div className="item-text">
                      <strong>Fahrerportal</strong>
                      <span>Schichten & Fahrten verwalten</span>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#portal-admin" className="dropdown-item" onClick={(e) => { e.preventDefault(); setIsDropdownOpen(false); alert('Adminbereich (Etappe 2) wird geladen...'); }}>
                    <div className="item-icon">⚙️</div>
                    <div className="item-text">
                      <strong>Admin Backoffice</strong>
                      <span>Systemverwaltung & Abrechnung</span>
                    </div>
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass-card ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link) => (
            <li key={link.id} className="mobile-link-item">
              <a
                href={`#${link.id}`}
                className={`mobile-link ${activePage === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-divider"></li>
          <li className="mobile-portal-section">
            <span className="section-title">Portals</span>
            <div className="mobile-portal-buttons">
              <button className="btn btn-secondary w-full" onClick={() => { setIsMobileMenuOpen(false); alert('Kundenportal (Etappe 2)'); }}>Kundenportal</button>
              <button className="btn btn-secondary w-full" onClick={() => { setIsMobileMenuOpen(false); alert('Fahrerportal (Etappe 2)'); }}>Fahrerportal</button>
              <button className="btn btn-primary w-full" onClick={() => { setIsMobileMenuOpen(false); alert('Adminbereich (Etappe 2)'); }}>Admin Backoffice</button>
            </div>
          </li>
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          background-color: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          height: 70px;
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 24px;
          letter-spacing: -0.03em;
        }

        .logo-text {
          color: var(--text-main);
        }

        .logo-sub {
          color: var(--primary-color);
          margin-left: 2px;
          font-weight: 400;
          font-size: 20px;
        }

        .logo-dot {
          width: 5px;
          height: 5px;
          background-color: var(--primary-color);
          border-radius: 50%;
          margin-left: 3px;
          margin-top: 10px;
          box-shadow: var(--red-glow-strong);
        }

        /* Desktop Menu */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 15px;
          color: var(--text-secondary);
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--text-main);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
          box-shadow: var(--red-glow);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        /* Dropdown & Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .portal-dropdown-container {
          position: relative;
        }

        .btn-portal {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
        }

        .dropdown-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 99;
          background: transparent;
        }

        .portal-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 280px;
          padding: 16px;
          z-index: 100;
          animation: dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top right;
        }

        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dropdown-header {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .dropdown-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 4px;
          transition: background-color 0.2s ease;
        }

        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .dropdown-item:hover .item-icon {
          transform: scale(1.1);
        }

        .item-icon {
          font-size: 18px;
          transition: transform 0.2s ease;
        }

        .item-text {
          display: flex;
          flex-direction: column;
        }

        .item-text strong {
          color: var(--text-main);
          font-size: 14px;
          font-family: var(--font-heading);
        }

        .item-text span {
          color: var(--text-secondary);
          font-size: 11px;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 12px 0;
        }

        /* Mobile Hamburger Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-menu-btn span {
          width: 100%;
          height: 2px;
          background-color: var(--text-main);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu-btn.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .mobile-menu-btn.open span:nth-child(2) {
          opacity: 0;
        }
        .mobile-menu-btn.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Menu Panel */
        .mobile-menu {
          position: fixed;
          top: 80px;
          right: 24px;
          width: 320px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          display: none;
          z-index: 999;
          padding: 24px;
          border-radius: 20px;
        }

        .mobile-menu.open {
          display: block;
          animation: dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-link {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 600;
          color: var(--text-secondary);
          display: block;
          padding: 8px 0;
        }

        .mobile-link:hover, .mobile-link.active {
          color: var(--primary-color);
          padding-left: 8px;
        }

        .mobile-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 8px 0;
        }

        .mobile-portal-section .section-title {
          font-size: 12px;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .mobile-portal-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .w-full {
          width: 100%;
        }

        /* Media Queries */
        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }

          .portal-dropdown-container {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
}
