import React from 'react';
import { Layers } from 'lucide-react';

export default function EmptyState({ message = 'No data available', subMessage, style = {} }) {
  return (
    <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--gray-text)', ...style }}>
      <Layers size={36} style={{ color: '#94A3B8', marginBottom: '10px' }} />
      <div style={{ fontWeight: '500', fontSize: '14px' }}>{message}</div>
      {subMessage && <div style={{ fontSize: '11px', marginTop: '4px' }}>{subMessage}</div>}
    </div>
  );
}
