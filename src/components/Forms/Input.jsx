import { func, number, oneOfType, string } from 'prop-types';
import React from 'react';

const Input = ({ labelText, id, name, type, onChange, value }) => {
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
      />
      {checkLabel ? labelText : ''}
    </label>
  );
};

export default Input;

Input.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  name: string,
  type: string.isRequired,
  onChange: func.isRequired,
  value: oneOfType([string, number]),
};

Input.defaultProps = {
  name: '',
  value: '',
};
