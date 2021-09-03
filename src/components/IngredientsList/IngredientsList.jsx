import { objectOf, string } from 'prop-types';
import React from 'react';
import { arrayValues } from '../../functions';

const IngredientsList = ({ recipe }) => {
  const ingredients = arrayValues(recipe, 'strIngredient');
  const measures = arrayValues(recipe, 'strMeasure');
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} ${measures[index] || ''}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;

IngredientsList.propTypes = {
  recipe: objectOf(string).isRequired,
};
