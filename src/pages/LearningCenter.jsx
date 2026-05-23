import React, { useState } from 'react';
import { Play, BookOpen, ChevronRight } from 'lucide-react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { dummyLearningCards, initialFAQs } from '../dummyData';

export default function LearningCenter() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  return (
    <div>
      <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Solar Knowledge & Video Guides</h3>

      {/* Guide Cards Grid */}
      <div className="learning-grid">
        {dummyLearningCards.map((card, idx) => (
          <div
            key={idx}
            className="learning-card"
            onClick={() => handleOpenDetail(card)}
          >
            <div>
              <span className="badge badge-info" style={{ fontSize: '9px', marginBottom: '8px' }}>
                {card.category}
              </span>
              <h4 style={{ fontSize: '14px', color: 'var(--dark-blue)', marginBottom: '6px' }}>
                {card.title}
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--gray-text)' }}>{card.description}</p>
            </div>
            <span style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', fontSize: '11px', color: 'var(--primary-green)', fontWeight: 'bold', marginTop: '10px' }}>
              View Details <Play size={10} style={{ marginLeft: '4px' }} />
            </span>
          </div>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>Frequently Asked Questions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {initialFAQs.map((faq, idx) => (
            <div
              key={idx}
              style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '10px', cursor: 'pointer' }}
              onClick={() => handleOpenDetail({
                title: faq.title,
                category: faq.category,
                description: faq.description,
                steps: faq.steps,
                tips: faq.tips,
                relatedFaq: faq.relatedFaq
              })}
            >
              <h4 style={{ fontSize: '13px', color: 'var(--dark-blue)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{faq.title}</span>
                <ChevronRight size={14} style={{ color: 'var(--gray-text)' }} />
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--gray-text)' }}>{faq.description.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>

      {/* LEARNING DETAIL MODAL */}
      <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Knowledge Hub Guide">
        {selectedItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <span className="badge badge-info" style={{ width: 'fit-content' }}>
              {selectedItem.category}
            </span>
            <h3 style={{ fontSize: '18px', color: 'var(--dark-blue)' }}>{selectedItem.title}</h3>
            
            <p style={{ color: 'var(--gray-text)' }}>{selectedItem.description}</p>

            {/* Video Thumbnail mockup */}
            <div style={{
              background: '#0F172A',
              aspectRatio: '16/9',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#F8FAFC',
              cursor: 'pointer',
              margin: '8px 0',
              border: '1px solid #334155'
            }}>
              <Play size={40} style={{ color: 'var(--primary-green)', marginBottom: '6px' }} />
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Mock Video Stream - Watch Guide</span>
            </div>

            {selectedItem.steps && selectedItem.steps.length > 0 && (
              <div>
                <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>Recommended Steps</h4>
                <ol style={{ paddingLeft: '20px', margin: '0' }}>
                  {selectedItem.steps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {selectedItem.tips && selectedItem.tips.length > 0 && (
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '12px', borderRadius: '8px', marginTop: '6px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>💡 Pro Tips</h4>
                <ul style={{ paddingLeft: '20px', margin: '0', fontSize: '11px' }}>
                  {selectedItem.tips.map((tip, idx) => (
                    <li key={idx} style={{ marginBottom: '2px' }}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.relatedFaq && (
              <div style={{ fontSize: '11px', color: 'var(--gray-text)', marginTop: '8px' }}>
                <strong>Related Topic:</strong> {selectedItem.relatedFaq}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <Button onClick={() => setShowDetail(false)}>Close Guide</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
