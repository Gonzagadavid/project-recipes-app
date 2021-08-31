import { number, string } from 'prop-types';
import React from 'react';

const RecipeCard = ({ recipeName, image, index, page }) => (
  <div data-testid={ `${index}-${page}-card` }>
    <h3 data-testid={ `${index}-card-name` }>{recipeName}</h3>
    <img
      data-testid={ `${index}-card-img` }
      src={ image }
      alt={ `${recipeName} finished` }
      width="200px"
    />
  </div>
);

export default RecipeCard;

RecipeCard.propTypes = {
  recipeName: string.isRequired,
  image: string.isRequired,
  page: string.isRequired,
  index: number.isRequired,
};
