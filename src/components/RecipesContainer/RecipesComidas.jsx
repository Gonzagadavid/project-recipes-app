import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { COMIDAS_BY_NAME } from '../../endPoints/comidas';
import { arrayLimit } from '../../functions';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipesComidas = () => {
  const recipesComidas = useSelector((state) => state.reducerComidas.comidas);
  const dispatch = useDispatch();
  const limit = 12;

  useEffect(() => {
    if (recipesComidas.length) return;
    dispatch(fetchComidas(COMIDAS_BY_NAME('')));
  }, [dispatch, recipesComidas]);

  if (!recipesComidas.length) return <p>Loading...</p>;

  return (
    <div>
      {arrayLimit(recipesComidas, 0, limit).map(({
        idMeal, strMeal, strMealThumb,
      }, index) => (
        <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
          <RecipeCard
            recipeName={ strMeal }
            image={ strMealThumb }
            index={ index }
            key={ index }
            page="recipe"
          />
        </Link>
      ))}
    </div>
  );
};

export default RecipesComidas;
