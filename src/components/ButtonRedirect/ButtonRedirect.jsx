import { bool, func, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonRedirect = ({ to, btnText, id, disabled, onClick }) => (
  <Link to={ to }>
    <button
      type="button"
      data-testid={ id }
      id={ id }
      className="btn-redirect"
      disabled={ disabled }
      onClick={ onClick }
    >
      {btnText}
    </button>
  </Link>
);

export default ButtonRedirect;

ButtonRedirect.defaultProps = {
  disabled: false,
  onClick: () => {},
};

ButtonRedirect.propTypes = {
  to: string.isRequired,
  btnText: string.isRequired,
  id: string.isRequired,
  onClick: func,
  disabled: bool,
};
