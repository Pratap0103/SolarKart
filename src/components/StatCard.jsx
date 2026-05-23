import React from 'react';

export default function StatCard({ label, value, desc, borderLeft = '', onClick, style = {} }) {
  const cardStyle = {
    cursor: onClick ? 'pointer' : 'default',
    borderLeft: borderLeft ? borderLeft : undefined,
    ...style
  };

  return (
    <div className="stat-item" style={cardStyle} onClick={onClick}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {desc && <div className="stat-desc">{desc}</div>}
    </div>
  );
}
