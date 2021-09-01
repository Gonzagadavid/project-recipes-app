import { FIRST_LETTER, INGREDIENTS, NAME } from '../constants';
import {
  COMIDAS_BY_INGREDIENTS, COMIDAS_BY_LETTER, COMIDAS_BY_NAME,
} from '../endPoints/comidas';

const filterComidas = (filter) => {
  switch (filter) {
  case INGREDIENTS:
    return COMIDAS_BY_INGREDIENTS;

  case NAME:
    return COMIDAS_BY_NAME;

  case FIRST_LETTER:
    return COMIDAS_BY_LETTER;

  default: return 'filtro inválido';
  }
};

export default filterComidas;
