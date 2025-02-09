import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Title from '../../../components/ui/Text/Title';
import Subtitle from '../../../components/ui/Text/Subtitle';
import usePostOrPut from '../../../hooks/api/usePostorPut';
import { baseurl } from '../../../utils/constants';
import { fileToBase64 } from '../../../utils/helper';

const AddContact = ({ onAddContact }) => {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [phone_number, setPhone] = useState('');
    const [address, setAddress] = useState('');

    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      fileToBase64(file).then((base64String) => {
        console.log(base64String); // This will print the base64 string
        setImage(base64String);    // Save the base64 string to state
      }).catch((error) => {
        console.error('Error converting file to base64:', error);
      });
    };
    
    const handleNameChange = (e) => setName(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);

    const { sendData } = usePostOrPut(`${baseurl}/api/contacts/`, 'post');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a contact object
        const newContact = {
            image,
            name,
            phone_number,
            address,
        };

        // Call the onAddContact function passed from the parent component
        sendData(newContact);
        
        onAddContact(newContact);
        
        // Reset form fields
        setImage('');
        setName('');
        setPhone('');
        setAddress('');
    };
    
  
  
    
    // Send a new post request when component mounts
    // useEffect(() => {
    //   sendData({ title: 'New Post', body: 'This is a test post.', userId: 1 });
    // }, [sendData]);

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
        <Subtitle className="my-3">Name:</Subtitle>
          <Input type="text" defaultValue={name} onChange={handleNameChange} disabled={false} required />
        </div>
        <div className="my-2">
        <Subtitle className="my-3">Phone Number:</Subtitle>
          <Input type="tel" defaultValue={phone_number} onChange={handlePhoneChange} disabled={false} required />
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
