import React from 'react';
import { Sun, Bell, LogOut, Menu } from 'lucide-react';

export default function Header({ currentUser, profile, unreadNotifCount, onOpenNotifications, onLogout, onToggleSidebar }) {
  if (!currentUser) return null;

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <button
            className="mobile-menu-trigger"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Sidebar"
          >
            <Menu size={22} />
          </button>
          
          {/* Brand logo is redundant on desktop as sidebar has it, show only on mobile */}
          <div className="brand-container mobile-only">
            <div className="brand-logo">
              <Sun size={20} />
            </div>
            <span className="brand-name">SolarKart</span>
          </div>

          {/* Inline customer info replacing the bulky card */}
          <div className="customer-inline-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3>{currentUser.role === 'admin' ? 'SolarKart Admin' : profile.customerName}</h3>
              {currentUser.role === 'admin' && (
                <span className="badge badge-warning" style={{ fontSize: '9px' }}>Admin Mode</span>
              )}
            </div>
            <span className="customer-meta">CID: {currentUser.customerId} • {profile.location}</span>
          </div>
        </div>

        <div className="header-right">
          {currentUser.role !== 'admin' && (
            <div className="plant-status-pill">
              <span className="plant-capacity-badge">{profile.plantCapacity}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="status-dot">●</span> System Active
              </span>
            </div>
          )}

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
      </div>
    </header>
  );
}
