import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const ChangePasswordInputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (

    <div className="form-group form-inline">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={classNames("form-control shadow-none", { "is-invalid": error })}
        onChange={onChange}
      />
      {error && (<div className="invalid-feedback error-style">{error}</div>)}
  </div>
  );
}

ChangePasswordInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default ChangePasswordInputField;