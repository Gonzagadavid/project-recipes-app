import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { COPIED } from '../../constants';
import fetchBebidasId from '../../redux/fetchs/fetchsBebidas/fetchBebidasId';
import fetchComidasId from '../../redux/fetchs/fetchsComidas/fetchComidasId';
import Message from '../Message/Message';
import CheckList from './CheckList';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import ShareButton from '../ShareButton/ShareButton';
import ButtonRedirect from '../ButtonRedirect/ButtonRedirect';
import addItemArrayLocalStorage
  from '../../services/localStorage/addItemArrayLocalStorage';

function RecipeMain({ match }) {
  const { params: { id } } = match;
  const { pathname } = useLocation();
  const type = /bebidas/g.test(pathname);
  const [copied, setCopied] = useState();
  const dispatch = useDispatch();
  const receitaBebida = useSelector((state) => state.reducerBebidas.bebida);
  const receitaComida = useSelector((state) => state.reducerComidas.receita);
  const [finish, setFinish] = useState(false);
  const recipe = type ? receitaBebida : receitaComida;
  const fetchRequest = type ? fetchBebidasId : fetchComidasId;
  const tipo = type ? 'Drink' : 'Meal';

  useEffect(() => {
    dispatch(fetchRequest(id));
  }, [fetchRequest, dispatch, id]);

  const handlerClick = () => {
    const saveDone = {
      id,
      type: type ? 'bebida' : 'comida',
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${tipo}`],
      image: recipe[`str${tipo}Thumb`],
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };
    addItemArrayLocalStorage('doneRecipes', saveDone);
  };

  return (
    <div>
      {copied && <Message msg={ COPIED } />}
      <img
        src={ recipe[`str${tipo}Thumb`] }
        alt="Prato do dia"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">
        { recipe[`str${tipo}`] }
      </h1>
      <span data-testid="recipe-category">{ recipe.strCategory}</span>
      <div>
        <ShareButton
          ext={ `/${type ? 'bebidas' : 'comidas'}/${id}` }
          id="share-btn"
          setCopied={ setCopied }
        />
        <FavoriteButton
          idRecipe={ id }
          type={ type ? 'bebida' : 'comida' }
          area={ recipe.strArea || '' }
          category={ recipe.strCategory }
          alcoholicOrNot={ recipe.strAlcoholic || '' }
          name={ recipe[`str${tipo}`] }
          image={ recipe[`str${tipo}Thumb`] }
        />
      </div>
      <h3>Ingredients</h3>
      <CheckList
        recipesFavorite={ recipe }
        id={ id }
        finish={ setFinish }
      />
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <ButtonRedirect
        to="/receitas-feitas"
        btnText="Finalizar receita"
        id="finish-recipe-btn"
        data-testid={ id }
        disabled={ !finish }
        onClick={ handlerClick }
      />
    </div>
  );
}

export default RecipeMain;

RecipeMain.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
};
