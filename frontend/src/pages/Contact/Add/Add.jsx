import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Title from '../../../components/ui/Text/Title';
import Subtitle from '../../../components/ui/Text/Subtitle';

const AddContact = ({ onAddContact }) => {
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a contact object
    const newContact = {
      image,
      firstName,
      lastName,
      phone,
      address,
    };

    // Call the onAddContact function passed from the parent component
    onAddContact(newContact);
    
    // Reset form fields
    setImage('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div className="add-contact-form p-3">
      <Title>Add Contact</Title>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <Subtitle className="my-3">
          Image:
                </Subtitle>
          
          <Input type="file" onChange={handleImageChange} disabled={false} className={'cursor-pointer'}/>
        </div>
        <div className="my-2">
        <Subtitle className="my-3">First Name:</Subtitle>
          <Input type="text" defaultValue={firstName} onChange={handleFirstNameChange} disabled={false} required />
        </div>
        <div className="my-2">
        <Subtitle className="my-3">Last Name:</Subtitle>
          <Input type="text" defaultValue={lastName} onChange={handleLastNameChange} disabled={false} required />
        </div>
        <div className="my-2">
        <Subtitle className="my-3">Phone Number:</Subtitle>
          <Input type="tel" defaultValue={phone} onChange={handlePhoneChange} disabled={false} required />
        </div>
        <div className="my-2">
        <Subtitle className="my-3">Address:</Subtitle>
          <Input type="text" defaultValue={address} onChange={handleAddressChange} disabled={false} required />
        </div>
        <div className="my-2 d-flex flex-row justify-content-space-around align-items-center">
          <Button type="submit" icon="fa-plus" text={'Submit'}/>
        </div>
      </form>
    </div>
  );
};

AddContact.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default AddContact;
