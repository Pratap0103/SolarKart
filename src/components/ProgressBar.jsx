import React from 'react';

export default function ProgressBar({ value, max = 100, label, desc, style = {} }) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div style={{ margin: '8px 0', ...style }}>
      {(label || desc) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: '500' }}>
          <span>{label}</span>
          <span style={{ color: 'var(--primary-green)' }}>{desc || `${percentage}%`}</span>
        </div>
      )}
      <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--primary-green)',
            borderRadius: '4px',
            transition: 'width 0.4s ease'
          }}
        />
      </div>
    </div>
  );
}
