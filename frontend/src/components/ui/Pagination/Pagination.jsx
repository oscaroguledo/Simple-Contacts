import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';
import Button from '../Button/Button';  // Assuming you have a custom Button component

const Pagination = ({ currentPage = 1, items = [], perPage = 9, onPageChange}) => {
    const [current, setCurrent] = useState(currentPage);

    // Calculate the total number of pages based on totalItems and perPage
    const totalPages = Math.ceil(items.length / perPage);

    // Generate page numbers based on the total number of pages
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        // Slice the items based on the page index and perPage value
        const start = i * perPage;  // Calculate the start index for the slice
        const end = start + perPage;  // Calculate the end index for the slice

        // Push a new page object with the sliced items and the page number
        pages.push({
            pageNumber: i + 1,  // Page number starts from 1
            items: items.slice(start, end)  // Slice the items for the current page
        });
    }
        

    // Handle the click event for page navigation
    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrent(page);
            if (onPageChange) {
                onPageChange(page);  // Pass the new page number to the parent component
            }
        }
    };

    useEffect(() => {
        // Update currentPage if the prop changes
        setCurrent(currentPage);
    }, [currentPage]);

    return (
        <div className="pagination d-flex flex-row justify-content-center align-items-center">
            {/* Previous Button */}
            <Button
                icon="fa-chevron-left"
                size="small"
                onClick={() => handlePageClick(current - 1)}
                disabled={current === 1}
            />

            {/* Page Numbers */}
            {pages.map((page) => (
                <span
                    key={page.pageNumber}
                    className={`page-number ${page.pageNumber === current ? 'page-active' : ''} cursor-pointer`}
                    onClick={() => handlePageClick(page.pageNumber)}
                    style={{ cursor: page.pageNumber === current ? 'not-allowed' : 'pointer' }} // Handle "disabled" state for span
                >
                    {page.pageNumber}
                </span>
            ))}

            {/* Next Button */}
            <Button
                icon="fa-chevron-right"
                size="small"
                onClick={() => handlePageClick(current + 1)}
                disabled={current === totalPages}
            />
        </div>
    );
};

// Prop types for validation
Pagination.propTypes = {
    currentPage: PropTypes.number,  // Current active page
    items: PropTypes.array,   // Total number of items
    perPage: PropTypes.number,      // Number of items per page
    onPageChange: PropTypes.func.isRequired, // Callback function to handle page change
    NextText: PropTypes.string,     // Text for the Next button (optional)
    PreviousText: PropTypes.string // Text for the Previous button (optional)
};

export default Pagination;
