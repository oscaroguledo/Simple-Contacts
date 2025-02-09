import React, { useState, useEffect } from 'react';
import './List.css';  // Make sure the path is correct
import Title from '../Text/Title';
import Subtitle from '../Text/Subtitle';
import Button from '../../ui/Button/Button';
import Pagination from '../Pagination/Pagination';
import Text from '../Text/Text';
import Search from '../Input/Search';
import Avatar from '../Avatar/Avatar';
import Checkbox from '../Input/Checkbox';

const List = ({ items, search, onAdd, onClickItem, paginationPosition = 'center',pagination =false  }) => {
  const [contacts, setContacts] = useState(items);
  const [filteredContacts, setFilteredContacts] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [showCheckboxes, setShowCheckboxes] = useState(false); // Track checkbox visibility
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [isLongPress, setIsLongPress] = useState(false); // Track if it's a long press


  // Function to delete a contact
  const deleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const addContact = () => {
    if (onAdd){
      onAdd();
    }
  };

  // Handle search filter
  const handleSearchFilter = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    // Filter contacts based on search value
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      contact.phone.includes(searchValue)
    );
    setFilteredContacts(filtered);

    // Reset the current page to 1 whenever the search value changes
    setCurrentPage(1);
  }, [searchValue, contacts]);

  // Pagination logic
  const perPage = 7;
  const totalPages = Math.ceil(filteredContacts.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    const start = i * perPage;
    const end = start + perPage;
    pages.push({
      pageNumber: i + 1,
      contacts: filteredContacts.slice(start, end)
    });
  }

  // Handle checkbox selection for mass delete
  const handleCheckboxChange = (id) => {
    const newSelectedContacts = new Set(selectedContacts);
    if (newSelectedContacts.has(id)) {
      newSelectedContacts.delete(id);
    } else {
      newSelectedContacts.add(id);
    }
    setSelectedContacts(newSelectedContacts);
  };

  // Mass delete function
  const handleMassDelete = () => {
    const updatedContacts = contacts.filter(contact => !selectedContacts.has(contact.id));
    setContacts(updatedContacts);
    setSelectedContacts(new Set()); // Clear selected contacts after mass delete
  };

  // Long press detection
  const handleMouseDown = (id) => {
    const timer = setTimeout(() => {
      setShowCheckboxes(!showCheckboxes); // Show checkboxes after long press
    }, 500); // 500ms for long press duration
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer); // Cancel long press if mouse is released
      setIsLongPress(true); // Mark as long press after delay
      setLongPressTimer(null);
    }
    // If it's not a long press, perform left-click action
    if (!isLongPress) {
      setIsLongPress(false); // Reset long press status
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setShowCheckboxes(!showCheckboxes); // Show checkboxes on right-click
  };
  const handleLeftClick = (contact, event) => {
    event.preventDefault(); // Prevent any default behavior
    if (!isLongPress && onClickItem) {
      onClickItem(contact, 2); // Trigger the onClickItem function with the contact and the value '2'
    }
    // Reset long press flag
    setIsLongPress(false);
  };

  return (
    <div className="contacts px-3">
      <Title>Contact List</Title>
      <Subtitle color="notification" className="mx-3">
        {pages[currentPage - 1]?.contacts.length}/{filteredContacts.length}
      </Subtitle>

      {/* Show Search if 'search' prop is true */}
      <span className="d-flex flex-row justify-content-space-between align-items-center my-1">
        {search && <Search suffix={''} onSearch={handleSearchFilter} />}
        <span className="mx-2"></span>
        <Button size="small" icon="fa-plus" onClick={addContact} text="Add" />
      </span>

      {/* Mass Delete Button */}
      <span className="d-flex flex-row justify-content-space-between align-items-center my-1">
        {selectedContacts.size > 0 && (
          <Button
            size="small"
            icon="fa-trash"
            variant="danger"
            onClick={handleMassDelete}
            text={`Delete ${selectedContacts.size} selected`}
          />
        )}
      </span>

      <div>
        {pages[currentPage - 1]?.contacts.map(contact => (
          <span
            key={contact.id}
            className="contact-item p-2 mt-2 d-flex flex-row justify-content-space-between align-items-center cursor-pointer"
            onClick={(event) => handleLeftClick(contact,event)}
            onContextMenu={handleRightClick} // Detect right-click
            
            onMouseDown={() => handleMouseDown(contact.id)} // Detect long press
            onMouseUp={handleMouseUp} // Cancel long press on mouse release
          >
            <span className="d-flex flex-row justify-content-space-between align-items-center">
              <Avatar src={contact.image || ''} alt={contact.name} />

              {showCheckboxes && (
                <Checkbox
                  checked={selectedContacts.has(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)} // Toggle checkbox selection
                />
              )}

              <Title className="m-2">{contact.name}</Title>
              <Text className="m-2"><strong>Address:</strong> {contact.address}</Text>
              <Text className="m-2"><strong>Phone:</strong> {contact.phone}</Text>
            </span>
            <Button size="small" icon="fa-trash" onClick={() => deleteContact(contact.id)} text="Delete" variant="danger" />
          </span>
        ))}
      </div>

      
      {pagination && <span className={`p-3 ${paginationPosition === 'left' ? 'mr-auto' : paginationPosition === 'right' ? 'ml-auto' : ''}`}>
                <Pagination
                    currentPage={currentPage}
                    items={items}  // Pass totalPages to Pagination component
                    perPage={perPage}
                    onPageChange={handlePageChange}
                />
            </span>}
    </div>
  );
};

export default List;
