const { arrayValues } = require('../../functions');
const { oneMeal, oneDrink } = require('../mocks/respMoks');

export const comidaIngredientes = arrayValues(oneMeal.meals[0], 'strIngredient');

export const comidaMedidas = arrayValues(oneMeal.meals[0], 'strMeasure');

export const bebidaIngredientes = arrayValues(oneDrink.drinks[0], 'strIngredient');

export const bebidaMedidas = arrayValues(oneDrink.drinks[0], 'strMeasure');
