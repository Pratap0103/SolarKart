import React from 'react';

export default function Textarea({ label, value, onChange, placeholder, required = false, rows = 3, style = {} }) {
  return (
    <div className="form-group" style={style}>
      {label && <label className="form-label">{label} {required && '*'}</label>}
      <textarea
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{ resize: 'vertical' }}
      />
    </div>
  );
}
