import React, { useCallback, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  IngredientsList, Recomendations, ButtonRedirect, FavoriteButton, Message, ShareButton,
} from '../../components';
import fetchBebidasId from '../../redux/fetchs/fetchsBebidas/fetchBebidasId';
import './Detalhes.css';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import { COPIED, INITIAL_PROGRESS_RECIPE } from '../../constants';

const DetalhesBebidas = ({ match }) => {
  const { params: { id } } = match;
  const dispatch = useDispatch();
  const receita = useSelector((state) => state.reducerBebidas.bebida);
  const loading = !Object.keys(receita).length;
  const recipesInProgress = getLocalStorage('inProgressRecipes')
  || INITIAL_PROGRESS_RECIPE;
  const inProgress = Object.keys(recipesInProgress.cocktails).includes(id);
  const btnText = inProgress ? 'Continuar Receita' : 'Iniciar Receita';
  const doneRecipesIds = (getLocalStorage('doneRecipes') || []);
  const done = !doneRecipesIds.some(({ id: idDone }) => idDone === id);
  const path = `/bebidas/${id}/in-progress`;
  const [copied, setCopied] = useState(false);

  const getRecipe = useCallback(async () => {
    dispatch(fetchBebidasId(id));
  }, [dispatch, id]);

  useEffect(() => { getRecipe(); }, [getRecipe]);

  if (loading) return <p>loading...</p>;

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strCategory } = receita;

  return (
    <div>
      {copied && <Message msg={ COPIED } />}
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <img src={ strDrinkThumb } data-testid="recipe-photo" alt={ strDrink } />
      <ShareButton
        ext={ `/bebidas/${id}` }
        id="share-btn"
        setCopied={ setCopied }
      />
      <FavoriteButton
        idRecipe={ id }
        type="bebida"
        area=""
        category={ strCategory }
        alcoholicOrNot={ strAlcoholic }
        name={ strDrink }
        image={ strDrinkThumb }
      />
      <IngredientsList recipe={ receita } />
      <h3>Instructions</h3>
      <p data-testid="instructions">{strInstructions}</p>
      <Recomendations />
      {done && <ButtonRedirect to={ path } btnText={ btnText } id="start-recipe-btn" />}
    </div>
  );
};

export default DetalhesBebidas;

DetalhesBebidas.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};
