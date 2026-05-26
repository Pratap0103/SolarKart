import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, Layers } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function PlantHealth({ plantHealth, onCreateTicketFromAlert, showToast }) {
  const [selectedComp, setSelectedComp] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = (compName) => {
    const comp = plantHealth.components.find(c => c.component === compName);
    setSelectedComp(comp);
    setShowDetails(true);
  };

  return (
    <div>
      {/* Alert Warning banner if offline/abnormal is detected */}
      {plantHealth.alerts > 0 && (
        <div style={{
          background: 'var(--danger)',
          color: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <ShieldAlert size={20} />
          <div>
            <h4 style={{ fontSize: '13px', margin: '0', fontWeight: 'bold' }}>Active Diagnostic Fault Detected</h4>
            <span style={{ fontSize: '11px', opacity: 0.9 }}>Inverter report fault code 402: AC SPD blow-out. Please schedule support visit.</span>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="stats-row">
        <StatCard label="Inverter Status" value={plantHealth.inverterStatus} desc="Solax Smart Inverter 10 kW" borderLeft="4px solid var(--danger)" />
        <StatCard label="Battery Status" value={plantHealth.batteryStatus} desc="Lithium Ion storage: 15 kWh" />
        <StatCard label="Panel Status" value={plantHealth.panelStatus} desc="Monocrystalline Perc cell arrays" borderLeft="4px solid var(--primary-green)" />
        <StatCard label="Fault Detection" value={`${plantHealth.alerts} Flagged`} desc="Fault logs status" />
        <StatCard label="Efficiency Score" value={plantHealth.overallEfficiency} desc="Net power conversion yield ratio" borderLeft="4px solid var(--primary-green)" />
      </div>

      {/* Components Status Table */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Hardware Diagnostic Panel</h3>
        <Table headers={['Component', 'Status', 'Efficiency %', 'Last Checked', 'Alert', 'Action']}>
          {plantHealth.components.map((comp, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{comp.component}</td>
              <td><Badge type={comp.status}>{comp.status}</Badge></td>
              <td style={{ fontWeight: 'bold' }}>{comp.efficiency}%</td>
              <td style={{ fontSize: '12px' }}>{comp.lastChecked}</td>
              <td style={{ color: comp.alert !== 'None' ? 'var(--danger)' : 'var(--gray-text)', fontWeight: comp.alert !== 'None' ? 'bold' : 'normal' }}>
                {comp.alert}
              </td>
              <td>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button variant="secondary" size="sm" onClick={() => handleViewDetails(comp.component)} style={{ padding: '4px 8px', fontSize: '11px' }}>
                    View
                  </Button>
                  {comp.alert !== 'None' && (
                    <Button variant="danger" size="sm" onClick={() => onCreateTicketFromAlert(comp.component)} style={{ padding: '4px 8px', fontSize: '11px', color: '#fff' }}>
                      Create Ticket
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* COMPONENT DIAGNOSTIC DETAILS MODAL */}
      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Component Diagnostics Log">
        {selectedComp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Component Name</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedComp.component}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value"><Badge type={selectedComp.status}>{selectedComp.status}</Badge></span>
            </div>
            <div className="info-row">
              <span className="info-label">Efficiency</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedComp.efficiency}%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Checked</span>
              <span className="info-value">{selectedComp.lastChecked}</span>
            </div>
            <div className="info-row">
              <span className="info-label">System Alert</span>
              <span className="info-value" style={{ color: 'var(--danger)' }}>{selectedComp.alert}</span>
            </div>

            {/* Diagnostic Details */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '11px',
              color: 'var(--gray-text)',
              marginTop: '6px'
            }}>
              <strong>Diagnostics parameters:</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                <div>• Output Voltage: 232 V</div>
                <div>• Temperature: 42°C (Healthy limits)</div>
                <div>• Connection: Wireless Smart Gateway Active</div>
                <div>• Firmware Version: v2.4.1 (Up to date)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
              {selectedComp.alert !== 'None' && (
                <Button variant="danger" onClick={() => {
                  onCreateTicketFromAlert(selectedComp.component);
                  setShowDetails(false);
                }} style={{ color: '#fff' }}>
                  Create Service Ticket
                </Button>
              )}
              <Button onClick={() => setShowDetails(false)}>Close Window</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
