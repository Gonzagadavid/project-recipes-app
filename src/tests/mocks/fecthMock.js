import oneDrink from '../../../cypress/mocks/oneDrink';
import {
  soupMeals, oneMeal, ginDrinks, meals, drinks, mealCategories, drinkCategories,
  chickenMeals, cocktailDrinks, drinkIngredients, mealIngredients,
} from './respMoks';

const checkUrl = (url) => (
  url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=ERROR'
  || url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ERROR'
);

const fetchMock = async (url) => {
  if (checkUrl(url)) return { status: 404, ok: false };

  return ({
    status: 200,
    ok: true,
    json: async () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
        || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
        || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      ) return oneMeal;

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
        || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
        || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      ) return oneDrink;

      switch (url) {
      case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Soup':
        return soupMeals;

      case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin':
        return ginDrinks;

      case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
        return mealCategories;

      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
        return drinkCategories;

      case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken':
        return chickenMeals;

      case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail':
        return cocktailDrinks;

      case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list':
        return drinkIngredients;

      case 'https://www.themealdb.com/api/json/v1/1/list.php?i=list':
        return mealIngredients;

      default: return { ...meals, ...drinks };
      }
    },
  });
};

export default fetchMock;
