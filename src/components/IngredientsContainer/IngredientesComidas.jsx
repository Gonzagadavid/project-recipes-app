import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { limitRecipes, urlImageComidas } from '../../constants';
import { COMIDAS_BY_INGREDIENTS, COMIDAS_INGREDIENTS } from '../../endPoints/comidas';
import { arrayLimit } from '../../functions';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import fetchStaticComida from '../../redux/fetchs/fetchsComidas/fetchStaticComidas';
import RecipeCard from '../RecipeCard/RecipeCard';

const IngredientesComidas = () => {
  const [ingrediente, setIngrediente] = useState('');
  const ingredientesComidas = useSelector((state) => state.reducerComidas.ingredientes);
  const history = useHistory();
  const dispatch = useDispatch();

  const getIngredients = useCallback(async () => {
    dispatch(fetchStaticComida(COMIDAS_INGREDIENTS));
  }, [dispatch]);

  const requestByIngredient = useCallback(async () => {
    if (!ingrediente) return;
    await dispatch(fetchComidas(COMIDAS_BY_INGREDIENTS(ingrediente)));
    history.push('/comidas');
  }, [ingrediente, dispatch, history]);

  useEffect(() => { getIngredients(); }, [getIngredients]);

  useEffect(() => { requestByIngredient(); }, [requestByIngredient]);

  if (!ingredientesComidas.length) return <p>Loading...</p>;

  return (
    <div>
      {arrayLimit(ingredientesComidas, limitRecipes).map(({ strIngredient }, index) => (
        <button
          onClick={ () => setIngrediente(strIngredient) }
          key={ index }
          type="button"
        >
          <RecipeCard
            recipeName={ strIngredient }
            image={ `${urlImageComidas}${strIngredient}-Small.png` }
            index={ index }
            key={ index }
            page="ingredient"
          />
        </button>
      ))}
    </div>
  );
};

export default IngredientesComidas;
