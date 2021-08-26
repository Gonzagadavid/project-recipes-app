export const BEBIDAS_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const BEBIDAS_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const BEBIDAS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const BEBIDAS_BY_NAME = (name) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
);

export const BEBIDAS_BY_LETTER = (letter) => (
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
);

export const BEBIDAS_BY_INGREDIENTS = (ingredient) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

export const BEBIDAS_BY_CATEGORY = (category) => (
  `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
);

export const BEBIDAS_BY_ID = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
