import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/ui/Text/Title';
import Subtitle from '../../../components/ui/Text/Subtitle';

const ViewContact = ({ contact }) => {
  if (!contact) {
    return <div>No contact found</div>;
  }

  const { image, name, phone, address } = contact;

  return (
    <div className="view-contact p-3">
      <Title>View Contact</Title>
      <div className="contact-details my-3">
        {image && (
          <div className="contact-image mb-3">
            <img
              src={URL.createObjectURL(image)}
              alt={`${name.split(' ')[0]} ${name.split(' ')[1]}`}
              className="contact-image-preview"
            />
          </div>
        )}
        <div className="contact-info my-2">
          <Subtitle>First Name: {name.split(' ')[0]}</Subtitle>
        </div>
        <div className="contact-info my-2">
          <Subtitle>Last Name: {name.split(' ')[1]}</Subtitle>
        </div>
        <div className="contact-info my-2">
          <Subtitle>Phone Number: {phone}</Subtitle>
        </div>
        <div className="contact-info my-2">
          <Subtitle>Address: {address}</Subtitle>
        </div>
      </div>
    </div>
  );
};

ViewContact.propTypes = {
  contact: PropTypes.shape({
    image: PropTypes.object, // For the image file
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }),
};

export default ViewContact;
