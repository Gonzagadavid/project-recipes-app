import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Footer, HeaderWithoutSearch } from '../../components';
import getLocalStorage from '../../services/localStorage/getLocalStorage';

function Perfil() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handleEmail = () => {
      const userEmail = getLocalStorage('user') || { email: '' };
      setEmail(userEmail.email);
    };
    handleEmail();
  }, []);

  const handleRouteLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <HeaderWithoutSearch title="Perfil" />
      <h3 data-testid="profile-email">{email}</h3>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleRouteLogin }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
