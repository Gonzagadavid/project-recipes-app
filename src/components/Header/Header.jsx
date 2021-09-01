import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import SearchIcon from '../../images/searchIcon.svg';
import HeaderWithoutSearch from './HeaderWithoutSearch';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const displaySearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <header>
      <HeaderWithoutSearch />
      <button type="button" onClick={ displaySearchBar }>
        <img
          data-testid="search-top-btn"
          src={ SearchIcon }
          alt="Ícone de buscar receita"
        />
      </button>
      <h1 data-testid="page-title">{ title }</h1>
      { showSearchBar ? <SearchBar /> : '' }
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
