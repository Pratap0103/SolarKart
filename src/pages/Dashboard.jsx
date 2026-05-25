import React from 'react';
import { 
  Sun, 
  Activity, 
  TrendingUp, 
  FileText, 
  Bell, 
  Award, 
  MessageSquare, 
  CloudRain, 
  Shield, 
  Lock,
  Zap,
  BatteryCharging,
  Info,
  ChevronRight
} from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Dashboard({
  profile,
  amc,
  onNavigateTab,
  onNavigateMorePage,
  onTriggerModal,
  currentUser,
  lastCleanedDate,
  nextCleanedDate
}) {
  // Peak Active Generation is 3.8 kW out of 6.0 kWp capacity
  const activeKW = 3.8;
  const capacityKW = 6.0;
  const percentFill = (activeKW / capacityKW) * 100;
  
  // Circumference of ring = 2 * PI * r (r = 90) => ~565.48
  const strokeDashoffset = 565.48 - (565.48 * percentFill) / 100;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      
      {/* Central Solar Power Ring Gauge - Ola Electric Style */}
      <div className="ola-gauge-card">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--gray-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Live Generation Desk
          </span>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', animation: 'fadeIn 1s infinite alternate' }}></span>
            Grid Synced
          </span>
        </div>

        <div className="gauge-wrapper">
          <svg className="gauge-svg" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-green)" />
                <stop offset="100%" stopColor="var(--sky-blue)" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle className="gauge-bg-ring" cx="100" cy="100" r="90" />
            {/* Animated Active Fill */}
            <circle 
              className="gauge-fill-ring" 
              cx="100" 
              cy="100" 
              r="90" 
              style={{ strokeDashoffset }}
            />
          </svg>
          
          <div className="gauge-readout">
            <Zap size={22} style={{ color: 'var(--sky-blue)', marginBottom: '2px' }} />
            <span className="gauge-value">{activeKW}</span>
            <span className="gauge-unit">Active kW</span>
            <span className="gauge-status-badge">☀️ Peak Prod</span>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--gray-text)', fontWeight: '600' }}>
          System Capacity: {profile.plantCapacity} ({profile.plantType})
        </div>

        {/* Quick Grid inside Central Widget */}
        <div className="gauge-stats-row">
          <div className="gauge-stat-box" style={{ borderRight: '1px solid rgba(0, 82, 255, 0.08)' }}>
            <span className="gauge-stat-lbl">Today KWh</span>
            <span className="gauge-stat-val">22.4 kWh</span>
          </div>
          <div className="gauge-stat-box">
            <span className="gauge-stat-lbl">Money Saved</span>
            <span className="gauge-stat-val">₹1.92 Lakhs</span>
          </div>
        </div>
      </div>

      {/* Grid: Health & Maintenance */}
      <div className="stats-grid">
        {/* System Diagnostics */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BatteryCharging size={16} style={{ color: 'var(--primary-green)' }} /> Inverter & Storage Health
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Smart Inverter</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (96.5%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Solar Panels (10x)</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (98.2%)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Battery storage</span>
                <span style={{ color: 'var(--success)', fontWeight: '800' }}>Healthy (95.0%)</span>
              </div>
            </div>
          </div>
          <span 
            onClick={() => onNavigateMorePage('plant_health')}
            style={{ fontSize: '11px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '14px', cursor: 'pointer' }}
          >
            System Diagnostics <ChevronRight size={12} />
          </span>
        </div>

        {/* Maintenance Scheduler Summary */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} style={{ color: 'var(--primary-green)' }} /> Maintenance Status
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Last Panel Cleaning</span>
                <span style={{ fontWeight: '800', color: 'var(--dark-blue)' }}>{lastCleanedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Next Cleaning Due</span>
                <span style={{ color: 'var(--warning)', fontWeight: '800' }}>{nextCleanedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--gray-text)', fontWeight: '500' }}>Next Technical Service</span>
                <span style={{ color: 'var(--primary-green)', fontWeight: '800' }}>June 10, 2026</span>
              </div>
            </div>
          </div>
          <span 
            onClick={() => onNavigateMorePage('care_panel')}
            style={{ fontSize: '11px', color: 'var(--primary-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '14px', cursor: 'pointer' }}
          >
            Solar Care Panel <ChevronRight size={12} />
          </span>
        </div>
      </div>

      {/* Environmental Impact Card */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <h3 className="card-title"><Sun size={18} style={{ color: 'var(--primary-green)' }} /> Environmental Contribution</h3>
          <span className="badge badge-success" style={{ background: '#ECFDF5', color: '#10B981', border: '1px solid #D1FAE5' }}>Eco Friendly</span>
        </div>
        <div className="stats-grid" style={{ marginBottom: '0' }}>
          <div className="stat-item" style={{ background: '#F8FAFC' }}>
            <div className="stat-label">CO₂ Offsets</div>
            <div className="stat-value" style={{ color: 'var(--primary-green)' }}>10.5 Tons</div>
          </div>
          <div className="stat-item" style={{ background: '#F8FAFC' }}>
            <div className="stat-label">Trees Saved Equivalent</div>
            <div className="stat-value" style={{ color: 'var(--primary-green)' }}>482 Trees</div>
          </div>
        </div>
      </div>

      {/* Main Core Dashboard Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
        <button
          className="btn btn-primary"
          onClick={() => onTriggerModal('raiseTicket', true)}
          style={{ flex: 1.2, minWidth: '150px' }}
        >
          Raise Service Request
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onNavigateTab('analytics')}
          style={{ flex: 1, minWidth: '130px', background: '#FFFFFF' }}
        >
          View Analytics
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onNavigateMorePage('care_panel')}
          style={{ flex: 1, minWidth: '130px', background: '#FFFFFF' }}
        >
          Care Hub Guides
        </button>
      </div>

      {/* Sub-Modules & Diagnostics Action Grid */}
      <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '28px 0 14px', textAlign: 'left', color: 'var(--dark-blue)' }}>
        Sub-Modules & Diagnostics
      </h3>
      <div className="quick-actions-grid">
        <div className="quick-action-card" onClick={() => onNavigateMorePage('savings')}>
          <TrendingUp size={20} />
          <span>Savings & ROI</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('documents')}>
          <FileText size={20} />
          <span>Documents</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('notifications')}>
          <Bell size={20} />
          <span>Notifications</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('referrals')}>
          <Award size={20} />
          <span>Referrals</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('ai_assistant')}>
          <MessageSquare size={20} />
          <span>AI Assistant</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('weather')}>
          <CloudRain size={20} />
          <span>Weather Info</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('plant_health')}>
          <Activity size={20} />
          <span>Plant Health</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('care_panel')}>
          <Zap size={20} />
          <span>Care Hub</span>
        </div>
        {currentUser.role === 'admin' && (
          <div className="quick-action-card" onClick={() => onNavigateMorePage('admin_dashboard')} style={{ background: '#EFF6FF', borderColor: 'rgba(0,82,255,0.15)' }}>
            <Lock size={20} style={{ color: 'var(--primary-green)' }} />
            <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Admin Desk</span>
          </div>
        )}
      </div>
    </div>
  );
}
