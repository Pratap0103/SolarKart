import React, { useState } from 'react';
import { User, Lock, CheckCircle2, ArrowRight, Sun, Zap, Sliders } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login({ onLogin, showToast }) {
  const [mobile, setMobile] = useState('9876543210');
  const [custId, setCustId] = useState('SK-90821');
  const [selectedRole, setSelectedRole] = useState('customer'); // 'customer' or 'admin'

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!mobile) {
      showToast('Please enter your mobile number.', 'error');
      return;
    }
    onLogin(selectedRole, mobile, custId);
  };

  return (
    <div className="login-screen">
      <div className="login-card" style={{ maxWidth: '640px', width: '95%', padding: '36px 30px' }}>
        
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <Sun size={28} style={{ color: 'var(--white)' }} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--dark-blue)' }}>SolarKart</h2>
          <p style={{ color: 'var(--gray-text)', fontSize: '13px', marginTop: '4px' }}>
            Choose a workspace portal to explore live solar optimizations.
          </p>
        </div>

        {/* Transparency Workspace Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* Customer Workspace Card */}
          <div 
            onClick={() => {
              setSelectedRole('customer');
              setCustId('SK-90821');
            }}
            style={{
              border: `2px solid ${selectedRole === 'customer' ? 'var(--primary-green)' : '#E2E8F0'}`,
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              background: selectedRole === 'customer' ? 'rgba(0, 82, 255, 0.02)' : 'var(--white)',
              transition: 'var(--transition)',
              boxShadow: selectedRole === 'customer' ? '0 10px 25px rgba(0, 82, 255, 0.06)' : 'none',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {selectedRole === 'customer' && (
              <span style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--primary-green)' }}>
                <CheckCircle2 size={18} fill="rgba(0, 82, 255, 0.1)" />
              </span>
            )}
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: selectedRole === 'customer' ? 'var(--primary-green)' : '#F1F5F9',
                color: selectedRole === 'customer' ? 'var(--white)' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                transition: 'var(--transition)'
              }}>
                <User size={20} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '6px' }}>
                Customer Workspace
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--gray-text)', lineHeight: '1.4', marginBottom: '12px' }}>
                Monitor active power production and execute self-cleaning diagnostics.
              </p>
              
              <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0', fontSize: '10px', color: 'var(--gray-text)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--primary-green)' }} /> Live Solar Ring Gauge
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--primary-green)' }} /> Dust Loss Calculator
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--primary-green)' }} /> Care Video Playlists
                </li>
              </ul>
            </div>
          </div>

          {/* Admin Workspace Card */}
          <div 
            onClick={() => {
              setSelectedRole('admin');
              setCustId('ADMIN-SYS');
            }}
            style={{
              border: `2px solid ${selectedRole === 'admin' ? 'var(--primary-green)' : '#E2E8F0'}`,
              borderRadius: '16px',
              padding: '20px',
              cursor: 'pointer',
              background: selectedRole === 'admin' ? 'rgba(0, 82, 255, 0.02)' : 'var(--white)',
              transition: 'var(--transition)',
              boxShadow: selectedRole === 'admin' ? '0 10px 25px rgba(0, 82, 255, 0.06)' : 'none',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {selectedRole === 'admin' && (
              <span style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--primary-green)' }}>
                <CheckCircle2 size={18} fill="rgba(0, 82, 255, 0.1)" />
              </span>
            )}
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: selectedRole === 'admin' ? 'var(--primary-green)' : '#F1F5F9',
                color: selectedRole === 'admin' ? 'var(--white)' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                transition: 'var(--transition)'
              }}>
                <Sliders size={20} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '6px' }}>
                Admin Control Desk
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--gray-text)', lineHeight: '1.4', marginBottom: '12px' }}>
                Dispatch field technicians, manage client request queues, and audits.
              </p>

              <ul style={{ paddingLeft: '0', listStyle: 'none', margin: '0', fontSize: '10px', color: 'var(--gray-text)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--sky-blue)' }} /> Ticket Dispatch Desk
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--sky-blue)' }} /> Engineer Task Assignments
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={10} style={{ color: 'var(--sky-blue)' }} /> Referral Rewards Auditing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <Input
              label="Enter Mobile (Demo)"
              type="tel"
              placeholder="e.g. 9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              required
            />
            <Input
              label={selectedRole === 'customer' ? "Customer ID (Optional)" : "Admin Auth Code"}
              type="text"
              placeholder={selectedRole === 'customer' ? "e.g. SK-90821" : "e.g. ADMIN-SYS"}
              value={custId}
              onChange={(e) => setCustId(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            style={{ width: '100%', height: '46px', fontSize: '14px', borderRadius: '12px' }}
          >
            Launch {selectedRole === 'customer' ? 'Customer' : 'Admin'} Workspace <ArrowRight size={16} style={{ marginLeft: '4px' }} />
          </Button>
        </form>

        {/* Clickable Quick Demo Logins */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '11px', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '8px', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            ⚡ Click to Auto-Fill & Test Demo Accounts:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginBottom: '16px' }}>
            
            <div 
              onClick={() => {
                setSelectedRole('customer');
                setMobile('9876543210');
                setCustId('SK-90821');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontSize: '11px',
                background: mobile === '9876543210' && selectedRole === 'customer' ? 'rgba(16, 185, 129, 0.05)' : 'var(--white)',
                borderColor: mobile === '9876543210' && selectedRole === 'customer' ? 'var(--primary-green)' : '#E2E8F0',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <strong style={{ color: 'var(--dark-blue)' }}>Aarav Sharma</strong> (Gurgaon)
                <div style={{ color: 'var(--gray-text)', fontSize: '10px' }}>ID: SK-90821 | Mob: 9876543210</div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--primary-green)' }}>Select</span>
            </div>

            <div 
              onClick={() => {
                setSelectedRole('customer');
                setMobile('9812345678');
                setCustId('SK-87214');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontSize: '11px',
                background: mobile === '9812345678' && selectedRole === 'customer' ? 'rgba(16, 185, 129, 0.05)' : 'var(--white)',
                borderColor: mobile === '9812345678' && selectedRole === 'customer' ? 'var(--primary-green)' : '#E2E8F0',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <strong style={{ color: 'var(--dark-blue)' }}>Rajesh Kumar</strong> (Pune)
                <div style={{ color: 'var(--gray-text)', fontSize: '10px' }}>ID: SK-87214 | Mob: 9812345678</div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--primary-green)' }}>Select</span>
            </div>

            <div 
              onClick={() => {
                setSelectedRole('customer');
                setMobile('9555123456');
                setCustId('SK-61023');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontSize: '11px',
                background: mobile === '9555123456' && selectedRole === 'customer' ? 'rgba(16, 185, 129, 0.05)' : 'var(--white)',
                borderColor: mobile === '9555123456' && selectedRole === 'customer' ? 'var(--primary-green)' : '#E2E8F0',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <strong style={{ color: 'var(--dark-blue)' }}>Aditi Rao</strong> (Bangalore)
                <div style={{ color: 'var(--gray-text)', fontSize: '10px' }}>ID: SK-61023 | Mob: 9555123456</div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--primary-green)' }}>Select</span>
            </div>

            <div 
              onClick={() => {
                setSelectedRole('admin');
                setMobile('9999999999');
                setCustId('ADMIN-SYS');
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontSize: '11px',
                background: selectedRole === 'admin' ? 'rgba(0, 82, 255, 0.03)' : 'var(--white)',
                borderColor: selectedRole === 'admin' ? 'var(--sky-blue)' : '#E2E8F0',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <strong style={{ color: 'var(--dark-blue)' }}>SolarKart Admin</strong> (Control Desk)
                <div style={{ color: 'var(--gray-text)', fontSize: '10px' }}>Code: ADMIN-SYS | Mob: 9999999999</div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--sky-blue)' }}>Select</span>
            </div>

          </div>
        </div>

        <div style={{ marginTop: '22px', textAlign: 'center', borderTop: '1px dashed #E2E8F0', paddingTop: '16px' }}>
          <p style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
            <strong>💡 Demo Transparency Notice:</strong> Both workspaces interact with the same local simulation data. Raising a ticket or booking a wash as a customer lets you immediately switch, log in as Admin, and assign technicians live!
          </p>
        </div>
      </div>
    </div>
  );
}
