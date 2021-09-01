import React, { useEffect, useState } from 'react';
import { HeaderWithoutSearch, CardReceitasFeitas } from '../../components';
import getLocalStorage from '../../services/localStorage/getLocalStorage';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipe] = useState([]);

  function getRecipeDone() {
    const recipe = getLocalStorage('doneRecipes') || [];
    setDoneRecipe(recipe);
  }

  function filterByMeal() {
    const recipes = getLocalStorage('doneRecipes') || [];
    const typeMeal = recipes.filter((recipe) => recipe.type === 'comida');
    setDoneRecipe(typeMeal);
  }

  function filterByDrink() {
    const recipes = getLocalStorage('doneRecipes') || [];
    const typeDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setDoneRecipe(typeDrink);
  }

  useEffect(() => {
    getRecipeDone();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch title="Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getRecipeDone }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByMeal }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drink
      </button>
      { doneRecipes && doneRecipes.map((recipe, index) => (
        <CardReceitasFeitas
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      )) }
    </div>
  );
}
export default ReceitasFeitas;
