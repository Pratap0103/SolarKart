import React, { useState } from 'react';
import { Award, Copy, Share2, MessageCircle, Info } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import StatCard from '../components/StatCard';

export default function ReferralSystem({ referrals, onRegisterReferral, showToast }) {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // New lead form state
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    city: '',
    plantInterest: '5 kW On-Grid'
  });

  const handleOpenDetail = (lead) => {
    setSelectedLead(lead);
    setShowDetail(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referrals.referralCode || 'SOLARKART500');
    showToast('Referral code copied to clipboard!');
  };

  const handleWhatsAppInvite = () => {
    const text = encodeURIComponent(`Hey! I recently installed SolarKart solar panels and saved ₹7,300 this month. Use my code ${referrals.referralCode || 'SOLARKART500'} to get a special discount! Join clean energy today!`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareLink = () => {
    showToast('Referral invite link copied to clipboard!');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.city) {
      showToast('Please fill out all fields.', 'error');
      return;
    }
    onRegisterReferral(form);
    setForm({
      name: '',
      mobile: '',
      city: '',
      plantInterest: '5 kW On-Grid'
    });
  };

  return (
    <div>
      {/* Referral KPI metrics */}
      <div className="stats-row">
        <div className="stat-item" style={{ borderLeft: '4px solid var(--primary-green)' }}>
          <div className="stat-label">Referral Code</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px', letterSpacing: '1px', color: 'var(--primary-green)' }}>
              {referrals.referralCode || 'SOLARKART500'}
            </span>
            <button className="icon-btn" onClick={handleCopyCode} title="Copy Code" style={{ padding: '4px' }}>
              <Copy size={16} />
            </button>
          </div>
          <div className="stat-desc">Share with neighbors & friends</div>
        </div>
        <StatCard label="Total Referrals" value={referrals.totalReferrals} desc="All submitted leads" />
        <StatCard label="Pending Rewards" value={referrals.pendingRewards} desc="Awaiting plant conversions" />
        <StatCard label="Earned Rewards" value={referrals.earnedRewards} desc="Direct bank cashback paid out" borderLeft="4px solid var(--primary-green)" />
      </div>

      {/* Share / Invite Panel */}
      <div className="card" style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button variant="outline" onClick={handleCopyCode} style={{ flex: 1, minWidth: '140px', background: 'var(--white)' }}>
          <Copy size={14} style={{ marginRight: '6px' }} /> Copy Code
        </Button>
        <Button variant="secondary" onClick={handleWhatsAppInvite} style={{ flex: 1, minWidth: '140px', color: '#FFFFFF', background: '#25D366' }}>
          <MessageCircle size={14} style={{ marginRight: '6px' }} /> WhatsApp Invite
        </Button>
        <Button variant="primary" onClick={handleShareLink} style={{ flex: 1, minWidth: '140px' }}>
          <Share2 size={14} style={{ marginRight: '6px' }} /> Share Link
        </Button>
      </div>

      {/* New Lead Form Registration */}
      <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>Register New Referral Lead</h3>
        <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'end' }}>
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Friend's Name"
            required
          />
          <Input
            label="Mobile"
            type="tel"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            placeholder="Mobile Number"
            maxLength={10}
            required
          />
          <Input
            label="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="e.g. Pune"
            required
          />
          <Select
            label="Plant Interest"
            value={form.plantInterest}
            onChange={(e) => setForm({ ...form, plantInterest: e.target.value })}
            options={['3 kW Off-Grid', '5 kW On-Grid', '10 kW Hybrid', '15 kW Commercial']}
          />
          <Button variant="primary" type="submit" style={{ height: '42px', marginTop: '8px' }}>
            Register Referral
          </Button>
        </form>
      </div>

      {/* Leads Table */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Referrals Conversion Pipeline</h3>
        <Table headers={['Referral ID', 'Name', 'Mobile', 'City', 'Plant Interest', 'Status', 'Reward Amount', 'Reward Status', 'Date', 'Action']}>
          {referrals.leads.map((lead) => (
            <tr key={lead.referralId}>
              <td style={{ fontWeight: 'bold' }}>{lead.referralId}</td>
              <td style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{lead.name}</td>
              <td>{lead.mobile}</td>
              <td>{lead.city}</td>
              <td>{lead.plantInterest}</td>
              <td><Badge type={lead.status}>{lead.status}</Badge></td>
              <td style={{ fontWeight: 'bold' }}>{lead.rewardAmount}</td>
              <td><Badge type={lead.rewardStatus}>{lead.rewardStatus}</Badge></td>
              <td style={{ fontSize: '12px' }}>{lead.date}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleOpenDetail(lead)}
                  style={{ padding: '4px 6px' }}
                  title="Lead Details"
                >
                  <Info size={12} />
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* REFERRAL DETAILS MODAL */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Referral Lead Details Card">
        {selectedLead && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Referral ID</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedLead.referralId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Lead Name</span>
              <span className="info-value">{selectedLead.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Mobile</span>
              <span className="info-value">{selectedLead.mobile}</span>
            </div>
            <div className="info-row">
              <span className="info-label">City / Region</span>
              <span className="info-value">{selectedLead.city}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Capacity Interest</span>
              <span className="info-value">{selectedLead.plantInterest}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Lead Status</span>
              <span className="info-value"><Badge type={selectedLead.status}>{selectedLead.status}</Badge></span>
            </div>
            <div className="info-row">
              <span className="info-label">Reward Amount</span>
              <span className="info-value" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>{selectedLead.rewardAmount}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Reward Payout Status</span>
              <span className="info-value"><Badge type={selectedLead.rewardStatus}>{selectedLead.rewardStatus}</Badge></span>
            </div>
            <div className="info-row">
              <span className="info-label">Date Submitted</span>
              <span className="info-value">{selectedLead.date}</span>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '11px',
              color: 'var(--gray-text)',
              marginTop: '6px'
            }}>
              <strong>Payout Rule:</strong> Rewards are cleared and paid directly to your bank account within 7 working days once the lead completes site verification and pays their system advance.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button onClick={() => setShowDetail(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
