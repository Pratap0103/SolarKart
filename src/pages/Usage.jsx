import React from 'react';
import {
  Zap,
  Battery,
  BatteryCharging,
  Home,
  Sun,
  ArrowRightLeft,
  ArrowDown,
  ArrowUp,
  Cpu,
  RefreshCw,
  Car,
  Wind,
  Tv,
  Lightbulb,
  Flame,
  Droplets,
  Calendar
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const IconMap = {
  Car,
  Wind,
  Tv,
  Lightbulb,
  Flame,
  Droplets
};

export default function Usage({ usage, profile }) {
  // If no usage data is loaded, provide fallback defaults
  const data = usage || {
    activeKW: 3.8,
    capacityKW: 6.0,
    batterySoC: 82,
    batteryWatts: 1200,
    homeUsage: 2.1,
    gridExport: 0.5,
    appliances: [
      { name: "EV Smart Charger", consumption: 1200, status: "Active", icon: "Car" },
      { name: "Living Room AC", consumption: 600, status: "Active", icon: "Wind" },
      { name: "Double Door Refrigerator", consumption: 200, status: "Active", icon: "Tv" },
      { name: "Smart Lighting & Fans", consumption: 100, status: "Active", icon: "Lightbulb" }
    ]
  };

  const isBatteryCharging = data.batteryWatts > 0;
  const absBatteryWatts = Math.abs(data.batteryWatts);

  // Circumference of battery ring (r=40) => 2 * PI * r = 251.32
  const strokeDashoffset = 251.32 - (251.32 * data.batterySoC) / 100;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--dark-blue)' }}>Live Power Usage</h2>
          <p style={{ color: 'var(--gray-text)', fontSize: '12px' }}>Real-time solar generation, home loads, battery storage, and net metering.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F1F5F9', padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', color: '#64748B' }}>
          <Calendar size={12} />
          <span>Last updated: Just now</span>
        </div>
      </div>

      {/* Grid: 1. Distribution Flow map & 2. Battery storage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        
        {/* Card 1: Interactive Flow Map */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Cpu size={16} style={{ color: 'var(--primary-green)' }} /> Live Energy Distribution Flow
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--gray-text)', marginBottom: '24px' }}>Visualizing dynamic energy transfers between system nodes.</p>
          </div>

          {/* Diagram Canvas */}
          <div style={{ position: 'relative', height: '180px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto', width: '90%', maxWidth: '420px' }}>
            
            {/* Center Hub */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#EFF6FF',
              border: '2px solid rgba(0, 82, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0, 82, 255, 0.1)',
              zIndex: 10
            }}>
              <Zap size={20} style={{ color: 'var(--sky-blue)', animation: 'pulse 1.5s infinite' }} />
            </div>

            {/* Node 1: SOLAR (Top Left or Left) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 5 }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                border: '2px solid #FBBF24',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sun size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#B45309' }}>Solar: {data.activeKW} kW</span>
            </div>

            {/* Node 2: HOME (Right) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 5 }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                border: '2px solid #10B981',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Home size={20} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: '800', color: '#047857' }}>Home: {data.homeUsage} kW</span>
            </div>

            {/* Node 3: BATTERY (Bottom Center) */}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              zIndex: 5
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#F0FDFA',
                border: `2px solid ${isBatteryCharging ? '#14B8A6' : '#F59E0B'}`,
                color: isBatteryCharging ? '#0D9488' : '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isBatteryCharging ? <BatteryCharging size={18} /> : <Battery size={18} />}
              </div>
              <span style={{ fontSize: '9px', fontWeight: '800' }}>
                Battery ({data.batterySoC}%)
              </span>
            </div>

            {/* Node 4: GRID (Top Center) */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              zIndex: 5
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                border: '2px solid #60A5FA',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ArrowRightLeft size={16} />
              </div>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#1D4ED8' }}>
                {data.gridExport > 0 ? `Export: ${data.gridExport} kW` : `Import: ${Math.abs(data.activeKW + (data.batteryWatts/1000) - data.homeUsage).toFixed(1)} kW`}
              </span>
            </div>

            {/* Flow Connecting Lines (using CSS border/shadow overlays) */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
              {/* Solar to Hub */}
              <line x1="15%" y1="50%" x2="50%" y2="50%" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" />
              {/* Hub to Home */}
              <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
              {/* Hub to Battery */}
              <line x1="50%" y1="50%" x2="50%" y2="85%" stroke={isBatteryCharging ? '#14B8A6' : '#F59E0B'} strokeWidth="2" strokeDasharray="4 4" />
              {/* Hub to Grid */}
              <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

          </div>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: 'var(--gray-text)', borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FBBF24', display: 'inline-block' }}></span>
              Solar Input
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
              Appliance Load
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14B8A6', display: 'inline-block' }}></span>
              Battery Flow
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60A5FA', display: 'inline-block' }}></span>
              Grid interaction
            </span>
          </div>
        </div>

        {/* Card 2: Premium Battery Monitor */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '340px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BatteryCharging size={16} style={{ color: 'var(--primary-green)' }} /> Battery Storage Diagnostics
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--gray-text)' }}>Monitoring backup reserve, charge/discharge rates, and SOH.</p>
          </div>

          {/* Battery Circle Ring */}
          <div className="gauge-wrapper" style={{ margin: '14px auto' }}>
            <svg className="gauge-svg" viewBox="0 0 100 100" style={{ width: '130px', height: '130px' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={data.batterySoC > 20 ? 'var(--primary-green)' : 'var(--danger)'}
                strokeWidth="8"
                strokeDasharray="251.32"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              />
            </svg>
            <div className="gauge-readout" style={{ top: '55%' }}>
              <span className="gauge-value" style={{ fontSize: '24px' }}>{data.batterySoC}%</span>
              <span className="gauge-unit" style={{ fontSize: '8px', letterSpacing: '0.05em' }}>State of Charge</span>
            </div>
          </div>

          {/* Battery Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderRight: '1px solid #F1F5F9', paddingRight: '10px' }}>
              <span style={{ color: 'var(--gray-text)' }}>Power Transfer:</span>
              <span style={{ fontWeight: 'bold', color: isBatteryCharging ? 'var(--primary-green)' : '#D97706' }}>
                {isBatteryCharging ? `+${(absBatteryWatts / 1000).toFixed(2)} kW` : `-${(absBatteryWatts / 1000).toFixed(2)} kW`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '4px' }}>
              <span style={{ color: 'var(--gray-text)' }}>Battery Temp:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>28.4°C</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderRight: '1px solid #F1F5F9', paddingRight: '10px' }}>
              <span style={{ color: 'var(--gray-text)' }}>Battery Health:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>98.2% (SOH)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '4px' }}>
              <span style={{ color: 'var(--gray-text)' }}>Voltage / Cell:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>52.8 V</span>
            </div>
          </div>
        </div>

      </div>

      {/* Appliance load list */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '4px' }}>
          Active Appliance Loads Breakdown
        </h3>
        <p style={{ fontSize: '11px', color: 'var(--gray-text)', marginBottom: '16px' }}>
          Real-time measurement of home appliances powered by Solar + Battery bank.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.appliances.map((app, idx) => {
            const AppIcon = IconMap[app.icon] || Cpu;
            // Calculate a color scale
            const percent = Math.min(100, Math.round((app.consumption / 3000) * 100));
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: idx < data.appliances.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: idx < data.appliances.length - 1 ? '12px' : '0' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 82, 255, 0.05)',
                  color: 'var(--primary-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AppIcon size={18} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: 'var(--dark-blue)', marginBottom: '4px' }}>
                    <span>{app.name}</span>
                    <span style={{ color: app.consumption > 1000 ? 'var(--warning)' : 'var(--primary-green)' }}>{app.consumption} Watts</span>
                  </div>
                  <ProgressBar
                    value={app.consumption}
                    max={2500}
                    style={{ margin: 0 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Status & Net Metering Recap */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Net Metering Card */}
        <div className="card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowRightLeft size={14} style={{ color: 'var(--primary-green)' }} /> Net Meter Status
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-text)' }}>Today's Total Export:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>14.8 kWh</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-text)' }}>Today's Total Import:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>2.1 kWh</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #E2E8F0', paddingTop: '8px', marginTop: '4px' }}>
              <span style={{ color: 'var(--dark-blue)', fontWeight: 'bold' }}>Net Credits Added:</span>
              <span style={{ fontWeight: '900', color: 'var(--primary-green)' }}>+12.7 kWh (Credits)</span>
            </div>
          </div>
        </div>

        {/* Inverter Connection Details */}
        <div className="card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Cpu size={14} style={{ color: 'var(--primary-green)' }} /> Smart Inverter Sync
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-text)' }}>Inverter Status:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>ONLINE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-text)' }}>Grid Frequency:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>50.02 Hz</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-text)' }}>Plant Capacity Ref:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{profile?.plantCapacity || '5.4 kWp'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
