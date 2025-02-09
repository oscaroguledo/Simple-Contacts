import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Icon from '../Icon/Icon';

const Search = ({ suffix, internalSuffix, placeholder, onSearch, ...props }) => {
    const inputRef = useRef(null);
    const [value, setValue] = useState('');
    
    // Memoize the function so it doesn't change on every render
    const handleSearch = useCallback((value) => {
        if (onSearch) {
            onSearch(value);
        }
    }, [onSearch]); // Only re-create if `onSearch` changes

    const handleAudioSearch = (value) => {
        if (onSearch) {
            onSearch(value); // Use the state value directly
        }
    };

    // Effect to add the keypress event listener
    useEffect(() => {
        const inputElement = inputRef.current;

        const handleKeyPress = (event) => {
            
            if (event.key === 'Enter') {
                handleSearch(inputRef.current.value); // Trigger search on Enter key
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace' && inputRef.current.value.length <= 1) {
                console.log('Backspace pressed, input is empty');
                handleSearch('');
            }
        };

        if (inputElement) {
            inputElement.addEventListener('keypress', handleKeyPress);
            inputElement.addEventListener('keydown', handleKeyDown);

        }
        

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keypress', handleKeyPress);
                inputElement.removeEventListener('keydown', handleKeyDown);

            }
        };
    }, [handleSearch]);

    return (
        <Input
            className={'search-input'}
            ref={inputRef} // Attach ref to the input
            prefix={<Icon variant={'dark'} name={'fa-magnifying-glass'} size='large' clickable onClick={handleSearch} />}
            internalSuffix={internalSuffix}
            defaultValue={value || ''} 
            onChange={(event)=>(setValue(event.target.value))} 
            suffix={suffix && <Icon variant={'dark'} name={'fa-microphone'} size='large' clickable onClick={handleAudioSearch} />}
            placeholder={placeholder || 'Search ...'}
            disabled={false}
            {...props}
        />
    );
};

Search.propTypes = {
    suffix: PropTypes.node,           // External suffix (can be text, icon, or component)
    internalSuffix: PropTypes.node,   // Internal suffix inside the input (can be text, icon, or component)
    placeholder: PropTypes.string,    // Placeholder text for the input
    onSearch: PropTypes.func,         // Callback function when Enter key is pressed
};

export default Search;
