import { bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';

const Input = ({ labelText, id, name, type, onChange, onChecked, value }) => {
  const checkLabel = type === 'radio' || type === 'checkbox';
  return (
    <label htmlFor={ id }>
      { !checkLabel ? labelText : ''}
      <input
        type={ type }
        name={ name }
        data-testid={ id }
        id={ id }
        checked={ onChecked }
        onChange={ onChange }
        value={ value }
      />
      {checkLabel ? labelText : ''}
    </label>
  );
};

Input.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  name: string,
  type: string.isRequired,
  onChange: func.isRequired,
  onChecked: bool,
  value: oneOfType([string, number]).isRequired,
};

Input.defaultProps = {
  name: '',
  onChecked: false,
};
export default Input;
