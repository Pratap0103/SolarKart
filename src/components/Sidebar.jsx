import React from 'react';
import {
  Sun,
  Activity,
  TrendingUp,
  Wrench,
  FileText,
  Play,
  Bell,
  Award,
  MessageSquare,
  CloudRain,
  Cpu,
  Shield,
  User,
  Lock,
  X,
  BatteryCharging
} from 'lucide-react';

export default function Sidebar({ activePage, onPageChange, role, unreadNotifCount, isOpen, onClose }) {
  const pages = [
    { id: 'dashboard', label: 'Dashboard', icon: Sun },
    { id: 'usage', label: 'Power Usage', icon: BatteryCharging },
    { id: 'analytics', label: 'Energy Analytics', icon: Activity },
    { id: 'savings', label: 'Savings & ROI', icon: TrendingUp },
    { id: 'services', label: 'Service & Complaint', icon: Wrench },
    { id: 'documents', label: 'Document Center', icon: FileText },
    { id: 'care_panel', label: 'Solar Care Panel', icon: Play },
    { id: 'notifications', label: 'Notifications', icon: Bell, badgeCount: unreadNotifCount },
    { id: 'referrals', label: 'Referral System', icon: Award },
    { id: 'ai_assistant', label: 'AI Solar Assistant', icon: MessageSquare },
    { id: 'weather', label: 'Weather Info', icon: CloudRain },
    { id: 'plant_health', label: 'Plant Health', icon: Cpu },
    { id: 'amc', label: 'AMC Management', icon: Shield },
    { id: 'profile', label: 'Profile Spec', icon: User }
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
