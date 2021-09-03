import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../ShareButton/ShareButton';
import { COPIED } from '../../constants';
import './CardReceitasFeitas.css';
import Message from '../Message/Message';

function CardReceitasFeitas({ index, recipe }) {
  const [mealOrDrink, setMealOrDrink] = useState(false);
  const [clipboard, setClipboard] = useState(false);

  useEffect(() => {
    if (recipe.alcoholicOrNot === '') {
      setMealOrDrink(true);
    }
  }, [recipe.alcoholicOrNot]);

  return (
    <div>
      <Link to={ mealOrDrink ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
          className="recipe-card-img"
        />
      </Link>
      <div>
        {mealOrDrink ? (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${recipe.area} - ${recipe.category}`}
          </p>
        ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.alcoholicOrNot}</p>
        ) }
        <Link to={ mealOrDrink ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <ShareButton
          ext={ `/${recipe.type}s/${recipe.id}` }
          setCopied={ setClipboard }
          id={ `${index}-horizontal-share-btn` }
        />
        { clipboard && <Message msg={ COPIED } /> }
        {recipe.tags.map((tagName, i) => (
          <p
            key={ i }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>))}
      </div>
    </div>
  );
}

export default CardReceitasFeitas;
CardReceitasFeitas.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    doneDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
