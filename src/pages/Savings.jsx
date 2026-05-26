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
      {/* Overview Stat Widgets - 4 items in one row guaranteed for mobile */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col justify-center items-center text-center hover:border-blue-500 transition-colors">
          <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight mb-1">Net Inv.</span>
          <span className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">{initialSavings.netInvestment}</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col justify-center items-center text-center hover:border-blue-500 transition-colors">
          <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight mb-1">Total Saved</span>
          <span className="text-[11px] sm:text-sm font-bold text-blue-600 leading-tight">{initialSavings.totalMoneySaved}</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col justify-center items-center text-center hover:border-blue-500 transition-colors">
          <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight mb-1">ROI</span>
          <span className="text-[11px] sm:text-sm font-bold text-emerald-600 leading-tight">48.5%</span>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-2 flex flex-col justify-center items-center text-center hover:border-blue-500 transition-colors">
          <span className="text-[9px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight mb-1">Payback</span>
          <span className="text-[11px] sm:text-sm font-bold text-slate-900 leading-tight">4.5 Yrs</span>
        </div>
      </div>



      {/* Monthly Financial Log */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Monthly Bill Reduction Records</h3>
        </div>
        <div className="p-0">
          <Table headers={['Month', 'Bill Before Solar', 'Bill After Solar', 'Monthly Savings', 'Cumulative Savings', 'ROI %']}>
            {initialSavings.savingsLog.map((log, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <td className="py-3 px-4 text-sm font-medium text-slate-900">{log.month}</td>
                <td className="py-3 px-4 text-sm text-red-600 font-medium">{log.billBefore}</td>
                <td className="py-3 px-4 text-sm text-emerald-600 font-medium">{log.billAfter}</td>
                <td className="py-3 px-4 text-sm text-blue-600 font-semibold">{log.savings}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-700">{log.cumulativeSavings}</td>
                <td className="py-3 px-4 text-sm text-slate-600">{log.roiPercent}</td>
              </tr>
            ))}
          </Table>
        </div>
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
