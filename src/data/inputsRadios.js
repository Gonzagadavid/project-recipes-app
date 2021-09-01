import { FIRST_LETTER, INGREDIENTS, NAME } from '../constants';

const inputsRadios = [
  {
    labelText: 'Ingrediente',
    id: 'ingredient-search-radio',
    params: INGREDIENTS,
  },
  {
    labelText: 'Nome',
    id: 'name-search-radio',
    params: NAME,
  },
  {
    labelText: 'Primeira letra',
    id: 'first-letter-search-radio',
    params: FIRST_LETTER,
  },
];

export default inputsRadios;
