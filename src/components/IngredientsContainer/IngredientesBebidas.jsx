import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { limitRecipes, urlImageBebidas } from '../../constants';
import { BEBIDAS_BY_INGREDIENTS, BEBIDAS_INGREDIENTS } from '../../endPoints/bebidas';
import { arrayLimit } from '../../functions';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';
import fetchStaticBebidas from '../../redux/fetchs/fetchsBebidas/fetchStaticBebidas';
import RecipeCard from '../RecipeCard/RecipeCard';

const IngredientesBebidas = () => {
  const [ingrediente, setIngrediente] = useState('');
  const ingredientesBebidas = useSelector((state) => state.reducerBebidas.ingredientes);
  const history = useHistory();
  const dispatch = useDispatch();

  const getIngredients = useCallback(async () => {
    dispatch(fetchStaticBebidas(BEBIDAS_INGREDIENTS));
  }, [dispatch]);

  useEffect(() => { getIngredients(); }, [getIngredients]);

  const requestByIngredient = useCallback(async () => {
    if (!ingrediente) return;
    await dispatch(fetchBebidas(BEBIDAS_BY_INGREDIENTS(ingrediente)));
    history.push('/bebidas');
  }, [ingrediente, dispatch, history]);

  useEffect(() => { requestByIngredient(); }, [requestByIngredient]);

  if (!ingredientesBebidas.length) return <p>Loading...</p>;

  return (
    <div>
      {arrayLimit(ingredientesBebidas, limitRecipes).map(({ strIngredient1 }, index) => (
        <button
          onClick={ () => setIngrediente(strIngredient1) }
          key={ index }
          type="button"
        >
          <RecipeCard
            recipeName={ strIngredient1 }
            image={ `${urlImageBebidas}${strIngredient1}-Small.png` }
            index={ index }
            key={ index }
            page="ingredient"
          />
        </button>
      ))}
    </div>
  );
};

export default IngredientesBebidas;
