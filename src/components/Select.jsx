import React from 'react';

export default function Select({ label, value, onChange, options = [], required = false, style = {} }) {
  return (
    <div className="form-group" style={style}>
      {label && <label className="form-label">{label} {required && '*'}</label>}
      <select className="form-control" value={value} onChange={onChange} required={required}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
