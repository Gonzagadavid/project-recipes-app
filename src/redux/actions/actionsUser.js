export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_TOKEN_MEALS = 'SAVE_TOKEN_MEALS';
export const SAVE_TOKEN_DRINKS = 'SAVE_TOKEN_DRINKS';

export const actionEmail = (state) => ({ type: SAVE_EMAIL, state });

export const actionTokenMeals = (state) => ({ type: SAVE_TOKEN_MEALS, state });

export const actionTokenDrinks = (state) => ({ type: SAVE_TOKEN_DRINKS, state });
