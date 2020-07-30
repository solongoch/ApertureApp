import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Fragment } from 'react';


const ChangePasswordInputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (

    // <div className="form-group form-inline">
    <Fragment>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={classNames("form-control shadow-none", { "is-invalid": error })}
        onChange={onChange}
        />
      {error && (<div className="invalid-feedback error-style">{error}</div>)}
        </Fragment>
  // </div>
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