import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const SignupInputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error
}) => {
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
      {/*show invalid-feedback error-style div only if errors.name is true */}
      {error && (<div className="invalid-feedback error-style">{error}</div>)}
    </div>
  );
}

SignupInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default SignupInputField;