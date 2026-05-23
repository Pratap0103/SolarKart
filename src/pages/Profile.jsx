import React, { useState } from 'react';
import { User, Edit, FileText, LogOut, CheckCircle } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

export default function Profile({ profile, onUpdateProfile, onNavigateMorePage, onLogout }) {
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(form);
    setShowEdit(false);
  };

  return (
    <div>
      {/* Profile summary header */}
      <div className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--light-green)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 12px'
        }}>
          <User size={40} style={{ color: 'var(--primary-green)' }} />
        </div>
        <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)' }}>{profile.customerName}</h3>
        <p style={{ fontSize: '12px', color: 'var(--gray-text)', marginTop: '4px' }}>
          Active Solar Customer Since {profile.installationDate}
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
          <Button variant="outline" size="sm" onClick={() => {
            setForm({ ...profile });
            setShowEdit(true);
          }}>
            <Edit size={12} style={{ marginRight: '4px' }} /> Edit Contact Details
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onNavigateMorePage('documents')}>
            <FileText size={12} style={{ marginRight: '4px' }} /> View Documents
          </Button>
          <Button variant="danger" size="sm" onClick={onLogout} style={{ color: '#fff' }}>
            <LogOut size={12} style={{ marginRight: '4px' }} /> Logout
          </Button>
        </div>
      </div>

      {/* Plant Technical Specifications */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Solar Plant Technical Specifications</h3>
        <div className="info-row">
          <span className="info-label">Customer Mobile</span>
          <span className="info-value">{profile.mobile}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Customer Email</span>
          <span className="info-value">{profile.email}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Installation Address</span>
          <span className="info-value">{profile.address}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Solar Plant Capacity</span>
          <span className="info-value" style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>
            {profile.plantCapacity}
          </span>
        </div>
        <div className="info-row">
          <span className="info-label">Plant Connection Type</span>
          <span className="info-value">{profile.plantType}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Monitoring Location</span>
          <span className="info-value">{profile.location}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Authorized Installer</span>
          <span className="info-value">{profile.installer}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Smart Inverter Brand</span>
          <span className="info-value">{profile.inverterBrand}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Solar PV Panel Brand</span>
          <span className="info-value">{profile.panelBrand}</span>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Customer Details">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Customer Name"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            required
          />
          <Input
            label="Mobile Number"
            type="tel"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            maxLength={10}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Textarea
            label="Billing / Installation Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <Input
            label="Location (City)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <Input
            label="Alternate Mobile"
            type="tel"
            value={form.alternateMobile || ''}
            onChange={(e) => setForm({ ...form, alternateMobile: e.target.value })}
            maxLength={10}
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} /> Save Profile Details
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
