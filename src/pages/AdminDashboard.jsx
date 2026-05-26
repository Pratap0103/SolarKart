import React, { useState } from 'react';
import { User, ShieldAlert, CheckCircle, Award, Settings, Layers, Lock, Cpu, Eye, UserPlus, RefreshCw, Clipboard, CheckSquare } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { initialEngineers } from '../dummyData';

export default function AdminDashboard({
  tickets,
  historyTickets,
  referrals,
  onAssignEngineer,
  onUpdateStatus,
  onAddVisit,
  onCloseTicket,
  showToast,
  customers
}) {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [modals, setModals] = useState({
    viewCustomer: false,
    assignEngineer: false,
    updateStatus: false,
    addVisit: false,
    closeTicket: false
  });

  const toggleModal = (modalName, isOpen) => {
    setModals((prev) => ({ ...prev, [modalName]: isOpen }));
  };

  const openModalWithId = (modalName, ticketId) => {
    setSelectedTicketId(ticketId);
    toggleModal(modalName, true);
  };

  const selectedTicket = tickets.find(t => t.ticketId === selectedTicketId) || 
                         historyTickets.find(t => t.ticketId === selectedTicketId);

  const selectedTicketCustomer = selectedTicket ? (customers?.find(c => c.customerId === selectedTicket.customerId) || {
    profile: {
      customerName: selectedTicket.customerName || "Aarav Sharma",
      mobileNumber: selectedTicket.customerMobile || "+91 98765 43210",
      plantCapacity: "5.4 kWp",
      plantType: "On-Grid Rooftop",
      address: "Flat 402, Green Meadows, Sector 15, Gurgaon",
      inverterBrand: "SolarKart Hybrid Smart Inverter 6kVA",
      panelBrand: "SolarKart Mono-Perc Half Cut 540W",
      installationDate: "March 15, 2024"
    }
  }) : null;

  // Form states
  const [assignForm, setAssignForm] = useState({
    engineerName: initialEngineers[0].name,
    visitDate: '',
    visitTime: '10:00 AM - 01:00 PM',
    adminNote: ''
  });

  const [statusForm, setStatusForm] = useState({
    newStatus: 'In Progress',
    note: ''
  });

  const [visitForm, setVisitForm] = useState({
    visitDate: '',
    workDone: '',
    partsUsed: '',
    engineerComment: '',
    customerComment: ''
  });

  const [closeForm, setCloseForm] = useState({
    resolutionSummary: '',
    rating: 5,
    feedback: ''
  });

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    onAssignEngineer(selectedTicketId, assignForm);
    toggleModal('assignEngineer', false);
  };

  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(selectedTicketId, statusForm.newStatus, statusForm.note);
    toggleModal('updateStatus', false);
  };

  const handleAddVisitSubmit = (e) => {
    e.preventDefault();
    onAddVisit(selectedTicketId, visitForm);
    toggleModal('addVisit', false);
  };

  const handleCloseSubmit = (e) => {
    e.preventDefault();
    onCloseTicket(selectedTicketId, closeForm.rating, closeForm.feedback, closeForm.resolutionSummary);
    toggleModal('closeTicket', false);
  };

  return (
    <div>
      {/* KPI Cards Grid */}
      <div className="stats-row">
        <StatCard label="Total Customers" value={`${customers?.length || 1} Users`} desc="Active solar plants registered" />
        <StatCard label="Total Active Plants" value={customers ? `${customers.reduce((acc, curr) => acc + parseFloat(curr.profile.plantCapacity), 0).toFixed(1)} kW` : "18.6 kW"} desc="Cumulative monitored capacity" />
        <StatCard label="Today's Generation" value="28.4 MWh" desc="Total grid feed-in yield" borderLeft="4px solid var(--primary-green)" />
        <StatCard label="Open Complaints" value={`${tickets.length} Pending`} desc="Tickets awaiting closure" borderLeft={`4px solid ${tickets.length > 0 ? 'var(--danger)' : 'var(--primary-green)'}`} />
        <StatCard label="AMC Due" value="1 Renewals" desc="Contracts expiring within 30 days" />
        <StatCard label="Low Performing Systems" value="2 Plants" desc="Generating under 60% capacity alert" borderLeft="4px solid var(--warning)" />
        <StatCard label="Referral Performance" value="12 Converted" desc={`Leads converted: ${referrals.leads.filter(l => l.status === 'Converted').length}`} />
        <StatCard label="Revenue" value="₹4.82 Lakhs" desc="This month's AMC & service bills" borderLeft="4px solid var(--primary-green)" />
      </div>

      {/* Admin complaint table */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Global Customer Complaint Queue</h3>
        <Table headers={['Ticket ID', 'Customer Name', 'Mobile', 'Plant Capacity', 'Complaint Title', 'Priority', 'Status', 'Engineer', 'Created Date', 'Action']}>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center', padding: '20px', color: 'var(--gray-text)' }}>
                No active complaints. Excellent operational score!
              </td>
            </tr>
          ) : (
            tickets.map((t) => {
              const cust = customers?.find(c => c.customerId === t.customerId) || {
                profile: {
                  customerName: t.customerName || "Aarav Sharma",
                  mobileNumber: t.customerMobile || "+91 98765 43210",
                  plantCapacity: "5.4 kWp"
                }
              };
              return (
                <tr key={t.ticketId}>
                  <td style={{ fontWeight: 'bold' }}>{t.ticketId}</td>
                  <td style={{ fontWeight: 'bold' }}>{cust.profile.customerName}</td>
                  <td>{cust.profile.mobileNumber}</td>
                  <td>{cust.profile.plantCapacity}</td>
                  <td>
                    <div style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{t.title}</div>
                    <div style={{ fontSize: '9px', color: 'var(--gray-text)' }}>Category: {t.category}</div>
                  </td>
                  <td><Badge type={t.priority}>{t.priority}</Badge></td>
                  <td><Badge type={t.status}>{t.status}</Badge></td>
                  <td>{t.assignedEngineer || <span style={{ color: 'var(--gray-text)' }}>Unassigned</span>}</td>
                  <td style={{ fontSize: '11px' }}>{t.createdDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openModalWithId('viewCustomer', t.ticketId)}
                        title="View Customer Info"
                        style={{ padding: '4px 6px' }}
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openModalWithId('assignEngineer', t.ticketId)}
                        title="Assign Engineer"
                        style={{ padding: '4px 6px' }}
                      >
                        <UserPlus size={12} />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openModalWithId('updateStatus', t.ticketId)}
                        title="Update Status"
                        style={{ padding: '4px 6px' }}
                      >
                        <RefreshCw size={12} />
                      </button>
                      {t.status === 'Assigned' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => openModalWithId('addVisit', t.ticketId)}
                          title="Add Visit Report"
                          style={{ padding: '4px 6px' }}
                        >
                          <Clipboard size={12} />
                        </button>
                      )}
                      {t.status === 'Resolved' && (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => openModalWithId('closeTicket', t.ticketId)}
                          title="Close Ticket"
                          style={{ padding: '4px 6px', color: '#fff' }}
                        >
                          <CheckSquare size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </Table>
      </div>

      {/* Global historical completed logs */}
      <div className="card" style={{ padding: '10px 0', marginTop: '20px' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Archived Global Service Log</h3>
        <Table headers={['Ticket ID', 'Customer Name', 'Complaint Subject', 'Category', 'Priority', 'Assigned Engineer', 'Closed Date', 'Rating']}>
          {historyTickets.map((t) => {
            const cust = customers?.find(c => c.customerId === t.customerId) || {
              profile: { customerName: t.customerName || "Aarav Sharma" }
            };
            return (
              <tr key={t.ticketId}>
                <td style={{ fontWeight: 'bold' }}>{t.ticketId}</td>
                <td>{cust.profile.customerName}</td>
                <td>{t.title}</td>
                <td>{t.category}</td>
                <td><Badge type={t.priority}>{t.priority}</Badge></td>
                <td>{t.assignedEngineer || 'Staff'}</td>
                <td style={{ fontSize: '12px' }}>{t.closedDate}</td>
                <td>
                  <div style={{ display: 'flex', color: '#F59E0B' }}>
                    {[...Array(t.customerRating)].map((_, i) => (
                      <Award key={i} size={12} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      </div>

      {/* MODAL 1: VIEW CUSTOMER INFORMATION */}
      <Modal isOpen={modals.viewCustomer} onClose={() => toggleModal('viewCustomer', false)} title="Customer Installation Info">
        {selectedTicketCustomer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Customer Name</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicketCustomer?.profile?.customerName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Mobile Number</span>
              <span className="info-value">{selectedTicketCustomer?.profile?.mobileNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Installed Capacity</span>
              <span className="info-value" style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>{selectedTicketCustomer?.profile?.plantCapacity} {selectedTicketCustomer?.profile?.plantType}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Address</span>
              <span className="info-value">{selectedTicketCustomer?.profile?.address}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Inverter Brand</span>
              <span className="info-value">{selectedTicketCustomer?.profile?.inverterBrand}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Panel Brand</span>
              <span className="info-value">{selectedTicketCustomer?.profile?.panelBrand}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Installation Date</span>
              <span className="info-value">{selectedTicketCustomer?.profile?.installationDate}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button onClick={() => toggleModal('viewCustomer', false)}>Close Window</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL 2: ASSIGN ENGINEER */}
      <Modal isOpen={modals.assignEngineer} onClose={() => toggleModal('assignEngineer', false)} title="Assign Service Engineer">
        <form onSubmit={handleAssignSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="info-row">
            <span className="info-label">Ticket ID</span>
            <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicketId}</span>
          </div>
          <Select
            label="Engineer Name"
            value={assignForm.engineerName}
            onChange={(e) => setAssignForm({ ...assignForm, engineerName: e.target.value })}
            options={initialEngineers.map(eng => eng.name)}
          />
          <Input
            label="Visit Date"
            type="date"
            value={assignForm.visitDate}
            onChange={(e) => setAssignForm({ ...assignForm, visitDate: e.target.value })}
            required
          />
          <Select
            label="Visit Time Slot"
            value={assignForm.visitTime}
            onChange={(e) => setAssignForm({ ...assignForm, visitTime: e.target.value })}
            options={['10:00 AM - 01:00 PM', '01:00 PM - 04:00 PM', '04:00 PM - 06:00 PM']}
          />
          <Textarea
            label="Admin Note"
            value={assignForm.adminNote}
            onChange={(e) => setAssignForm({ ...assignForm, adminNote: e.target.value })}
            placeholder="Special instructions for the technician..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => toggleModal('assignEngineer', false)}>Cancel</Button>
            <Button variant="primary" type="submit">Assign Engineer</Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 3: UPDATE STATUS */}
      <Modal isOpen={modals.updateStatus} onClose={() => toggleModal('updateStatus', false)} title="Update Ticket Status">
        <form onSubmit={handleUpdateStatusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="info-row">
            <span className="info-label">Ticket ID</span>
            <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicketId}</span>
          </div>
          {selectedTicket && (
            <div className="info-row">
              <span className="info-label">Current Status</span>
              <span className="info-value"><Badge type={selectedTicket.status}>{selectedTicket.status}</Badge></span>
            </div>
          )}
          <Select
            label="New Status"
            value={statusForm.newStatus}
            onChange={(e) => setStatusForm({ ...statusForm, newStatus: e.target.value })}
            options={['Open', 'Assigned', 'In Progress', 'Resolved', 'Closed']}
          />
          <Textarea
            label="Update Note"
            value={statusForm.note}
            onChange={(e) => setStatusForm({ ...statusForm, note: e.target.value })}
            placeholder="Why is status changing?..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => toggleModal('updateStatus', false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Status</Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 4: ADD VISIT REPORT */}
      <Modal isOpen={modals.addVisit} onClose={() => toggleModal('addVisit', false)} title="Add Engineer Service Visit Report">
        <form onSubmit={handleAddVisitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="info-row">
            <span className="info-label">Ticket ID</span>
            <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicketId}</span>
          </div>
          <Input
            label="Visit Date"
            type="date"
            value={visitForm.visitDate}
            onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
            required
          />
          <Input
            label="Engineer Name"
            value={selectedTicket?.assignedEngineer || 'Technician'}
            readOnly
          />
          <Textarea
            label="Work Done Summary"
            value={visitForm.workDone}
            onChange={(e) => setVisitForm({ ...visitForm, workDone: e.target.value })}
            placeholder="Detailed description of cleaning, wiring replacement, power testing..."
            required
          />
          <Input
            label="Parts Used (if any)"
            value={visitForm.partsUsed}
            onChange={(e) => setVisitForm({ ...visitForm, partsUsed: e.target.value })}
            placeholder="e.g. 10A string fuse, MC4 connectors, None"
          />
          <Textarea
            label="Engineer Comment"
            value={visitForm.engineerComment}
            onChange={(e) => setVisitForm({ ...visitForm, engineerComment: e.target.value })}
            placeholder="Technician diagnostics and suggestions..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => toggleModal('addVisit', false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Visit & Resolve</Button>
          </div>
        </form>
      </Modal>

      {/* MODAL 5: CLOSE TICKET */}
      <Modal isOpen={modals.closeTicket} onClose={() => toggleModal('closeTicket', false)} title="Close Ticket & Customer Rating">
        <form onSubmit={handleCloseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="info-row">
            <span className="info-label">Ticket ID</span>
            <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicketId}</span>
          </div>
          <Textarea
            label="Resolution Summary"
            value={closeForm.resolutionSummary}
            onChange={(e) => setCloseForm({ ...closeForm, resolutionSummary: e.target.value })}
            placeholder="Explain how the issue was successfully solved..."
            required
          />
          <div className="form-group">
            <label className="form-label">Rate Service Quality (1 - 5 Stars)</label>
            <div style={{ display: 'flex', gap: '8px', margin: '6px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setCloseForm({ ...closeForm, rating: star })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                >
                  <Award
                    size={28}
                    fill={star <= closeForm.rating ? '#F59E0B' : 'none'}
                    color={star <= closeForm.rating ? '#F59E0B' : '#64748B'}
                  />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            label="Customer Feedback Remarks"
            value={closeForm.feedback}
            onChange={(e) => setCloseForm({ ...closeForm, feedback: e.target.value })}
            placeholder="How was your overall technician experience?..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => toggleModal('closeTicket', false)}>Cancel</Button>
            <Button variant="primary" type="submit" style={{ background: 'var(--success)' }}>Archive & Close Ticket</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
