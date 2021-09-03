import React, { useState } from 'react';
import { string } from 'prop-types';
import getLocalStorage from '../../services/localStorage/getLocalStorage';
import favoriteBlack from '../../images/blackHeartIcon.svg';
import favoriteWhite from '../../images/whiteHeartIcon.svg';
import addItemArrayLocalStorage
  from '../../services/localStorage/addItemArrayLocalStorage';
import removeItemArrayLocalStorage
  from '../../services/localStorage/removeItemArrayLocalStorage';

const FavoriteButton = ({
  idRecipe, type, area, category, alcoholicOrNot, name, image,
}) => {
  const objectSave = { id: idRecipe, type, area, category, alcoholicOrNot, name, image };
  const favorites = getLocalStorage('favoriteRecipes') || [];
  const favoriteInit = favorites.some(({ id }) => id === idRecipe);
  const [favorite, setFavorite] = useState(favoriteInit);

  const handlerFavorite = () => {
    const doneRecipes = getLocalStorage('doneRecipes') || [];
    const doneRecipe = doneRecipes.find(({ id }) => id === idRecipe);
    if (doneRecipe) {
      objectSave.doneDate = doneRecipe.doneDate;
      objectSave.tags = doneRecipe.tags;
    }
    setFavorite(!favorite);
    if (!favorite) return addItemArrayLocalStorage('favoriteRecipes', objectSave);
    removeItemArrayLocalStorage('favoriteRecipes', idRecipe);
  };

  return (
    <button type="button" onClick={ handlerFavorite }>
      <img
        src={ favorite ? favoriteBlack : favoriteWhite }
        alt="favorite icon"
        data-testid="favorite-btn"
      />
    </button>
  );
};

export default FavoriteButton;

FavoriteButton.propTypes = {
  idRecipe: string.isRequired,
  type: string.isRequired,
  area: string.isRequired,
  category: string,
  alcoholicOrNot: string.isRequired,
  name: string,
  image: string,
};

FavoriteButton.defaultProps = {
  category: '',
  name: '',
  image: '',
};
