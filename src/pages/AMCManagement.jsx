import React, { useState } from 'react';
import { Shield, FileCheck, CreditCard } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

export default function AMCManagement({ amc, profile, onRenewAmc, showToast }) {
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [form, setForm] = useState({
    newPlan: 'SolarKart Care Platinum',
    duration: '1 Year',
    amount: '₹4,999',
    paymentMode: 'UPI / NetBanking',
    remark: ''
  });

  const planAmountMap = {
    'SolarKart Care Platinum': '₹4,999',
    'SolarKart Gold Guard': '₹3,499',
    'SolarKart Standard Care': '₹1,999'
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setForm({
      ...form,
      newPlan: plan,
      amount: planAmountMap[plan] || '₹1,999'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRenewAmc(form);
    setShowRenewModal(false);
  };

  return (
    <div>
      {/* AMC Status Cards */}
      <div className="stats-grid">
        <StatCard label="AMC Status" value={amc.status} desc={`Expiry Date: ${amc.expiryDate}`} borderLeft="4px solid var(--primary-green)" />
        <StatCard label="Plan Name" value={amc.planName} desc="Standard plant coverage" />
      </div>

      <div className="stats-grid">
        <StatCard label="Remaining Days" value={`${amc.remainingDays} Days`} desc="Days until plan expires" />
        <StatCard label="Services Remaining" value={`${amc.servicesRemaining} left`} desc="Free cleaning & maintenance visits" borderLeft="4px solid var(--primary-green)" />
      </div>

      <div className="stats-grid">
        <StatCard label="Renewal Amount" value={amc.renewalAmount} desc="Special customer discount applied" />
        <div style={{ flex: 1 }} />
      </div>

      {/* Primary Actions */}
      <div className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ fontSize: '14px', margin: '0', fontWeight: 'bold' }}>Renew or Upgrade Your AMC Plan</h4>
          <span style={{ fontSize: '11px', color: 'var(--gray-text)' }}>Protect your solar panels and inverter against voltage surges and degradation.</span>
        </div>
        <Button variant="primary" onClick={() => setShowRenewModal(true)}>
          Renew AMC Contract
        </Button>
      </div>

      {/* AMC Payment History Table */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>AMC Contract History Ledger</h3>
        <Table headers={['AMC ID', 'Plan Name', 'Start Date', 'End Date', 'Amount', 'Services Included', 'Services Used', 'Status', 'Action']}>
          {amc.history.map((hist) => (
            <tr key={hist.amcId}>
              <td style={{ fontWeight: 'bold' }}>{hist.amcId}</td>
              <td style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{hist.planName}</td>
              <td style={{ fontSize: '12px' }}>{hist.startDate}</td>
              <td style={{ fontSize: '12px' }}>{hist.endDate}</td>
              <td style={{ fontWeight: 'bold' }}>{hist.amount}</td>
              <td>{hist.servicesIncluded}</td>
              <td>{hist.servicesUsed}</td>
              <td><Badge type={hist.status}>{hist.status}</Badge></td>
              <td>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast(`AMC Service Certificate PDF generated for contract ${hist.amcId}`)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', padding: '4px 8px' }}
                >
                  <FileCheck size={10} /> Agreement
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* RENEW AMC POPUP MODAL */}
      <Modal isOpen={showRenewModal} onClose={() => setShowRenewModal(false)} title="Renew SolarKart AMC Cover">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Customer Name"
            value={profile.customerName}
            readOnly
          />
          <Input
            label="Current Active Plan"
            value={amc.planName}
            readOnly
          />
          <Select
            label="Select Renewal Plan"
            value={form.newPlan}
            onChange={handlePlanChange}
            options={['SolarKart Care Platinum', 'SolarKart Gold Guard', 'SolarKart Standard Care']}
          />
          <Select
            label="Coverage Duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            options={['1 Year', '2 Years', '3 Years']}
          />
          <Input
            label="Total Amount"
            value={form.amount}
            readOnly
          />
          <Select
            label="Payment Mode"
            value={form.paymentMode}
            onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}
            options={['UPI / NetBanking', 'Credit / Debit Card', 'Cash on Delivery (Site Visit)', 'EMI Plan']}
          />
          <Textarea
            label="Remarks (Optional)"
            value={form.remark}
            onChange={(e) => setForm({ ...form, remark: e.target.value })}
            placeholder="Preferred visiting dates/intervals..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => setShowRenewModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CreditCard size={14} /> Pay & Renew Now
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
