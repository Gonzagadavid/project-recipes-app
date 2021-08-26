import { arrayOf, func, string } from 'prop-types';
import React from 'react';

const Select = ({ labelText, id, name, onChange, options }) => (
  <label htmlFor={ id }>
    { labelText }
    <select
      name={ name }
      data-testid={ id }
      id={ id }
      onChange={ onChange }
    >
      {options.map((option) => <option key={ option }>{option}</option>)}
    </select>
  </label>
);

export default Select;

Select.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  options: arrayOf(string).isRequired,
};
