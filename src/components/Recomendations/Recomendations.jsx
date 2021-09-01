import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { limitRecomendations } from '../../constants';
import { BEBIDAS_BY_NAME } from '../../endPoints/bebidas';
import { COMIDAS_BY_NAME } from '../../endPoints/comidas';
import { arrayLimit } from '../../functions';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import './Recomendation.css';

const Recomendations = () => {
  const { pathname } = useLocation();
  const bebidasPath = /bebidas/g.test(pathname);
  const recipesBebidas = useSelector((state) => state.reducerBebidas.bebidas);
  const recipesComidas = useSelector((state) => state.reducerComidas.comidas);
  const recipes = bebidasPath ? recipesComidas : recipesBebidas;
  const fetchRequest = bebidasPath ? fetchComidas : fetchBebidas;
  const endPoint = bebidasPath ? COMIDAS_BY_NAME : BEBIDAS_BY_NAME;
  const dispatch = useDispatch();
  const imgSrc = bebidasPath ? 'Meal' : 'Drink';

  useEffect(() => {
    dispatch(fetchRequest(endPoint('')));
  }, [dispatch, endPoint, fetchRequest]);

  if (!recipes.length) return <p>loading...</p>;
  return (
    <div className="Recomendation">
      {arrayLimit(recipes, limitRecomendations).map((recipe, index) => (
        <div data-testid={ `${index}-recomendation-card` } key={ index } className="card">
          <h3 data-testid={ `${index}-recomendation-title` }>
            {recipe[`str${imgSrc}`] }
          </h3>
          <img src={ recipe[`str${imgSrc}Thumb`] } alt={ recipe[`str${imgSrc}`] } />
        </div>
      ))}
    </div>
  );
};

export default Recomendations;
