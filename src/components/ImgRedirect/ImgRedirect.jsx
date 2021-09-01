import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ImgRedirect = ({ to, src, alt, id }) => (
  <Link to={ to }>
    <img
      src={ src }
      alt={ alt }
      data-testid={ id }
    />
  </Link>
);

export default ImgRedirect;

ImgRedirect.propTypes = {
  to: string.isRequired,
  src: string.isRequired,
  alt: string.isRequired,
  id: string.isRequired,
};
