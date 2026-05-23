import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import Table from '../components/Table';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { initialSavings } from '../dummyData';

export default function Savings() {
  const [showRoiDetail, setShowRoiDetail] = useState(false);

  return (
    <div>
      {/* Overview Stat Widgets */}
      <div className="stats-grid">
        <StatCard label="System Cost" value={initialSavings.systemCost} desc="10 kW On-Grid installation" />
        <StatCard label="Subsidy Received" value={initialSavings.subsidyReceived} desc="MNRE central subsidy" />
      </div>

      <div className="stats-grid">
        <StatCard label="Net Investment" value={initialSavings.netInvestment} desc="System cost less subsidy" />
        <StatCard label="Total Saved" value={initialSavings.totalMoneySaved} desc="Lifetime power savings" borderLeft="4px solid var(--primary-green)" />
      </div>

      <div className="stats-grid">
        <StatCard label="ROI %" value="48.5%" desc="Net returns ratio" />
        <StatCard label="Payback Period" value={initialSavings.paybackPeriod} desc="Total recovery timeline" />
      </div>

      {/* Payback Progress Bar */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>Payback Milestone Progress</h3>
        <ProgressBar
          value={92160}
          max={190000}
          label="Capital Recovery Progress"
          desc="₹92,160 / ₹1,90,000 (48.5%)"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--gray-text)', marginTop: '8px' }}>
          <span>Commissioned: Mar 2024</span>
          <span>Est. Complete: Oct 2028</span>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Button variant="secondary" onClick={() => setShowRoiDetail(true)}>
            View Deep ROI Details
          </Button>
        </div>
      </div>

      {/* Monthly Financial Log */}
      <div className="card" style={{ marginTop: '20px', padding: '10px 0' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Monthly Bill Reduction Records</h3>
        <Table headers={['Month', 'Bill Before Solar', 'Bill After Solar', 'Monthly Savings', 'Cumulative Savings', 'ROI %']}>
          {initialSavings.savingsLog.map((log, index) => (
            <tr key={index}>
              <td style={{ fontWeight: 'bold' }}>{log.month}</td>
              <td style={{ color: 'var(--danger)' }}>{log.billBefore}</td>
              <td style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>{log.billAfter}</td>
              <td style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>{log.savings}</td>
              <td style={{ fontWeight: 'bold' }}>{log.cumulativeSavings}</td>
              <td>{log.roiPercent}</td>
            </tr>
          ))}
        </Table>
      </div>

      {/* ROI Detailed Popup Modal */}
      <Modal isOpen={showRoiDetail} onClose={() => setShowRoiDetail(false)} title="Detailed ROI Performance Card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
          <div className="info-row">
            <span className="info-label">System Cost</span>
            <span className="info-value">{initialSavings.systemCost}</span>
          </div>
          <div className="info-row">
            <span className="info-label">MNRE Subsidy Credit</span>
            <span className="info-value" style={{ color: 'var(--primary-green)' }}>- {initialSavings.subsidyReceived}</span>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
          <div className="info-row">
            <span className="info-label" style={{ fontWeight: 'bold' }}>Net Capital Investment</span>
            <span className="info-value" style={{ fontWeight: 'bold' }}>{initialSavings.netInvestment}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Average Monthly Savings</span>
            <span className="info-value">₹7,200 / Month</span>
          </div>
          <div className="info-row">
            <span className="info-label">Total Recovered Amount</span>
            <span className="info-value" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>{initialSavings.totalMoneySaved}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Remaining Recovery Balance</span>
            <span className="info-value" style={{ color: 'var(--warning)', fontWeight: 'bold' }}>₹97,840</span>
          </div>
          <div className="info-row">
            <span className="info-label">Estimated Payback Period</span>
            <span className="info-value">{initialSavings.paybackPeriod}</span>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setShowRoiDetail(false)}>Close Window</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
