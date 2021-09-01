import { func, number, oneOfType, string } from 'prop-types';
import React from 'react';

const Input = ({ labelText, id, name, type, onChange, value, placeholder }) => {
  const checkLabel = type === 'radio' || type === 'checkbox';
  return (
    <label htmlFor={ id }>
      { !checkLabel ? labelText : ''}
      <input
        type={ type }
        name={ name }
        data-testid={ id }
        id={ id }
        onChange={ onChange }
        value={ value }
        placeholder={ placeholder }
      />
      {checkLabel ? labelText : ''}
    </label>
  );
};

export default Input;

Input.propTypes = {
  labelText: string,
  id: string.isRequired,
  name: string,
  type: string.isRequired,
  onChange: func.isRequired,
  value: oneOfType([string, number]),
  placeholder: string,
};

Input.defaultProps = {
  name: '',
  value: '',
  labelText: '',
  placeholder: '',
};
