import oneDrink from '../../../cypress/mocks/oneDrink';
import {
  soupMeals, oneMeal, ginDrinks, meals, drinks, mealCategories, drinkCategories,
  chickenMeals, cocktailDrinks,
} from './respMoks';

const fetchMock = async (url) => ({
  status: 200,
  ok: true,
  json: async () => {
    switch (url) {
    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Soup':
      return soupMeals;

    case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
      return oneMeal;

    case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine':
      return oneDrink;

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

    default: return { ...meals, ...drinks };
    }
  },
});

export default fetchMock;
