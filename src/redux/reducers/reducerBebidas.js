import {
  ERROR_BEBIDAS, GET_BEBIDAS_BY_ID, GET_BEBIDAS_CATEGORIES,
  GET_BEBIDAS_INGREDIENTS, SET_BEBIDAS,
} from '../actions/actionsBebidas';

const INITIAL_STATE = {
  bebidas: [],
  categorias: [],
  ingredientes: [],
  bebida: {},
  error: '',
};

const reducerBebidas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_BEBIDAS:
    return { ...state, bebidas: action.state, error: '' };

  case GET_BEBIDAS_CATEGORIES:
    return { ...state, categorias: action.state, error: '' };

  case GET_BEBIDAS_BY_ID:
    return { ...state, bebida: action.state, error: '' };

  case GET_BEBIDAS_INGREDIENTS:
    return { ...state, ingredientes: action.state, error: '' };

  case ERROR_BEBIDAS:
    return { ...state, error: action.state };

  default: return state;
  }
};

export default reducerBebidas;
