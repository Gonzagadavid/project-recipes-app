import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonRedirect = ({ to, btnText, id }) => (
  <Link to={ to }>
    <button type="button" data-testid={ id } id={ id } className="btn-redirect">
      {btnText}
    </button>
  </Link>
);

export default ButtonRedirect;

ButtonRedirect.propTypes = {
  to: string.isRequired,
  btnText: string.isRequired,
  id: string.isRequired,
};
