import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder, required = false, maxLength, style = {}, readOnly = false }) {
  return (
    <div className="form-group" style={style}>
      {label && <label className="form-label">{label} {required && '*'}</label>}
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    </div>
  );
}
