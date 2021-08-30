import { bool, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonRedirect = ({ to, btnText, id, disabled }) => (
  <Link to={ to }>
    <button
      type="button"
      data-testid={ id }
      id={ id }
      className="btn-redirect"
      disabled={ disabled }
    >
      {btnText}
    </button>
  </Link>
);

export default ButtonRedirect;

ButtonRedirect.defaultProps = {
  disabled: false,
};

ButtonRedirect.propTypes = {
  to: string.isRequired,
  btnText: string.isRequired,
  id: string.isRequired,
  disabled: bool,
};
