import React from 'react';

export default function Table({ headers = [], children, style = {} }) {
  return (
    <div className="table-container" style={{ border: 'none', margin: '0', ...style }}>
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}
