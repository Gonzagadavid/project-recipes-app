import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import './Header.css';

function HeaderWithoutSearch({ title }) {
  return (
    <div className="headerOutSearch">
      <h1 data-testid="page-title">{ title }</h1>
      <Link to="/perfil">
        <img
          src={ ProfileIcon }
          alt="perfil"
          data-testid="profile-top-btn"
        />
      </Link>
    </div>
  );
}

export default HeaderWithoutSearch;

HeaderWithoutSearch.propTypes = {
  title: PropTypes.string.isRequired,
};
