import {
  ERROR_COMIDAS, GET_COMIDAS_AREAS, GET_COMIDAS_BY_ID, GET_COMIDAS_CATEGORIES,
  GET_COMIDAS_INGREDIENTS, SET_COMIDAS,
} from '../actions/actionsComidas';

const INITIAL_STATE = {
  comidas: [],
  categorias: [],
  ingredientes: [],
  regioes: [],
  receita: {},
  error: '',
};

const reducerComidas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_COMIDAS:
    return { ...state, comidas: action.state, error: '' };

  case GET_COMIDAS_CATEGORIES:
    return { ...state, categorias: action.state, error: '' };

  case GET_COMIDAS_BY_ID:
    return { ...state, receita: action.state, error: '' };

  case GET_COMIDAS_INGREDIENTS:
    return { ...state, ingredientes: action.state, error: '' };

  case GET_COMIDAS_AREAS:
    return { ...state, regioes: action.state, error: '' };

  case ERROR_COMIDAS:
    return { ...state, error: action.state };

  default: return state;
  }
};

export default reducerComidas;
