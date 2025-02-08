import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

const Breadcrumb = ({ items, className, onSetCurrentPage }) => {
  return (
    <span className={`breadcrumb ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
              key={index}
              className={`breadcrumb-item px-4 py-1 ${index === items.length - 1 ? 'active' : ''}`}
            >
              {index === items.length - 1 ? (
                <span>{item.label}</span>  // Active item (last one)
              ) : (
                <span onClick={()=>(onSetCurrentPage(item,index))}>{item.label}</span>
              )}
            </span>
          {/* Render the arrow only if it's not the last item */}
          {index < items.length - 1 && <span className="breadcrumb-item-separator mx-1">&#8594;</span>}
        </React.Fragment>
      ))}
    </span>
  );
};

// PropTypes validation
Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  onSetCurrentPage: PropTypes.func.isRequired,
};

export default Breadcrumb;
