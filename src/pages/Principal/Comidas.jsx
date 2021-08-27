import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryButton from '../../components/CategoryButton/CategoryButton';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { COMIDAS_BY_NAME } from '../../endPoints/comidas';
import { arrayLimit } from '../../functions';
import fetchComidas from '../../redux/fetchs/fetchsComidas/fetchComidas';

const Comidas = () => {
  const recipesComidas = useSelector((state) => state.reducerComidas.comidas);
  const dispatch = useDispatch();
  const limit = 12;

  useEffect(() => { dispatch(fetchComidas(COMIDAS_BY_NAME(''))); }, [dispatch]);

  if (!recipesComidas.length) return <p>Loading...</p>;
  return (
    <div>
      <Header title="Comidas" />
      <CategoryButton />
      <div>
        {arrayLimit(recipesComidas, 0, limit).map(({
          idMeal, strMeal, strMealThumb, strInstructions,
        }, index) => (
          <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
            <RecipeCard
              recipeName={ strMeal }
              image={ strMealThumb }
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

export default Comidas;
