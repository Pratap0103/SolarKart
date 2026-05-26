import React from 'react';

export default function Table({ headers = [], children, style = {} }) {
  // Recursively process children to inject data-label into td elements
  const responsiveChildren = React.Children.map(children, (child) => {
    // If it's a tr element, process its td children
    if (React.isValidElement(child) && child.type === 'tr') {
      const tds = React.Children.map(child.props.children, (td, idx) => {
        if (React.isValidElement(td) && td.type === 'td') {
          return React.cloneElement(td, { 'data-label': headers[idx] || '' });
        }
        return td;
      });
      return React.cloneElement(child, { children: tds });
    }
    // If it's an array (e.g. from map()), React.Children.map flattens it, but just in case we need to handle fragments, we return child as is.
    return child;
  });

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
          {responsiveChildren}
        </tbody>
      </table>
    </div>
  );
}
