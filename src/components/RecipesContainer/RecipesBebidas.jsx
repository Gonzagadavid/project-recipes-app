import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BEBIDAS_BY_NAME } from '../../endPoints/bebidas';
import { arrayLimit } from '../../functions';
import fetchBebidas from '../../redux/fetchs/fetchsBebidas/fetchBebidas';

import RecipeCard from '../RecipeCard/RecipeCard';

const RecipesBebidas = () => {
  const recipesBebidas = useSelector((state) => state.reducerBebidas.bebidas);
  const dispatch = useDispatch();
  const limit = 12;

  useEffect(() => {
    if (recipesBebidas.length) return;
    dispatch(fetchBebidas(BEBIDAS_BY_NAME('')));
  }, [dispatch, recipesBebidas]);

  if (!recipesBebidas.length) return <p>Loading...</p>;
  return (
    <div>
      {arrayLimit(recipesBebidas, 0, limit).map(({
        idDrink, strDrink, strDrinkThumb,
      }, index) => (
        <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
          <RecipeCard
            recipeName={ strDrink }
            image={ strDrinkThumb }
            index={ index }
            key={ index }
            page="recipe"
          />
        </Link>
      ))}
    </div>
  );
};
export default RecipesBebidas;
