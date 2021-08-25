import { bool, func, string } from 'prop-types';
import React from 'react';

const Button = ({ disabled, text, onClick, id }) => (
  <button
    type="button"
    data-testid={ id }
    disabled={ disabled }
    onClick={ onClick }
  >
    {text}
  </button>
);

Button.propTypes = {
  disabled: bool.isRequired,
  text: string.isRequired,
  onClick: func,
  id: string.isRequired,
};

Button.defaultProps = {
  onClick: (() => {}),
};

export default Button;
