// Text.js
import React from 'react';
import PropTypes from 'prop-types';
import './Text.css'; // Optional: If you have custom CSS styles

const Text = ({
  children,
  type = 'body', // Default text type (body text)
  variant = 'black', // Default color is black
  size = 'medium', // Default size is medium
  weight = 'normal', // Default weight is normal
  align = 'left', // Default alignment is left
  className = '', // Any additional className for customization
  onClick, // onClick event handler
  ...otherProps // Capture other props like style, data attributes, etc.
}) => {
  return (
    <span
      className={`text-${type} text-${size} text-${weight} text-${align} text-${variant} ${className}`}
      onClick={onClick} // Attach the onClick handler to the span element
      {...otherProps} // Spread any other props (like 'data-*', 'aria-*', etc.)
    >
      {children}
    </span>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['body', 'title', 'subtitle', 'caption', 'heading', 'quote']),
  variant: PropTypes.oneOf(['white', 'gray', 'black', 'primary', 'secondary', 'danger', 'success', 'warning', 'notification']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  weight: PropTypes.oneOf(['light', 'normal', 'bold']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  onClick: PropTypes.func, // Define the onClick prop type
};

Text.defaultProps = {
  type: 'body',
  variant: 'black',
  size: 'medium',
  weight: 'normal',
  align: 'left',
  className: '',
  onClick: () => {}, // Default to no-op if not provided
};

export default Text;
