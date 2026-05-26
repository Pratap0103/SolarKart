import React, { useState } from 'react';
import { 
  Sun, 
  Moon,
  Zap,
  Leaf,
  PlugZap,
  FileText,
  Bell,
  SunMedium,
  Sparkles,
  CloudSun,
  ShieldCheck,
  Lock,
  BatteryCharging,
  Info,
  ChevronRight,
  ArrowRight,
  Share2,
  Activity
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Usage from './Usage';

export default function Dashboard({
  profile,
  amc,
  onNavigateTab,
  onNavigateMorePage,
  onTriggerModal,
  currentUser,
  usage,
  lastCleanedDate,
  nextCleanedDate
}) {
  const [isSleepMode, setIsSleepMode] = useState(false);

  // Peak Active Generation is 3.8 kW out of 6.0 kWp capacity
  const activeKW = isSleepMode ? 0.0 : 3.8;
  const capacityKW = 6.0;
  const percentFill = (activeKW / capacityKW) * 100;
  
  // Circumference of ring = 2 * PI * r (r = 90) => ~565.48
  const strokeDashoffset = 565.48 - (565.48 * percentFill) / 100;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      
      {/* Central Solar Power Ring Gauge - Ola Electric Style */}
      <div className="ola-gauge-card">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--gray-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Power Being Made Right Now
            </span>
            <button 
              onClick={() => setIsSleepMode(!isSleepMode)}
              style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '12px', background: isSleepMode ? 'var(--dark-blue)' : '#F1F5F9', color: isSleepMode ? 'var(--white)' : 'var(--gray-text)', border: 'none', cursor: 'pointer' }}
            >
              {isSleepMode ? 'Wake Up' : 'Test Sleep'}
            </button>
          </div>
          <span style={{ fontSize: '11px', color: isSleepMode ? 'var(--gray-text)' : '#10B981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSleepMode ? 'var(--gray-text)' : '#10B981', display: 'inline-block', animation: isSleepMode ? 'none' : 'fadeIn 1s infinite alternate' }}></span>
            {isSleepMode ? 'Standby Night Mode' : 'Grid Synced'}
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
            {isSleepMode ? <Moon size={22} style={{ color: 'var(--gray-text)', marginBottom: '2px' }} /> : <Zap size={22} style={{ color: 'var(--sky-blue)', marginBottom: '2px' }} />}
            <span className="gauge-value" style={{ color: isSleepMode ? 'var(--gray-text)' : 'var(--dark-blue)' }}>{activeKW.toFixed(1)}</span>
            <span className="gauge-unit">{isSleepMode ? 'Standby kW' : 'Active kW'}</span>
            <span className="gauge-status-badge" style={{ 
              background: isSleepMode ? '#F8FAFC' : '#EFF6FF', 
              color: isSleepMode ? '#64748B' : '#0284C7', 
              borderColor: isSleepMode ? '#E2E8F0' : '#BFDBFE' 
            }}>
              {isSleepMode ? '🌙 Sleep Mode' : '☀️ Peak Prod'}
            </span>
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

      {/* --- INTEGRATED USAGE (MY HOME POWER) OVERVIEW --- */}
      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Usage usage={usage} profile={profile} />
      </div>

      {/* Grid: Health & Maintenance */}
      <div className="stats-row stack-mobile">
        {/* System Diagnostics */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '280px', flex: '1 0 auto' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BatteryCharging size={16} style={{ color: 'var(--primary-green)' }} /> My Equipment Health
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
            Check My Equipment <ChevronRight size={12} />
          </span>
        </div>

        {/* Maintenance Scheduler Summary */}
        <div className="card" style={{ marginBottom: '0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '280px', flex: '1 0 auto' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--primary-green)' }} /> My Service Schedule
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
            Maintenance Tips <ChevronRight size={12} />
          </span>
        </div>
      </div>

      {/* --- MONTH-OVER-MONTH COMPARISON --- */}
      <div className="card" style={{ marginTop: '20px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h3 className="card-title" style={{ color: 'var(--dark-blue)' }}><Activity size={18} style={{ color: 'var(--primary-green)' }} /> Your Monthly Performance</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Power Made</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--gray-text)' }}>This Month</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-green)' }}>572 <span style={{ fontSize: '12px' }}>kWh</span></div>
              </div>
              <div style={{ paddingBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>+15% ⬆️</span>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 498 kWh</div>
          </div>

          <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-text)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '8px' }}>Power Used</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--gray-text)' }}>This Month</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#0EA5E9' }}>412 <span style={{ fontSize: '12px' }}>kWh</span></div>
              </div>
              <div style={{ paddingBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>-5% ⬇️</span>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '8px' }}>Last Month: 435 kWh</div>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#475569', background: '#ECFDF5', padding: '10px', borderRadius: '8px', border: '1px solid #D1FAE5' }}>
          <strong>Great job!</strong> You generated more power this month because of sunnier days, and your home used less power. You have extra power to sell back to the grid!
        </p>
      </div>

      {/* --- HOW YOUR BILL IS REDUCED --- */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h3 className="card-title" style={{ color: 'var(--dark-blue)' }}><FileText size={18} style={{ color: '#0EA5E9' }} /> How Your Bill Is Reduced</h3>
          <span className="badge" style={{ background: '#E0F2FE', color: '#0284C7' }}>Simple Math</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-text)', fontWeight: '600' }}>☀️ Power Sent to Grid (Day)</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-green)' }}>+300 Units</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--gray-text)', fontWeight: '600' }}>🌙 Power Taken from Grid (Night)</span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#EF4444' }}>-150 Units</span>
          </div>
          <div style={{ height: '1px', background: '#CBD5E1', margin: '4px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: 'var(--dark-blue)', fontWeight: '800' }}>Total Billed Units</span>
            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--dark-blue)' }}>0 Units</span>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1, background: '#F8FAFC', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase' }}>LAST MONTH (APR)</div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#64748B', marginTop: '4px' }}>₹1,400</div>
            <div style={{ fontSize: '10px', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '2px' }}>Saved ₹7,800</div>
          </div>
          <div style={{ flex: 1, background: '#F0FDF4', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '10px', color: '#166534', fontWeight: '800', textTransform: 'uppercase' }}>THIS MONTH (MAY)</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--primary-green)', marginTop: '4px' }}>₹1,200</div>
            <div style={{ fontSize: '10px', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '2px' }}>Saved ₹7,300</div>
          </div>
        </div>
      </div>

      {/* --- REVAMPED REWARDS BANNER --- */}
      <div className="card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', border: '1px solid #BAE6FD' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0369A1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SunMedium size={20} fill="#38BDF8" color="#0369A1" /> My Solar Rewards
            </h3>
            <p style={{ fontSize: '12px', color: '#0284C7', marginTop: '4px', maxWidth: '200px' }}>Earn coins by referring friends or hitting generation milestones!</p>
          </div>
          <div style={{ background: '#FFF', padding: '8px 12px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--gray-text)', textTransform: 'uppercase' }}>Balance</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#0284C7' }}>450 🪙</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button 
            onClick={() => onNavigateMorePage('referrals')}
            style={{ flex: 1, padding: '12px', background: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            Redeem Rewards <ChevronRight size={14} />
          </button>
          <button 
            onClick={() => onNavigateMorePage('referrals')}
            style={{ flex: 1, padding: '12px', background: '#FFF', color: '#0284C7', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Earn More
          </button>
        </div>
      </div>

      {/* --- OLA STYLE PERFORMANCE UI SECTION --- */}
      <div className="ola-container">
        <h2 className="ola-title">My Solar Summary</h2>
        <div className="ola-subtitle">Lifetime Statistics • Mar 2024 - May 2026</div>

        <div className="ola-grid">
          {/* TOTAL YIELD CARD (Large) */}
          <div className="ola-card ola-card-large">
            <div>
              <div className="ola-label">TOTAL YIELD <ChevronRight size={14} /></div>
              <div className="ola-value">13,232 kWh</div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 'bold', marginTop: '6px' }}>☀️ Avg. 15 kWh / day</div>
            </div>
            
            <div className="ola-bar-chart">
              {/* Simulate 12 small vertical bars for the chart */}
              {[40, 60, 50, 70, 80, 50, 65, 80, 95, 75, 55, 60, 85, 100, 70, 60].map((val, i) => (
                <div key={i} className="ola-bar-col">
                  <div className="ola-bar" style={{ height: `${val}%` }}></div>
                  <div className="ola-bar-base"></div>
                </div>
              ))}
            </div>
          </div>

          {/* MONEY SAVED CARD */}
          <div className="ola-card">
            <div className="ola-label">MONEY SAVED <ChevronRight size={14} /></div>
            <div className="ola-value">₹62,741</div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 'bold', marginTop: '8px' }}>+₹4,200 this month</div>
          </div>

          {/* CO2 AVOIDED CARD */}
          <div className="ola-card">
            <div className="ola-label">CO2 AVOIDED <ChevronRight size={14} /></div>
            <div className="ola-value">777 kg</div>
            <div style={{ fontSize: '11px', color: '#0EA5E9', fontWeight: 'bold', marginTop: '8px' }}>🌲 482 trees planted</div>
          </div>

          {/* GRID EXPORT CARD */}
          <div className="ola-card">
            <div className="ola-label">GRID EXPORT <ChevronRight size={14} /></div>
            <div className="ola-value">2,776 kWh</div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 'bold', marginTop: '8px' }}>+₹1,250 earned</div>
          </div>

          {/* ACHIEVEMENTS CARD */}
          <div className="ola-card">
            <div className="ola-label">ACHIEVEMENTS <ChevronRight size={14} /></div>
            <div className="ola-achievements">
              <div className="ola-badge-img"><Zap size={16} /></div>
              <div className="ola-badge-img"><Leaf size={16} /></div>
              <div className="ola-badge-img"><SunMedium size={16} /></div>
              <div className="ola-badge-img"><ShieldCheck size={16} /></div>
            </div>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 'bold', marginTop: '12px' }}>⭐ Level 3 Pro - 10k Club</div>
          </div>
        </div>

        {/* RECENT PERFORMANCE SECTION */}
        <div className="ola-recent">
          <div className="ola-recent-header">
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', fontStyle: 'italic', color: '#1e293b', marginBottom: '4px' }}>Daily Generation</h3>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Today vs Yesterday</div>
            </div>
            <div className="ola-share-btn">
              <Share2 size={18} />
            </div>
          </div>

          <div className="ola-recent-detail">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Today Section */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#0EA5E9', marginBottom: '4px', fontStyle: 'italic', textTransform: 'uppercase' }}>TODAY (SO FAR)</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '800', color: '#0EA5E9', lineHeight: '1' }}>18.2</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>kWh</span>
                </div>
              </div>

              {/* Yesterday Section */}
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: '#94a3b8', marginBottom: '4px', fontStyle: 'italic', textTransform: 'uppercase' }}>YESTERDAY TOTAL</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#334155', lineHeight: '1' }}>24.8</span>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#1e293b' }}>kWh</span>
                </div>
              </div>
            </div>

            {/* Simulated Map/Curve Graphic */}
            <div className="ola-map-preview">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Background grid lines */}
                <path d="M 0 25 L 100 25 M 0 50 L 100 50 M 0 75 L 100 75" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
                
                {/* Yesterday's curve path (faded) */}
                <path d="M 10 90 Q 30 10, 50 20 T 90 90" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="4 2" />
                
                {/* Today's curve path (active, stops halfway) */}
                <path d="M 10 90 Q 30 10, 50 20" stroke="#0EA5E9" strokeWidth="3" fill="none" />
                
                {/* Current point marker */}
                <circle cx="50" cy="20" r="4" fill="#ef4444" />
                <circle cx="50" cy="20" r="8" fill="rgba(239,68,68,0.2)" />
              </svg>
            </div>
          </div>

          <div className="ola-bottom-action" onClick={() => onNavigateTab('analytics')}>
            <span>View detailed analytics</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </div>

    </div>
  );
}
