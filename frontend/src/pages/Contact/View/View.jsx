import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/ui/Text/Title';
import Subtitle from '../../../components/ui/Text/Subtitle';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

const ViewContact = ({ contact, onUpdate }) => {
  if (!contact) {
    return <div>No contact found</div>;
  }

  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(contact.image || '');
  const [name, setName] = useState(contact.name || '');
  const [phone, setPhone] = useState(contact.phone || '');
  const [address, setAddress] = useState(contact.address || '');

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const toggleEditable = () => {
    if (editable && onUpdate) {
      // If the form is being switched back to view mode, call onUpdate with updated data
      onUpdate({ image, name, phone, address });
    }
    setEditable(!editable); // Toggle edit mode
  };

  return (
    <div className="view-contact p-3">
      <span className="d-flex flex-row justify-content-space-between align-items-center my-1">
        <Title>View Contact</Title>
        <span className="mx-2"></span>
        <Button size="small" icon="fa-pencil" onClick={toggleEditable} text={editable ? 'Save' : 'Edit'} />
      </span>

      <div className="contact-details my-3">
        {image && (
          <div className="contact-image mb-3">
            <img
              src={URL.createObjectURL(image)}
              alt={name}
              className="contact-image-preview"
            />
          </div>
        )}

        <div className="my-2">
          <Subtitle className="my-3">Name:</Subtitle>
          <Input
            type="text"
            defaultValue={name}
            onChange={handleNameChange}
            disabled={!editable}
            required
          />
        </div>

        <div className="my-2">
          <Subtitle className="my-3">Phone Number:</Subtitle>
          <Input
            type="tel"
            defaultValue={phone}
            onChange={handlePhoneChange}
            disabled={!editable}
            required
          />
        </div>

        <div className="my-2">
          <Subtitle className="my-3">Address:</Subtitle>
          <Input
            type="text"
            defaultValue={address}
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
    image: PropTypes.object, // For the image file
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default ViewContact;
