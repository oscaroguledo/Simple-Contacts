import React from 'react';
import './Input.css'; // Make sure to create a CSS file for styling (optional)

const Checkbox = ({ checked, onChange, className, ...props }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`input-checkbox cursor-pointer mx-2 ${className && className}`} // Add custom className for styling if needed
      {...props}
    />
  );
};

export default Checkbox;
