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

export default Button;

Button.propTypes = {
  disabled: bool,
  text: string.isRequired,
  onClick: func,
  id: string.isRequired,
};

Button.defaultProps = {
  onClick: (() => {}),
  disabled: false,
};
