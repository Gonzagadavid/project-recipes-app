import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BsPeopleCircle } from 'react-icons/bs';
import { Footer, HeaderWithoutSearch } from '../../components';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import './Perfil.css';

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
    <div className="Perfil">
      <HeaderWithoutSearch title="Perfil" />
      <p style={ { color: '#ee7505', fontSize: '150px' } }><BsPeopleCircle /></p>
      <h3 data-testid="profile-email">{email}</h3>
      <div className="button-container">
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
      </div>
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
