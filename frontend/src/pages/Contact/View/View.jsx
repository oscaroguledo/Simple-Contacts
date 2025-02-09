import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/ui/Text/Title';
import Subtitle from '../../../components/ui/Text/Subtitle';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import usePostOrPut from '../../../hooks/api/usePostorPut';
import { baseurl } from '../../../utils/constants';

const ViewContact = ({ contact, onUpdate }) => {
  
  const [editable, setEditable] = useState(false);
  const id = contact.id || '';
  const [image, setImage] = useState(contact.image || '');
  const [name, setName] = useState(contact.name || '');
  const [phone_number, setPhone] = useState(contact.phone_number || '');
  const [address, setAddress] = useState(contact.address || '');
  const [isSaving, setIsSaving] = useState(false); // State to track saving process

  const { sendData } = usePostOrPut(`${baseurl}/api/contacts/${contact.id}/`, 'put');

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedContact = {
      image,
      name,
      phone_number,
      address,
    };

    setIsSaving(true); // Set saving to true while the request is being processed
    await sendData(updatedContact);
    setIsSaving(false); // Reset saving state once done
    
    if (onUpdate) {
      // If switching back to view mode, call onUpdate with updated data
      onUpdate({ id, image, name, phone_number, address });
    }
  };

  const toggleEditable = () => {
    setEditable(!editable); // Toggle edit mode
  };

  return (
    <div className="view-contact p-3">
      <span className="d-flex flex-row justify-content-space-between align-items-center my-1">
        <Title>View Contact</Title>
        <span className="mx-2 d-flex flex-row justify-content-space-around align-items-center">
        {editable && (
          <Button
            size="small"
            icon="fa-floppy-disk"
            onClick={handleSubmit}
            loading={isSaving}
            text={isSaving ? 'Saving...' : 'Save'} // Show 'Saving...' when data is being submitted
            disabled={isSaving} // Disable the save button when saving
          />
        )}
        <span className="mx-2 "></span>
        <Button
          size="small"
          icon="fa-pencil"
          onClick={toggleEditable}
          text='Edit'
          
        />
        </span>
        
      </span>

      <div className="contact-details my-3">
        {image && (
          <div className="contact-image mb-3">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={name}
              className="contact-image-preview"
            />
          </div>
        )}

        <div className="my-2">
          <Subtitle className="my-3">Name:</Subtitle>
          <Input
            type="text"
            value={name} // Using value for controlled components
            onChange={handleNameChange}
            disabled={!editable}
            required
          />
        </div>

        <div className="my-2">
          <Subtitle className="my-3">Phone Number:</Subtitle>
          <Input
            type="tel"
            value={phone_number} // Using value for controlled components
            onChange={handlePhoneChange}
            disabled={!editable}
            required
          />
        </div>

        <div className="my-2">
          <Subtitle className="my-3">Address:</Subtitle>
          <Input
            type="text"
            value={address} // Using value for controlled components
            onChange={handleAddressChange}
            disabled={!editable}
            required
          />
        </div>

        {/* Show file input for image change only when in editable mode */}
        {editable && (
          <div className="my-2">
            <Subtitle className="my-3">Change Image:</Subtitle>
            <Input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        )}
      </div>
    </div>
  );
};

ViewContact.propTypes = {
  contact: PropTypes.shape({
    image: PropTypes.string, // Expecting string if URL or file path is provided
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default ViewContact;
