import React, { useState } from 'react';
import { Sun, User, Lock } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login({ onLogin, showToast }) {
  const [mobile, setMobile] = useState('');
  const [custId, setCustId] = useState('');

  const handleLoginSubmit = (role) => {
    if (!mobile) {
      showToast('Please enter mobile number.', 'error');
      return;
    }
    onLogin(role, mobile, custId);
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Sun size={28} />
          </div>
          <h2>SolarKart</h2>
          <p style={{ color: '#94a3b8' }}>Clean Energy Customer Portal</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="e.g. 9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength={10}
            required
          />
          <Input
            label="Customer ID (Optional)"
            type="text"
            placeholder="e.g. SK-90821"
            value={custId}
            onChange={(e) => setCustId(e.target.value)}
          />

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              type="button"
              variant="primary"
              onClick={() => handleLoginSubmit('customer')}
            >
              <User size={18} style={{ marginRight: '8px' }} /> Login as Customer
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleLoginSubmit('admin')}
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}
            >
              <Lock size={18} style={{ marginRight: '8px' }} /> Login as Admin Demo
            </Button>
          </div>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#64748b' }}>
            For demo login: Use any mobile number & press either login button.
          </p>
        </div>
      </div>
    </div>
  );
}
