import React, { useState } from 'react';

export default function AdminLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Ungültiger Benutzername oder Passwort. (Tipp: admin / admin123)');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="accent-glow-top"></div>
      
      <div className="glass-card login-card animate-fade-in">
        <div className="login-logo">
          <span className="logo-text">Aliyilmaz</span>
          <span className="logo-sub">GmbH</span>
          <span className="logo-dot"></span>
        </div>
        
        <h2>Admin Backoffice</h2>
        <p className="login-subtitle">Systemverwaltung & Disposition</p>

        {error && <div className="login-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Benutzername</label>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Benutzername eingeben" 
            />
          </div>

          <div className="form-group">
            <label>Passwort</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Passwort eingeben" 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full btn-login">Einloggen</button>
        </form>

        <button className="btn btn-secondary w-full mt-4" onClick={onBack}>
          &larr; Zurück zur Website
        </button>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-color);
          position: relative;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 40px;
          text-align: center;
        }

        .login-logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 28px;
          letter-spacing: -0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .login-card h2 {
          font-size: 24px;
          margin-bottom: 6px;
        }

        .login-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 30px;
        }

        .login-error-msg {
          background-color: rgba(227, 6, 19, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(227, 6, 19, 0.2);
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          margin-bottom: 24px;
          text-align: left;
          line-height: 1.5;
        }

        .login-form {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .login-form .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .login-form label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .login-form input {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-main);
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }

        .login-form input:focus {
          border-color: var(--primary-color);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: var(--red-glow);
        }

        .btn-login {
          margin-top: 10px;
          padding: 14px;
        }
      `}</style>
    </div>
  );
}
