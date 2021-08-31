import React, { useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { BEBIDAS_BY_INGREDIENTS, BEBIDAS_INGREDIENTS } from '../../endPoints/bebidas';
import { COMIDAS_BY_INGREDIENTS, COMIDAS_INGREDIENTS } from '../../endPoints/comidas';
import { arrayLimit } from '../../functions';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';
import fetchStaticBebidas from '../../redux/fetchs/fetchsBebidas/fetchStaticBebidas';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import fetchStaticComida from '../../redux/fetchs/fetchsComidas/fetchStaticComidas';
import RecipeCard from '../RecipeCard/RecipeCard';

const IngredientesContainer = () => {
  const [ingrediente, setIngrediente] = useState('');
  const ingredientesComidas = useSelector((state) => state.reducerComidas.ingredientes);
  const ingredientesBebidas = useSelector((state) => state.reducerBebidas.ingredientes);
  const { pathname } = useLocation();
  const history = useHistory();
  const bebidas = /bebidas/g.test(pathname);
  const ingredientes = bebidas ? ingredientesBebidas : ingredientesComidas;
  const keyName = bebidas ? 'strIngredient1' : 'strIngredient';
  const urlImage = bebidas ? 'https://www.thecocktaildb.com/images/ingredients/'
    : 'https://www.themealdb.com/images/ingredients/';
  const dispatch = useDispatch();
  const fetchRequest = bebidas ? fetchBebidas : fetchComidas;
  const endpoint = bebidas ? BEBIDAS_BY_INGREDIENTS : COMIDAS_BY_INGREDIENTS;
  const link = bebidas ? '/bebidas' : '/comidas';
  const limit = 12;

  const getIngredients = useCallback(async () => {
    if (bebidas) return dispatch(fetchStaticBebidas(BEBIDAS_INGREDIENTS));
    dispatch(fetchStaticComida(COMIDAS_INGREDIENTS));
  }, [dispatch, bebidas]);

  useEffect(() => { getIngredients(); }, [getIngredients]);

  const requestByIngredient = useCallback(async () => {
    if (!ingrediente) return;
    await dispatch(fetchRequest(endpoint(ingrediente)));
    history.push(link);
  }, [ingrediente, dispatch, endpoint, fetchRequest, history, link]);

  useEffect(() => { requestByIngredient(); }, [requestByIngredient]);

  if (!ingredientes.length) return <p>Loading...</p>;

  return (
    <div>
      {arrayLimit(ingredientes, 0, limit).map((item, index) => (
        <button
          onClick={ () => setIngrediente(item[keyName]) }
          key={ index }
          type="button"
        >
          <RecipeCard
            recipeName={ item[keyName] }
            image={ `${urlImage}${item[keyName]}-Small.png` }
            index={ index }
            key={ index }
            page="ingredient"
          />
        </button>
      ))}
    </div>
  );
};

export default IngredientesContainer;
