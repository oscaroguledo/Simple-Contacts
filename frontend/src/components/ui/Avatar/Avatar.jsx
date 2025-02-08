import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css'; // Make sure to create a custom CSS file for styling
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const Avatar = ({
  size =30,
  src,
  alt ='A',
  icon,
  shape='circle',
  style,
  className,
  onClick,
  ...props
}) => {
  const avatarClass = `avatar avatar-${shape} ${className || ''}`;
  const calcfontSize = (size) => {
        const baseSize = 0.875; // 0.875rem as the base size
        const sizeDifference = 0.25; // The difference in rem for each step
        return `${baseSize + size * sizeDifference}rem`;
    };
    // Calculate the font size based on the provided size
    const avatarFontSize = calcfontSize(size);

    const renderAvatarContent = () => {
        

        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    className="avatar-img"
                />
            );
        } else if (icon) {
            return (
                <Icon
                    name={icon}
                    className="avatar-icon"
                />
            );
        } else {
            return (
                <Text className="avatar-initials" >{alt?.charAt(0)?.toUpperCase()}</Text>
                
            );
        }
    };


  return (
    <div className={avatarClass}  style={{ width: size, height: size, fontSize: avatarFontSize }} onClick={onClick} {...props}>
      {renderAvatarContent()}
    </div>
  );
};

// Define prop types for the Avatar component
Avatar.propTypes = {
  size: PropTypes.number,  // Size of the avatar
  src: PropTypes.string, // Image source (URL)
  alt: PropTypes.string, // Alternative text (used for initials)
  icon: PropTypes.string, // Icon name (if using icon)
  shape: PropTypes.oneOf(['circle', 'square']), // Shape of the avatar (circle/square)
  style: PropTypes.object, // Custom styles
  className: PropTypes.string, // Additional class names
  onClick: PropTypes.func, // onClick handler
};

// Default props for the Avatar component
Avatar.defaultProps = {
  size: 30,
  shape: 'circle',
  onClick: () => {},
};

export default Avatar;
