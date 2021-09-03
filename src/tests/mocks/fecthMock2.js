import oneDrink from '../../../cypress/mocks/oneDrink';
import { oneMeal, meals, drinks, areas } from './respMoks';

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
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') return areas;

      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
        || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
        || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      ) return oneMeal;

      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
        || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
        || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      ) return oneDrink;

      return { ...meals, ...drinks };
    },
  });
};

export default fetchMock;
