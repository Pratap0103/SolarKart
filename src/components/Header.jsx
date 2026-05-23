import React from 'react';
import { Sun, Bell, LogOut, Menu } from 'lucide-react';

export default function Header({ currentUser, profile, unreadNotifCount, onOpenNotifications, onLogout, onToggleSidebar }) {
  if (!currentUser) return null;

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-container">
          <button
            className="mobile-menu-trigger"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu size={22} />
          </button>
          <div className="brand-logo">
            <Sun size={20} />
          </div>
          <span className="brand-name">SolarKart</span>
          {currentUser.role === 'admin' && (
            <span className="badge badge-warning" style={{ fontSize: '9px', marginLeft: '6px' }}>Admin Mode</span>
          )}
        </div>
        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={onOpenNotifications}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotifCount > 0 && <span className="badge-dot" />}
          </button>
          <button className="icon-btn" onClick={onLogout} title="Log Out">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Customer Info Card inside header */}
      <div className="customer-mini-card">
        <div className="customer-info-left">
          <h3>{currentUser.role === 'admin' ? 'SolarKart Admin' : profile.customerName}</h3>
          <p>CID: {currentUser.customerId} • {profile.location}</p>
        </div>
        <div className="customer-info-right">
          <span className="plant-capacity-badge">{profile.plantCapacity}</span>
          <div style={{ fontSize: '10px', color: '#38BDF8', marginTop: '4px', fontWeight: 'bold' }}>
            ● System Active
          </div>
        </div>
      </div>
    </header>
  );
}
