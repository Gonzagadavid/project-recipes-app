import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/Header/HeaderWithoutSearch';
import Footer from '../../components/Footer/Footer';
import { COMIDAS_RAMDOM } from '../../endPoints/comidas';
import fetchApi from '../../services/fetchApi';

function ExplorarComidas() {
  const history = useHistory();
  const handlerClick = async () => {
    const { meals: [{ idMeal }] } = await fetchApi(COMIDAS_RAMDOM);
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      <HeaderWithoutSearch title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      {/* <Link to={ `/comidas/${id}` }> */}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handlerClick() }
      >
        Me Surpreenda!
      </button>
      {/* </Link> */}
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
