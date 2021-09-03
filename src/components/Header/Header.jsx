import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import SearchIcon from '../../images/searchIcon.svg';
import HeaderWithoutSearch from './HeaderWithoutSearch';
import './Header.css';

function Header({ title }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const displaySearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <div>
      <header className="header">
        <HeaderWithoutSearch />
        <h1 data-testid="page-title">{ title }</h1>
        <button type="button" onClick={ displaySearchBar }>
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="Ícone de buscar receita"
          />
        </button>
      </header>
      { showSearchBar ? <SearchBar /> : '' }
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
