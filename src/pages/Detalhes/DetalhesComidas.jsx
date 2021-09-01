import { shape, string } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IngredientsList, Recomendations, ButtonRedirect, FavoriteButton, Message,
  ShareButton, Video,
} from '../../components';
import { INITIAL_PROGRESS_RECIPE, COPIED } from '../../constants';
import fetchComidasId from '../../redux/fetchs/fetchsComidas/fetchComidasId';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import './Detalhes.css';

const DetalhesComidas = ({ match }) => {
  const { params: { id } } = match;
  const dispatch = useDispatch();
  const receita = useSelector((state) => state.reducerComidas.receita);
  const loading = !Object.keys(receita).length;
  const recipesInProgress = getLocalStorage('inProgressRecipes')
  || INITIAL_PROGRESS_RECIPE;
  const inProgress = Object.keys(recipesInProgress.meals).includes(id);
  const btnText = inProgress ? 'Continuar Receita' : 'Iniciar Receita';
  const doneRecipesIds = getLocalStorage('doneRecipes') || [];
  const done = !doneRecipesIds.some(({ id: idDone }) => idDone === id);
  const path = `/comidas/${id}/in-progress`;
  const [copied, setCopied] = useState(false);

  const getRecipe = useCallback(async () => {
    dispatch(fetchComidasId(id));
  }, [dispatch, id]);

  useEffect(() => { getRecipe(); }, [getRecipe]);

  if (loading) return <p>loading...</p>;

  const {
    strMealThumb, strMeal, strCategory, strInstructions, strYoutube, strArea,
  } = receita;
  return (
    <div>
      {copied && <Message msg={ COPIED } />}
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <p data-testid="recipe-category">{strCategory}</p>
      <img src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <ShareButton
        ext={ `/comidas/${id}` }
        id="share-btn"
        setCopied={ setCopied }
      />
      <FavoriteButton
        idRecipe={ id }
        type="comida"
        area={ strArea }
        category={ strCategory }
        alcoholicOrNot=""
        name={ strMeal }
        image={ strMealThumb }
      />
      <IngredientsList recipe={ receita } />
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <Video strYoutube={ strYoutube } strMeal={ strMeal } />
      <Recomendations />
      {done && <ButtonRedirect to={ path } btnText={ btnText } id="start-recipe-btn" />}
    </div>
  );
};

export default DetalhesComidas;

DetalhesComidas.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};
