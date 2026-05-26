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
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', marginBottom: '16px', overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <StatCard label="Net Inv." value={initialSavings.netInvestment} style={{ padding: '6px 4px' }} className="micro-stat" />
        </div>
        <div style={{ flex: 1 }}>
          <StatCard label="Total Saved" value={initialSavings.totalMoneySaved} borderLeft="2px solid var(--primary-green)" style={{ padding: '6px 4px' }} className="micro-stat" />
        </div>
        <div style={{ flex: 1 }}>
          <StatCard label="ROI" value="48.5%" style={{ padding: '6px 4px' }} className="micro-stat" />
        </div>
        <div style={{ flex: 1 }}>
          <StatCard label="Payback" value="4.5 Yrs" style={{ padding: '6px 4px' }} className="micro-stat" />
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
