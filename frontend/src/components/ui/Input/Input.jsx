import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css'; // Import the CSS file for styling

const Input = ({ type, defaultValue,prefix, suffix,  internalSuffix, placeholder,onChange, className,disabled=true , ...props }) => {
    
    const [value, setValue] = useState(defaultValue || null);

    const handleChange = (event) => {
        if (event.target.value){
            setValue(event.target.value)
        }
        if (onChange) {
            onChange(event); // Pass the input value to onSearch
        }
    };

    return (
        <div className={`input ${className}`}>
            {/* Optional external prefix */}
            {prefix && <span className="input-prefix mr-2">{prefix}</span>}
            
            <div className="input-wrapper">
                
                <input 
                    type={type || "text"} 
                    value={value || ''} 
                    onChange={handleChange} 
                    placeholder={placeholder || 'Type something...'} 
                    className={`input-text`}
                    disabled={disabled}
                    {...props}
                />
                
                {/* Optional internal suffix inside input */}
                {internalSuffix && <span className="input-internal-suffix">{internalSuffix}</span>}
                {internalSuffix && <span className="input-separator">|</span>}
            </div>

            
            {/* Optional external suffix */}
            {suffix && <span className="input-suffix ml-2">{suffix}</span>}
        </div>
    );
};

// Prop types for validation
Input.propTypes = {
    type:PropTypes.string,
    defaultValue:PropTypes.number,
    prefix: PropTypes.string,          // External prefix text/icon
    suffix: PropTypes.string,          // External suffix text/icon
    internalPrefix: PropTypes.string,  // Internal prefix text/icon (inside the input)
    internalSuffix: PropTypes.string,  // Internal suffix text/icon (inside the input)
    placeholder: PropTypes.string      // Placeholder text for the input
};

export default Input;
