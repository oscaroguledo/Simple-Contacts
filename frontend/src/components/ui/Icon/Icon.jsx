import React from 'react';
import PropTypes from 'prop-types';  // Import PropTypes to define expected props
import './Icon.css';  // Import any CSS for icon styling

const Icon = ({
  name, 
  type='light',
  variant='primary',
  onClick,
  className = '', // Default to an empty string if no className is passed
  size = 'medium', // Default to 'medium' if no size is provided
  clickable =false,
  style,
  ...props // Spread the remaining props to be passed to the <i> element
}) => {
  // Dynamically set the size class for the icon
  const sizeClass = `icon-${size}`;

  return (
    <i
      className={`fa-${type || 'light'} ${name} icon icon-${variant} ${className} ${sizeClass} ${clickable?'cursor-pointer' :''}`} // Combine all the class names
      onClick={onClick}
      style={style}
      {...props} // Pass additional props (e.g., aria-label, data attributes)
    />
  );
};

// Define prop types to ensure that the props are used correctly
Icon.propTypes = {
  name: PropTypes.string.isRequired, // The icon name is required (FontAwesome class name)
  onClick: PropTypes.func, // Optional onClick function
  className: PropTypes.string, // Optional additional className,
  type :PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']), // Define acceptable sizes
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'notification', 'light', 'dark']),
  style: PropTypes.object, // Optional inline style object
};

// Default props if no value is provided
Icon.defaultProps = {
  onClick: null,  // Default to no onClick handler
  className: '',  // Default to no additional className
  type:'light',
  size: 'medium',  // Default to 'medium' size
  variant:'primary',
  style: {}, // Default to no inline style
};

export default Icon;
