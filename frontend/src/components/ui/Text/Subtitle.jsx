// Subtitle.js
import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = ({ children, color = 'black', size = 'medium', weight = 'normal', align = 'left', className = '', ...props }) => {
  return (
    <span className={`text-subtitle text-${size} text-${weight} text-${align} text-${color} ${className}`} {...props}>
      {children}
    </span>
  );
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  weight: PropTypes.oneOf(['light', 'normal', 'bold']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};

Subtitle.defaultProps = {
  color: 'black',
  size: 'medium',
  weight: 'normal',
  align: 'left',
  className: '',
};

export default Subtitle;
