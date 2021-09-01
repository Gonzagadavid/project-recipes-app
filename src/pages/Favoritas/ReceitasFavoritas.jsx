import React, { useEffect, useState } from 'react';
import { FavoriteRecipeCard, HeaderWithoutSearch } from '../../components';
import getLocalStorage from '../../services/localStorage/getLocalStorage';

function ReceitasFavoritas() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  function getFavoriteRecipes() {
    const recipes = getLocalStorage('favoriteRecipes');
    setFavoriteRecipe(recipes);
  }

  function filterByMeal() {
    const recipes = getLocalStorage('favoriteRecipes');
    const favoriteMeal = recipes.filter((recipe) => recipe.type === 'comida');
    setFavoriteRecipe(favoriteMeal);
  }

  function filterByDrink() {
    const recipes = getLocalStorage('favoriteRecipes');
    const favoriteDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setFavoriteRecipe(favoriteDrink);
  }

  function removeFavorite(id) {
    const recipes = getLocalStorage('favoriteRecipes');
    const newFavRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setFavoriteRecipe(newFavRecipes);
  }

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getFavoriteRecipes }
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
      { favoriteRecipe && favoriteRecipe.map((recipe, index) => (
        <FavoriteRecipeCard
          key={ index }
          index={ index }
          recipe={ recipe }
          removeFavorite={ removeFavorite }
        />
      )) }
    </div>
  );
}

export default ReceitasFavoritas;
