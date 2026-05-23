import React, { useState } from 'react';
import { Eye, Download, Share2, ShieldCheck, FileText } from 'lucide-react';
import Table from '../components/Table';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Button from '../components/Button';

export default function DocumentCenter({ documents, showToast }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  const handleDownload = (docName) => {
    showToast(`Downloading file: ${docName}.pdf`);
  };

  const handleShare = (docName) => {
    showToast(`Shared document link: ${docName}`);
  };

  return (
    <div>
      {/* File Vault Listing */}
      <div className="card" style={{ padding: '10px 0' }}>
        <h3 style={{ fontSize: '15px', padding: '10px 20px 8px' }}>Solar Installation Vault Documents</h3>
        <Table headers={['Document ID', 'Document Name', 'Document Type', 'Upload Date', 'File Size', 'Status', 'Action']}>
          {documents.map((doc) => (
            <tr key={doc.documentId}>
              <td style={{ fontWeight: 'bold' }}>{doc.documentId}</td>
              <td style={{ fontWeight: 'bold', color: 'var(--dark-blue)' }}>{doc.documentName}</td>
              <td>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {doc.documentType}
                </span>
              </td>
              <td style={{ fontSize: '12px' }}>{doc.uploadDate}</td>
              <td style={{ fontSize: '12px' }}>{doc.fileSize}</td>
              <td><Badge type={doc.status}>{doc.status}</Badge></td>
              <td>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handlePreview(doc)}
                    style={{ padding: '4px 6px' }}
                    title="Preview"
                  >
                    <Eye size={12} />
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleDownload(doc.documentName)}
                    style={{ padding: '4px 6px' }}
                    title="Download"
                  >
                    <Download size={12} />
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleShare(doc.documentName)}
                    style={{ padding: '4px 6px' }}
                    title="Share"
                  >
                    <Share2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Secure Document Preview">
        {selectedDoc && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div className="info-row">
              <span className="info-label">Document Name</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{selectedDoc.documentName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Document Type</span>
              <span className="info-value">{selectedDoc.documentType}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Upload Date</span>
              <span className="info-value">{selectedDoc.uploadDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">File Size</span>
              <span className="info-value">{selectedDoc.fileSize}</span>
            </div>

            {/* Mock Preview Content */}
            <div style={{
              background: '#0F172A',
              color: '#F8FAFC',
              borderRadius: '8px',
              padding: '24px 16px',
              fontFamily: 'monospace',
              borderLeft: '4px solid var(--primary-green)',
              margin: '12px 0',
              fontSize: '11px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-green)' }}>SOLARKART ENERGY PVT LTD</span>
                <span style={{ fontSize: '8px' }}>SECURE PDF VAULT</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--primary-green)' }} />
                <span>Verified Cryptographic Signature Match</span>
              </div>
              <p>Reference ID: {selectedDoc.documentId}</p>
              <p>Signee: SolarKart Customer Portal</p>
              <p>Status: {selectedDoc.status}</p>
              <p style={{ color: '#64748B', marginTop: '16px', fontSize: '9px' }}>
                * This document is cryptographically signed and stored in your local SolarKart secure container.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button variant="outline" onClick={() => handleShare(selectedDoc.documentName)}>
                <Share2 size={14} style={{ marginRight: '6px' }} /> Share Link
              </Button>
              <Button variant="primary" onClick={() => handleDownload(selectedDoc.documentName)}>
                <Download size={14} style={{ marginRight: '6px' }} /> Download PDF
              </Button>
              <Button variant="secondary" onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
