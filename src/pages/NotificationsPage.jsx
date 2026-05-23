import React, { useState } from 'react';
import { Eye, Check, Trash2, Bell } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function NotificationsPage({ notifications, onMarkRead, onDelete }) {
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleOpenDetail = (notif) => {
    setSelectedNotif(notif);
    setShowDetail(true);
    if (notif.status === 'Unread') {
      onMarkRead(notif.notificationId);
    }
  };

  return (
    <div>
      {/* Notifications Table */}
      <div className="card" style={{ padding: '10px 0' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Security & Maintenance Alerts</h3>
        <Table headers={['Notification ID', 'Type', 'Message', 'Date', 'Status', 'Action']}>
          {notifications.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: 'var(--gray-text)' }}>
                No active notifications in inbox. Clear slate!
              </td>
            </tr>
          ) : (
            notifications.map((n) => (
              <tr key={n.notificationId} style={{ backgroundColor: n.status === 'Unread' ? 'rgba(56, 189, 248, 0.05)' : undefined }}>
                <td style={{ fontWeight: 'bold' }}>{n.notificationId}</td>
                <td>
                  <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                    {n.type}
                  </span>
                </td>
                <td style={{ fontWeight: n.status === 'Unread' ? 'bold' : 'normal' }}>
                  {n.message}
                </td>
                <td style={{ fontSize: '12px' }}>{n.date}</td>
                <td><Badge type={n.status}>{n.status}</Badge></td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleOpenDetail(n)}
                      style={{ padding: '4px 6px' }}
                      title="View Details"
                    >
                      <Eye size={12} />
                    </button>
                    {n.status === 'Unread' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onMarkRead(n.notificationId)}
                        style={{ padding: '4px 6px' }}
                        title="Mark as Read"
                      >
                        <Check size={12} style={{ color: 'var(--success)' }} />
                      </button>
                    )}
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onDelete(n.notificationId)}
                      style={{ padding: '4px 6px' }}
                      title="Delete Alert"
                    >
                      <Trash2 size={12} style={{ color: 'var(--danger)' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </Table>
      </div>

      {/* NOTIFICATION DETAILS MODAL */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="System Alert Details">
        {selectedNotif && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Notification ID</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedNotif.notificationId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Type</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedNotif.type}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date & Time</span>
              <span className="info-value">{selectedNotif.date}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value"><Badge type={selectedNotif.status}>{selectedNotif.status}</Badge></span>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '10px',
              lineHeight: '1.5'
            }}>
              <strong>Message Details:</strong>
              <p style={{ marginTop: '6px', color: 'var(--text-dark)' }}>{selectedNotif.message}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button variant="danger" onClick={() => {
                onDelete(selectedNotif.notificationId);
                setShowDetail(false);
              }}>
                Delete Notification
              </Button>
              <Button onClick={() => setShowDetail(false)}>Dismiss</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
