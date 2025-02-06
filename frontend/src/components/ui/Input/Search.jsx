import React, {  useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Icon from '../Icon/Icon';

const Search = ({ suffix, internalSuffix, placeholder, onSearch, ...props }) => {
    // Use ref to access the input element
    const inputRef = useRef(null);

    
    const handleSearch =() =>{
        if (onSearch) {
            onSearch(inputRef.current.value); // Pass the input value to onSearch
        }
    }
    const handleAudioSearch =() =>{
        if (onSearch) {
            onSearch(inputRef.current.value); // Pass the input value to onSearch
        }
    }

    // Effect to add the keypress event listener
    useEffect(() => {
        const inputElement = inputRef.current;

        // Keyboard binding logic
        const handleKeyPress = (event) => {
            // Trigger search on Enter key
            if (event.key === 'Enter') {
                handleSearch();
            }
        };
        
        if (inputElement) {
            inputElement.addEventListener('keypress', handleKeyPress);
        }

        // Clean up the event listener on component unmount
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, []);

    return (
        <Input 
            className={'search-input'}
            ref={inputRef} // Attach ref to the input
            prefix={<Icon variant={'dark'} name={'fa-magnifying-glass'} size='large' clickable onClick={handleSearch} />} 
            internalSuffix={internalSuffix && internalSuffix} 
            suffix={suffix || <Icon variant={'dark'} name={'fa-microphone'} size='large' clickable onClick={handleAudioSearch} />} 
            placeholder={placeholder || 'Search ...'}  // Ensure it's a string
            disabled={false}
            {...props} 
        />
    );
};

// Prop types for validation
Search.propTypes = {
    suffix: PropTypes.node,           // External suffix (can be text, icon, or component)
    internalSuffix: PropTypes.node,   // Internal suffix inside the input (can be text, icon, or component)
    placeholder: PropTypes.string,    // Placeholder text for the input
    onSearch: PropTypes.func,         // Callback function when Enter key is pressed
};

export default Search;
