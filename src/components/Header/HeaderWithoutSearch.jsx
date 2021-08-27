import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';

function HeaderWithoutSearch({ title }) {
  return (
    <div>
      <Link to="/perfil">
        <img
          src={ ProfileIcon }
          alt="perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

export default HeaderWithoutSearch;

HeaderWithoutSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
