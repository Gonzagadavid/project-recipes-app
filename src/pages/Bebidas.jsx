import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import { BEBIDAS_BY_NAME } from '../endPoints/bebidas';
import { arrayLimit } from '../functions';
import fetchBebidas from '../redux/fetchs/fetchsBebidas/fetchBebidas';

const Bebidas = () => {
  const recipesBebidas = useSelector((state) => state.reducerBebidas.bebidas);
  const dispatch = useDispatch();
  const limit = 12;

  useEffect(() => { dispatch(fetchBebidas(BEBIDAS_BY_NAME(''))); }, [dispatch]);

  if (!recipesBebidas.length) return <p>Loading...</p>;
  return (
    <div>
      <Header title="Bebidas" />
      <CategoryButton />
      <div>
        {arrayLimit(recipesBebidas, 0, limit).map(({
          idDrink, strDrink, strDrinkThumb, strInstructions,
        }, index) => (
          <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
            <RecipeCard
              recipeName={ strDrink }
              image={ strDrinkThumb }
              recipeText={ strInstructions }
              index={ index }
              key={ index }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>

  );
};

export default Bebidas;
