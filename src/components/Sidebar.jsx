import React from 'react';
import {
  Sun,
  Zap,
  Leaf,
  PlugZap,
  FileText,
  Droplets,
  Bell,
  SunMedium,
  Sparkles,
  CloudSun,
  Activity,
  ShieldCheck,
  User,
  Lock,
  X
} from 'lucide-react';

export default function Sidebar({ activePage, onPageChange, role, unreadNotifCount, isOpen, onClose }) {
  const pages = [
    { id: 'dashboard', label: 'Dashboard', icon: Sun },
    { id: 'analytics', label: 'My Solar History', icon: Zap },
    { id: 'savings', label: 'My Money Saved', icon: Leaf },
    { id: 'services', label: 'Get Help / Repair', icon: PlugZap },
    { id: 'documents', label: 'Document Center', icon: FileText },
    { id: 'care_panel', label: 'Maintenance Tips', icon: Droplets },
    { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadNotifCount },
    { id: 'referrals', label: 'Invite Friends & Earn', icon: SunMedium },
    { id: 'ai_assistant', label: 'AI Solar Assistant', icon: Sparkles },
    { id: 'weather', label: 'Weather Info', icon: CloudSun },
    { id: 'plant_health', label: 'System Health Check', icon: Activity },
    { id: 'amc', label: 'Service Plan (AMC)', icon: ShieldCheck },
    { id: 'profile', label: 'My Profile', icon: User }
  ];

  return (
    <>
      {/* Mobile backdrop overlay to close side nav when clicking outside */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <Sun size={24} style={{ color: 'var(--primary-green)' }} />
          <h2>SolarKart</h2>
          <button className="mobile-sidebar-close" onClick={onClose} aria-label="Close Navigation Menu">
            <X size={20} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onPageChange(page.id);
                  if (onClose) onClose();
                }}
              >
                <Icon size={18} />
                <span>{page.label}</span>
                {page.badgeCount > 0 && (
                  <span className="badge badge-danger" style={{ marginLeft: 'auto', padding: '2px 6px', fontSize: '9px' }}>
                    {page.badgeCount}
                  </span>
                )}
              </button>
            );
          })}

          {role === 'admin' && (
            <>
              <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', margin: '15px 0' }} />
              <button
                className={`sidebar-nav-item ${activePage === 'admin_dashboard' ? 'active' : ''}`}
                onClick={() => {
                  onPageChange('admin_dashboard');
                  if (onClose) onClose();
                }}
                style={{ color: 'var(--warning)' }}
              >
                <Lock size={18} />
                <span>Admin Dashboard</span>
              </button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

