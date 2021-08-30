export const COMIDAS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const COMIDAS_AREAS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

export const COMIDAS_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const COMIDAS_RAMDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const COMIDAS_BY_NAME = (name = '') => `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

export const COMIDAS_BY_LETTER = (letter = '') => `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;

export const COMIDAS_BY_CATEGORY = (category = '') => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
);

export const COMIDAS_BY_AREA = (area = '') => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
);

export const COMIDAS_BY_INGREDIENTS = (ingredient = '') => (
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
);
