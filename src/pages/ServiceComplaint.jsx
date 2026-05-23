import React, { useState, useEffect } from 'react';
import { Plus, Eye, UserPlus, RefreshCw, Clipboard, CheckSquare, Phone, MessageCircle, Star, FileText } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import Textarea from '../components/Textarea';
import { initialEngineers } from '../dummyData';

export default function ServiceComplaint({
  tickets,
  historyTickets,
  currentUser,
  onRaiseTicket,
  onAssignEngineer,
  onUpdateStatus,
  onAddVisit,
  onCloseTicket,
  showToast
}) {
  const [activeSubTab, setActiveSubTab] = useState('pending'); // pending, history, support
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  
  // Modals state
  const [modals, setModals] = useState({
    raiseTicket: false,
    viewDetails: false,
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

  // Find currently selected ticket
  const selectedTicket = tickets.find(t => t.ticketId === selectedTicketId) || 
                         historyTickets.find(t => t.ticketId === selectedTicketId);

  // --- FORM STATES ---
  const [raiseForm, setRaiseForm] = useState({
    title: '',
    description: '',
    category: 'Panel issue',
    priority: 'Medium',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 01:00 PM',
    customerRemark: ''
  });

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

  // Photo & Video dummy values
  const [dummyPhoto, setDummyPhoto] = useState(null);
  const [dummyVideo, setDummyVideo] = useState(null);

  // Submit Raise Ticket Form
  const handleRaiseSubmit = (e) => {
    e.preventDefault();
    if (!raiseForm.title || !raiseForm.description) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    const ticketId = 'SKT-' + Math.floor(1000 + Math.random() * 9000);
    onRaiseTicket({
      ticketId,
      ...raiseForm,
      dummyPhoto,
      dummyVideo
    });
    // Reset
    setRaiseForm({
      title: '',
      description: '',
      category: 'Panel issue',
      priority: 'Medium',
      preferredDate: '',
      preferredTimeSlot: '10:00 AM - 01:00 PM',
      customerRemark: ''
    });
    setDummyPhoto(null);
    setDummyVideo(null);
    toggleModal('raiseTicket', false);
  };

  // Submit Assign Engineer Form
  const handleAssignSubmit = (e) => {
    e.preventDefault();
    onAssignEngineer(selectedTicketId, assignForm);
    toggleModal('assignEngineer', false);
  };

  // Submit Update Status Form
  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(selectedTicketId, statusForm.newStatus, statusForm.note);
    toggleModal('updateStatus', false);
  };

  // Submit Visit Report Form
  const handleAddVisitSubmit = (e) => {
    e.preventDefault();
    onAddVisit(selectedTicketId, visitForm);
    setVisitForm({
      visitDate: '',
      workDone: '',
      partsUsed: '',
      engineerComment: '',
      customerComment: ''
    });
    toggleModal('addVisit', false);
  };

  // Submit Close Ticket Form
  const handleCloseSubmit = (e) => {
    e.preventDefault();
    onCloseTicket(selectedTicketId, closeForm.rating, closeForm.feedback, closeForm.resolutionSummary);
    setCloseForm({
      resolutionSummary: '',
      rating: 5,
      feedback: ''
    });
    toggleModal('closeTicket', false);
  };

  return (
    <div>
      {/* Upper Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn btn-sm ${activeSubTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('pending')}
          >
            Pending Tickets ({tickets.length})
          </button>
          <button
            className={`btn btn-sm ${activeSubTab === 'history' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('history')}
          >
            Service History ({historyTickets.length})
          </button>
          <button
            className={`btn btn-sm ${activeSubTab === 'support' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveSubTab('support')}
          >
            Contact Support
          </button>
        </div>
        <Button variant="primary" onClick={() => toggleModal('raiseTicket', true)}>
          <Plus size={16} style={{ marginRight: '4px' }} /> Raise Ticket
        </Button>
      </div>

      {/* TABS VIEW SWITCHER */}
      {activeSubTab === 'pending' && (
        <div className="card" style={{ padding: '10px 0' }}>
          <h3 style={{ fontSize: '15px', padding: '10px 20px 4px' }}>Active Pending Tickets</h3>
          <Table headers={['Ticket ID', 'Complaint Title', 'Category', 'Priority', 'Created Date', 'Pref. Visit Date', 'Pref. Time', 'Status', 'Engineer', 'Action']}>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '20px', color: 'var(--gray-text)' }}>
                  No pending complaints active. System is running healthy!
                </td>
              </tr>
            ) : (
              tickets.map((t) => (
                <tr key={t.ticketId}>
                  <td style={{ fontWeight: 'bold' }}>{t.ticketId}</td>
                  <td>
                    <div style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{t.title}</div>
                    <div style={{ fontSize: '9px', color: 'var(--gray-text)' }}>{t.description.substring(0, 40)}...</div>
                  </td>
                  <td>{t.category}</td>
                  <td><Badge type={t.priority}>{t.priority}</Badge></td>
                  <td style={{ fontSize: '11px' }}>{t.createdDate}</td>
                  <td style={{ fontSize: '11px' }}>{t.preferredDate}</td>
                  <td style={{ fontSize: '11px' }}>{t.preferredTimeSlot}</td>
                  <td><Badge type={t.status}>{t.status}</Badge></td>
                  <td>{t.assignedEngineer || <span style={{ color: 'var(--gray-text)' }}>Awaiting</span>}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => openModalWithId('viewDetails', t.ticketId)}
                        title="View Details"
                        style={{ padding: '4px 6px' }}
                      >
                        <Eye size={12} />
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => openModalWithId('assignEngineer', t.ticketId)}
                          title="Assign Engineer"
                          style={{ padding: '4px 6px' }}
                        >
                          <UserPlus size={12} />
                        </button>
                      )}
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
                          title="Close & Rate"
                          style={{ padding: '4px 6px', color: '#fff' }}
                        >
                          <CheckSquare size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </div>
      )}

      {activeSubTab === 'history' && (
        <div className="card" style={{ padding: '10px 0' }}>
          <h3 style={{ fontSize: '15px', padding: '10px 20px 4px' }}>Service complaint History</h3>
          <Table headers={['Ticket ID', 'Complaint Title', 'Category', 'Priority', 'Engineer', 'Created Date', 'Resolved Date', 'Closed Date', 'Final Status', 'Rating', 'Action']}>
            {historyTickets.length === 0 ? (
              <tr>
                <td colSpan={11} style={{ textAlign: 'center', padding: '20px', color: 'var(--gray-text)' }}>
                  No archived logs found.
                </td>
              </tr>
            ) : (
              historyTickets.map((t) => (
                <tr key={t.ticketId}>
                  <td style={{ fontWeight: 'bold' }}>{t.ticketId}</td>
                  <td>{t.title}</td>
                  <td>{t.category}</td>
                  <td><Badge type={t.priority}>{t.priority}</Badge></td>
                  <td>{t.assignedEngineer || 'Staff'}</td>
                  <td style={{ fontSize: '11px' }}>{t.createdDate}</td>
                  <td style={{ fontSize: '11px' }}>{t.resolvedDate || t.preferredDate}</td>
                  <td style={{ fontSize: '11px' }}>{t.closedDate}</td>
                  <td><Badge type={t.status}>{t.status}</Badge></td>
                  <td>
                    <div style={{ display: 'flex', color: '#F59E0B' }}>
                      {[...Array(t.customerRating)].map((_, i) => (
                        <Star key={i} size={12} fill="#F59E0B" style={{ marginRight: '1px' }} />
                      ))}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => showToast(`Technical Service Report PDF generated for ${t.ticketId}`)}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', padding: '4px 8px' }}
                    >
                      <FileText size={10} /> Report PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </div>
      )}

      {activeSubTab === 'support' && (
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Contact SolarKart Support Helpdesk</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={18} style={{ color: 'var(--primary-green)' }} />
              <span>Toll Free helpline: <strong>1800-200-9988</strong> (Working Hours: 9 AM to 6 PM)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageCircle size={18} style={{ color: '#25D366' }} />
              <span>WhatsApp Chat Support: <strong>+91 99887 76655</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL 1: RAISE TICKET FORM */}
      <Modal isOpen={modals.raiseTicket} onClose={() => toggleModal('raiseTicket', false)} title="Raise New Service Ticket">
        <form onSubmit={handleRaiseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input
            label="Complaint Title"
            value={raiseForm.title}
            onChange={(e) => setRaiseForm({ ...raiseForm, title: e.target.value })}
            placeholder="Summarize the issue briefly"
            required
          />
          <Textarea
            label="Detailed Description"
            value={raiseForm.description}
            onChange={(e) => setRaiseForm({ ...raiseForm, description: e.target.value })}
            placeholder="Explain panel generation, fault code on inverter, etc."
            required
          />
          <Select
            label="Issue Category"
            value={raiseForm.category}
            onChange={(e) => setRaiseForm({ ...raiseForm, category: e.target.value })}
            options={['Panel issue', 'Inverter issue', 'Wiring issue', 'Low generation', 'Cleaning request', 'Maintenance request', 'Battery issue', 'Other']}
          />
          <Select
            label="Priority Level"
            value={raiseForm.priority}
            onChange={(e) => setRaiseForm({ ...raiseForm, priority: e.target.value })}
            options={['Low', 'Medium', 'High', 'Emergency']}
          />

          {/* Photo & Video UI mockups */}
          <div className="form-group">
            <label className="form-label">Upload Photo Attachment</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setDummyPhoto(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Upload Video Attachment</label>
            <input
              type="file"
              accept="video/*"
              className="form-control"
              onChange={(e) => setDummyVideo(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)}
            />
          </div>

          <Input
            label="Preferred Visit Date"
            type="date"
            value={raiseForm.preferredDate}
            onChange={(e) => setRaiseForm({ ...raiseForm, preferredDate: e.target.value })}
            required
          />
          <Select
            label="Preferred Time Slot"
            value={raiseForm.preferredTimeSlot}
            onChange={(e) => setRaiseForm({ ...raiseForm, preferredTimeSlot: e.target.value })}
            options={['10:00 AM - 01:00 PM', '01:00 PM - 04:00 PM', '04:00 PM - 06:00 PM']}
          />
          <Textarea
            label="Customer Remark (Optional)"
            value={raiseForm.customerRemark}
            onChange={(e) => setRaiseForm({ ...raiseForm, customerRemark: e.target.value })}
            placeholder="Landmarks, calling instructions, etc."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setRaiseForm({
                  title: '',
                  description: '',
                  category: 'Panel issue',
                  priority: 'Medium',
                  preferredDate: '',
                  preferredTimeSlot: '10:00 AM - 01:00 PM',
                  customerRemark: ''
                });
                toggleModal('raiseTicket', false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">Submit Ticket</Button>
          </div>
        </form>
      </Modal>

      {/* POPUP MODAL 2: VIEW TICKET DETAILS */}
      <Modal isOpen={modals.viewDetails} onClose={() => toggleModal('viewDetails', false)} title="Service Ticket Details">
        {selectedTicket && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Ticket ID</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedTicket.ticketId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Complaint Title</span>
              <span className="info-value">{selectedTicket.title}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Description</span>
              <span className="info-value">{selectedTicket.description}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Category</span>
              <span className="info-value">{selectedTicket.category}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Priority</span>
              <span className="info-value"><Badge type={selectedTicket.priority}>{selectedTicket.priority}</Badge></span>
            </div>
            <div className="info-row">
              <span className="info-label">Created Date</span>
              <span className="info-value">{selectedTicket.createdDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Preferred Date</span>
              <span className="info-value">{selectedTicket.preferredDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Status</span>
              <span className="info-value"><Badge type={selectedTicket.status}>{selectedTicket.status}</Badge></span>
            </div>
            <div className="info-row">
              <span className="info-label">Engineer Assigned</span>
              <span className="info-value">{selectedTicket.assignedEngineer || 'Unassigned'}</span>
            </div>
            {selectedTicket.customerRemark && (
              <div className="info-row">
                <span className="info-label">Customer Remark</span>
                <span className="info-value">{selectedTicket.customerRemark}</span>
              </div>
            )}

            {/* Photo / Video preview mockups */}
            <div style={{ marginTop: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Photo Preview</div>
              {selectedTicket.dummyPhoto || selectedTicket.photoUrl ? (
                <img
                  src={selectedTicket.dummyPhoto || selectedTicket.photoUrl}
                  alt="Attachment Preview"
                  style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : (
                <div style={{ background: '#F1F5F9', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#94A3B8', fontSize: '11px' }}>
                  No photo attached.
                </div>
              )}
            </div>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => toggleModal('viewDetails', false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* POPUP MODAL 3: ASSIGN ENGINEER */}
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

      {/* POPUP MODAL 4: UPDATE STATUS */}
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

      {/* POPUP MODAL 5: ADD VISIT REPORT */}
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

          {/* Photo placeholders for visit reports */}
          <div className="form-group">
            <label className="form-label">Before Work Photo</label>
            <div style={{ background: '#F1F5F9', border: '1px dashed #CBD5E1', padding: '16px', borderRadius: '8px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
              📁 Click to upload Before service image
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">After Work Photo</label>
            <div style={{ background: '#F1F5F9', border: '1px dashed #CBD5E1', padding: '16px', borderRadius: '8px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
              📁 Click to upload After service image
            </div>
          </div>

          <Textarea
            label="Engineer Comment"
            value={visitForm.engineerComment}
            onChange={(e) => setVisitForm({ ...visitForm, engineerComment: e.target.value })}
            placeholder="Technician diagnostics and suggestions..."
          />
          <Textarea
            label="Customer Comment"
            value={visitForm.customerComment}
            onChange={(e) => setVisitForm({ ...visitForm, customerComment: e.target.value })}
            placeholder="Customer remarks on the visit..."
          />

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="outline" type="button" onClick={() => toggleModal('addVisit', false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Visit & Resolve</Button>
          </div>
        </form>
      </Modal>

      {/* POPUP MODAL 6: CLOSE TICKET */}
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
                  <Star
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
