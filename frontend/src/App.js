import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/ui/List/List';
import Title from './components/ui/Text/Title';
import Breadcrumb from './components/ui/Breadcrumb/Breadcrumb';
import AddContact from './pages/Contact/Add/Add';
import ViewContact from './pages/Contact/View/View';
import { baseurl } from './utils/constants';
import axios from 'axios';

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [contact, setContact] = useState(null);
  const [contactsData, setContactsData] = useState([]);

  // Fetching contacts data when the component mounts or when currentPageIndex changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/contacts/`);
        setContactsData(response.data);
      } catch (error) {
        console.error('Error fetching contacts data:', error);
      }
    };

    fetchData();
  }, []); // Only re-fetch when currentPageIndex changes

  // Function to set the current page and the selected contact
  const setCurrentPage = (contact, index) => {
    setCurrentPageIndex(index);
    setContact(contact);
  };

  // Handle adding new contact to the list without refetching the data
  const handleAddContact = (newContact) => {
    setContactsData((prevData) => [...prevData, newContact]); // Add new contact to the list
    setCurrentPage(newContact, 0); // After adding, go back to the list page (index 0)
  };
  const handleUpdateContact = (updatedContact) => {
    setContactsData((prevData) => {
      return prevData.map((contact) => {
        
        // If the contact id matches, update the contact, otherwise return the original contact
        if (contact.id === updatedContact.id) {
          return updatedContact;
        }
        return contact; // If no match, just return the contact as is
      });
    });
    
    setCurrentPage(updatedContact, 0); // After updating, go back to the list page (index 0)
  };
  const handleDeleteContact = (id) => {
    const updatedContacts = contactsData.filter(contact => contact.id !== id);
    setContactsData(updatedContacts);
    setCurrentPageIndex(0);
  };

  // Breadcrumb configuration based on currentPageIndex
  const renderBreadCrumbItems = () => {
    const breadcrumbItems = [
      { label: 'Contacts', onClick: () => setCurrentPageIndex(0) },
    ];

    switch (currentPageIndex) {
      case 0:
        breadcrumbItems.push({ label: 'List', onClick: () => {} });
        break;
      case 1:
        breadcrumbItems.push({ label: 'Add', onClick: () => {} });
        break;
      case 2:
        breadcrumbItems.push({ label: 'View/Update', onClick: () => {} });
        break;
      default:
        breadcrumbItems.push({ label: 'List', onClick: () => {} });
        break;
    }

    return breadcrumbItems;
  };

  // Rendering content based on currentPageIndex
  const renderPageContent = () => {
    switch (currentPageIndex) {
      case 0:
        return (
          <List
            items={contactsData}
            onClickItem={setCurrentPage}
            onAdd={() => setCurrentPageIndex(1)} // Navigate to Add page
            onDelete={handleDeleteContact} // Navigate to Add page
            search
            pagination
          />
        );
      case 1:
        return <AddContact onAddContact={handleAddContact} />;
      case 2:
        return <ViewContact contact={contact} onUpdate={handleUpdateContact} />;
      default:
        return (
          <List
            items={contactsData}
            onClickItem={setCurrentPage}
            onAdd={() => setCurrentPageIndex(1)}
            search
            pagination
          />
        );
    }
  };

  return (
    <div className="app mt-4">
      <Title align="center" className="mx-3">
        Contacts Application
      </Title>

      <Breadcrumb items={renderBreadCrumbItems()} className="m-3" onSetCurrentPage={setCurrentPage} />
      
      {renderPageContent()}
    </div>
  );
}

export default App;
