import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { COMIDAS_BY_NAME } from '../endPoints/comidas';
import { arrayLimit } from '../functions';
import fetchComidas from '../redux/fetchs/fetchsComidas/fetchComidas';

const Comidas = () => {
  const recipesComidas = useSelector((state) => state.reducerComidas.comidas);
  const dispatch = useDispatch();
  const limit = 11;

  useEffect(() => { dispatch(fetchComidas(COMIDAS_BY_NAME(''))); }, [dispatch]);

  if (!recipesComidas.length) return <p>Loading...</p>;
  return (
    <div>
      <Header title="Comidas" />
      <div>
        {arrayLimit(recipesComidas, 0, limit).map(({
          strMeal, strMealThumb, strInstructions,
        }, index) => (
          <RecipeCard
            recipeName={ strMeal }
            image={ strMealThumb }
            recipeText={ strInstructions }
            index={ index }
            key={ index }
          />
        ))}
      </div>
    </div>

  );
};

export default Comidas;
