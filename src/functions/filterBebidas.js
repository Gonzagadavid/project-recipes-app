import { FIRST_LETTER, INGREDIENTS, NAME } from '../constants';
import {
  BEBIDAS_BY_INGREDIENTS, BEBIDAS_BY_LETTER, BEBIDAS_BY_NAME,
} from '../endPoints/bebidas';

const filterBebidas = (filter) => {
  switch (filter) {
  case INGREDIENTS:
    return BEBIDAS_BY_INGREDIENTS;

  case NAME:
    return BEBIDAS_BY_NAME;

  case FIRST_LETTER:
    return BEBIDAS_BY_LETTER;

  default: return 'filtro inválido';
  }
};

export default filterBebidas;
