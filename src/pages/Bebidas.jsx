import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { BEBIDAS_BY_NAME } from '../endPoints/bebidas';
import { arrayLimit } from '../functions';
import fetchBebidas from '../redux/fetchs/fetchsBebidas/fetchBebidas';

const Bebidas = () => {
  const recipesBebidas = useSelector((state) => state.reducerBebidas.bebidas);
  const dispatch = useDispatch();
  const limit = 11;

  useEffect(() => { dispatch(fetchBebidas(BEBIDAS_BY_NAME(''))); }, [dispatch]);

  if (!recipesBebidas.length) return <p>Loading...</p>;
  return (
    <div>
      <Header title="Bebidas" />
      <div>
        {arrayLimit(recipesBebidas, 0, limit).map(({
          strDrink, strDrinkThumb, strInstructions,
        }, index) => (
          <RecipeCard
            recipeName={ strDrink }
            image={ strDrinkThumb }
            recipeText={ strInstructions }
            index={ index }
            key={ index }
          />
        ))}
      </div>
    </div>

  );
};

export default Bebidas;
