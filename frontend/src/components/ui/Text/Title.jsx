// Title.js
import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children, color = 'black', size = 'large', weight = 'bold', align = 'left', className = '' }) => {
  return (
    <span className={`text-title text-${size} text-${weight} text-${align} ${className}`} style={{ color }}>
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
};

Title.defaultProps = {
  color: 'black',
  size: 'large',
  weight: 'bold',
  align: 'left',
  className: '',
};

export default Title;
