export const SET_BEBIDAS = 'SET_BEBIDAS_BY_NAME';
export const ERROR_BEBIDAS = 'ERROR_BEBIDAS';
export const GET_BEBIDAS_CATEGORIES = 'GET_BEBIDAS_CATEGORIES';
export const GET_BEBIDAS_BY_ID = 'GET_BEBIDAS_BY_ID';
export const GET_BEBIDAS_INGREDIENTS = 'GET_BEBIDAS_INGREDIENTS';

export const actionSetBebidas = (state) => ({ type: SET_BEBIDAS, state });

export const actionErrorBebidas = (state) => ({ type: ERROR_BEBIDAS, state });

export const actionBebidasCategories = (state) => (
  { type: GET_BEBIDAS_CATEGORIES, state }
);

export const actionBebidasId = (state) => ({ type: GET_BEBIDAS_BY_ID, state });

export const actionBebidasIngredients = (state) => (
  { type: GET_BEBIDAS_INGREDIENTS, state }
);
