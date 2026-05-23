import React from 'react';

export default function Badge({ children, type = 'neutral', style = {} }) {
  let badgeClass = 'badge-neutral';
  if (type === 'success' || type === 'Healthy' || type === 'Active' || type === 'Closed' || type === 'Converted' || type === 'Paid' || type === 'Verified' || type === 'Completed' || type === 'Signed') badgeClass = 'badge-success';
  else if (type === 'warning' || type === 'Warning' || type === 'Open' || type === 'Assigned' || type === 'In Progress' || type === 'Renewal Due' || type === 'Pending' || type === 'Site Visit' || type === 'Contacted' || type === 'Lead Created') badgeClass = 'badge-warning';
  else if (type === 'danger' || type === 'Critical' || type === 'Emergency' || type === 'High' || type === 'Offline' || type === 'Abnormal' || type === 'Rejected' || type === 'Expired') badgeClass = 'badge-danger';
  else if (type === 'info' || type === 'Medium' || type === 'Resolved' || type === 'Low') badgeClass = 'badge-info';

  return (
    <span className={`badge ${badgeClass}`} style={style}>
      {children}
    </span>
  );
}
