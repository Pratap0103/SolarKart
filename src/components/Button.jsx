import React from 'react';

export default function Button({ children, type = 'button', variant = 'primary', size = 'md', onClick, disabled = false, style = {}, className = '' }) {
  let btnClass = 'btn-primary';
  if (variant === 'secondary') btnClass = 'btn-secondary';
  else if (variant === 'danger') btnClass = 'btn-danger';
  else if (variant === 'outline') btnClass = 'btn-outline';

  const sizeClass = size === 'sm' ? 'btn-sm' : '';

  return (
    <button
      type={type}
      className={`btn ${btnClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
