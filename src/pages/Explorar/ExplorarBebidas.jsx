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
    <div className="Explore">
      <HeaderWithoutSearch title="Explorar Bebidas" />
      <img
        className="imagem-explore"
        src="https://media.discordapp.net/attachments/879414910520533016/883100453339021312/telaExplorarDrinks.png"
        alt="foto do drink da Gabi Guerra no sextou"
      />
      <div className="button-container">
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
      </div>
      <Footer />
    </div>);
};

export default ExplorarBebidas;
