// Title.js
import React from 'react';
import PropTypes from 'prop-types';
import './Text.css'; // Optional: If you have custom CSS styles

const Title = ({
  children,
  color = 'black',
  size = 'large',
  weight = 'bold',
  align = 'left',
  className = '',
  onClick, // New onClick prop
  ...otherProps // Capture other props like style, data attributes, etc.
}) => {
  return (
    <span
      className={`text-title text-${size} text-${weight} text-${align} ${className}`}
      style={{ color }}
      onClick={onClick} // Attach the onClick handler to the span element
      {...otherProps} // Spread any other props (like 'data-*', 'aria-*', etc.)
    >
      {children}
    </span>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  weight: PropTypes.oneOf(['light', 'normal', 'bold']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  onClick: PropTypes.func, // Define the onClick prop type
};

Title.defaultProps = {
  color: 'black',
  size: 'large',
  weight: 'bold',
  align: 'left',
  className: '',
  onClick: () => {}, // Default to no-op if not provided
};

export default Title;
