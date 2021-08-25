import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar/SearchBar';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const displaySearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="link para o perfil"
          />
        </Link>
      </div>
      <div>
        <button type="button" onClick={ displaySearchBar }>
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="Ícone de buscar receita"
          />
        </button>
      </div>
      <h1 data-testid="page-title">{ title }</h1>
      { showSearchBar ? <SearchBar /> : '' }
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
