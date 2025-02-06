// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Optional: If you're using an external CSS file for styles
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

const Button = ({
  onClick,
  text,
  type = 'button', // default type is 'button'
  variant = 'primary', // default variant is 'primary'
  size = 'small', // default size is 'medium'
  disabled = false,
  outline = false,
  loading = false,
  icon = null,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${!text ?'btn-round':''} ${outline ? 'btn-outline':''}`}
      onClick={onClick}
      disabled={disabled || loading} // Disable button if it's loading or explicitly disabled
      {...props}
    >
        {!children ? 
        <>
            {loading ? (
                <span className={`btn-loader btn-${variant}-loader`}></span> // You can replace this with a spinner
            ) : (
                icon && <Icon variant={(variant==='light' || variant ==='warning')?'dark':'light'} size={size} name={icon} />
            )}
            {text && <Text variant={(variant==='light' || variant ==='warning')?'black':'white'} size={size} className='ml-2' >{text}</Text>}
        </>
        :
            <>{children}</>
        }
      
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  outline:PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning', 'notification', 'light', 'dark', 'outline']),
  size: PropTypes.oneOf(['xsmall','small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.element,
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'medium',
  outline: false,
  disabled: false,
  loading: false,
  icon: null,
};

export default Button;
