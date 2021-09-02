import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HeaderWithoutSearch, Footer } from '../../components';
import { BEBIDAS_RANDOM } from '../../endPoints/bebidas';
import fetchApi from '../../services/fetchApi';
import '../Explore/Explore.css';

const ExplorarBebidas = () => {
  const history = useHistory();
  const handlerClick = async () => {
    const { drinks: [{ idDrink }] } = await fetchApi(BEBIDAS_RANDOM);
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div className="explorarBebidas">
      <HeaderWithoutSearch title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handlerClick() }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>);
};

export default ExplorarBebidas;
