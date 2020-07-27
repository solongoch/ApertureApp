import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const SignupPasswordField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onClick,
  error,
  isPasswordShown,
  isPassword2Shown

}) => {
  var showEyeClass;
  if (name==='password') {
    showEyeClass = (<span className={`fa fa-eyeicon ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`} onClick={onClick}/>);
  } else {
    showEyeClass = ( <span className={`fa fa-eyeicon ${isPassword2Shown ? "fa-eye-slash" : "fa-eye"} password-icon`}
    onClick={onClick}
  />);
  }

  return (    
    <div className="form-group signup_fg col-auto">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={classNames("form-control inputstyles shadow-none", { "is-invalid": error })}
        onChange={onChange}      
      />
      {/* display eye icon only if password has value */}
      {value && (showEyeClass)}
    
      {/*show invalid-feedback error-style div only if errors.name is true */}
      {error && (<div className="invalid-feedback error-style">{error}</div>)}
    </div>
  );
}

SignupPasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isPasswordShown:PropTypes.bool.isRequired,
  isPassword2Shown:PropTypes.bool.isRequired
};

SignupPasswordField.defaultProps = {
  isPasswordShown:false,
  isPassword2Shown:false
};
export default SignupPasswordField;