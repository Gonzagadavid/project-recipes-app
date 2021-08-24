export const SET_COMIDAS = 'SET_COMIDAS';
export const ERROR_COMIDAS = 'ERROR_COMIDAS';
export const GET_COMIDAS_CATEGORIES = 'GET_COMIDAS_CATEGORIES';
export const GET_COMIDAS_BY_ID = 'GET_COMIDAS_BY_ID';
export const GET_COMIDAS_INGREDIENTS = 'GET_COMIDAS_INGREDIENTS';
export const GET_COMIDAS_AREAS = 'GET_COMIDAS_AREAS';

export const actionSetComidas = (state) => ({ type: SET_COMIDAS, state });

export const actionErrorComidas = (state) => ({ type: ERROR_COMIDAS, state });

export const actionComidasCategories = (state) => (
  { type: GET_COMIDAS_CATEGORIES, state }
);

export const actionComidasId = (state) => ({ type: GET_COMIDAS_BY_ID, state });

export const actionComidasIngredients = (state) => (
  { type: GET_COMIDAS_INGREDIENTS, state }
);

export const actionComidasAreas = (state) => ({ type: GET_COMIDAS_AREAS, state });
