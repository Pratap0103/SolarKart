import React from 'react';
import { Sun, Activity, TrendingUp, FileText, Bell, Award, MessageSquare, CloudRain, Shield, Lock } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Dashboard({
  profile,
  amc,
  onNavigateTab,
  onNavigateMorePage,
  onTriggerModal,
  currentUser
}) {
  return (
    <div>
      {/* Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard
          label="Today Energy"
          value="22.4 kWh"
          desc="Peak Power: 3.8 kW (12:45 PM)"
          borderLeft="4px solid var(--primary-green)"
        />
        <StatCard
          label="Monthly Energy"
          value="542 kWh"
          desc="Growth: +8% YoY vs prev month"
          borderLeft="4px solid var(--sky-blue)"
        />
      </div>

      <div className="stats-grid">
        <StatCard
          label="Lifetime Generation"
          value="13.2 MWh"
          desc={`Commissioned: ${profile.installationDate} (1.2 years)`}
        />
        <StatCard
          label="Money Saved"
          value="₹1.92 Lakhs"
          desc="Payback: 4.5 Years progress"
          borderLeft="4px solid var(--primary-green)"
        />
      </div>

      {/* Environmental Impact Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Sun size={20} /> Environmental Impact</h3>
          <span className="badge badge-success">Eco Friendly</span>
        </div>
        <div className="stats-grid" style={{ marginBottom: '0' }}>
          <div className="stat-item">
            <div className="stat-label">CO₂ Saved</div>
            <div className="stat-value">10.5 Tons</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Trees Saved Equivalent</div>
            <div className="stat-value">482 Trees</div>
          </div>
        </div>
      </div>

      {/* Plant Health & Maintenance quick summaries */}
      <div className="stats-grid">
        <div className="card" style={{ marginBottom: '0', padding: '16px' }}>
          <h4 style={{ fontSize: '13px', color: 'var(--dark-blue)', marginBottom: '8px' }}>System Health</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Inverter status</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Panel status</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Healthy</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Battery status</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Healthy</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '0', padding: '16px' }}>
          <h4 style={{ fontSize: '13px', color: 'var(--dark-blue)', marginBottom: '8px' }}>Maintenance Status</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Last cleaning</span>
              <span style={{ fontWeight: 'bold' }}>May 20, 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Next cleaning</span>
              <span style={{ color: 'var(--warning)', fontWeight: 'bold' }}>May 28, 2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Next service</span>
              <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>June 10, 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Dashboard Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
        <button
          className="btn btn-primary"
          onClick={() => onTriggerModal('raiseTicket', true)}
          style={{ flex: 1, minWidth: '130px' }}
        >
          Raise Complaint
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigateTab('analytics')}
          style={{ flex: 1, minWidth: '130px' }}
        >
          View Analytics
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onNavigateMorePage('documents')}
          style={{ flex: 1, minWidth: '130px', background: 'var(--white)' }}
        >
          View Documents
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onNavigateMorePage('amc')}
          style={{ flex: 1, minWidth: '130px', background: 'rgba(22, 163, 74, 0.1)', color: 'var(--primary-green)' }}
        >
          Renew AMC
        </button>
      </div>

      {/* Sub-Modules Action Grid */}
      <h3 style={{ fontSize: '16px', margin: '24px 0 12px', textAlign: 'left' }}>Sub-Modules & Diagnostics</h3>
      <div className="quick-actions-grid">
        <div className="quick-action-card" onClick={() => onNavigateMorePage('savings')}>
          <TrendingUp size={24} />
          <span>Savings & ROI</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('documents')}>
          <FileText size={24} />
          <span>Documents</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('notifications')}>
          <Bell size={24} />
          <span>Notifications</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('referrals')}>
          <Award size={24} />
          <span>Referrals</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('ai_assistant')}>
          <MessageSquare size={24} />
          <span>AI Assistant</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('weather')}>
          <CloudRain size={24} />
          <span>Weather Info</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('plant_health')}>
          <Activity size={24} />
          <span>Plant Health</span>
        </div>
        <div className="quick-action-card" onClick={() => onNavigateMorePage('amc')}>
          <Shield size={24} />
          <span>AMC Portal</span>
        </div>
        {currentUser.role === 'admin' && (
          <div className="quick-action-card" onClick={() => onNavigateMorePage('admin_dashboard')} style={{ background: '#F1F5F9', borderColor: '#CBD5E1' }}>
            <Lock size={24} style={{ color: 'var(--dark-blue)' }} />
            <span style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Admin View</span>
          </div>
        )}
      </div>
    </div>
  );
}
