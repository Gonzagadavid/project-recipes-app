import { SAVE_EMAIL, SAVE_TOKEN_DRINKS, SAVE_TOKEN_MEALS } from '../actions/actionsUser';

const INITIAL_STATE = {
  email: '',
  mealsToken: '',
  cocktailsToken: '',
};

const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.state };

  case SAVE_TOKEN_DRINKS:
    return { ...state, cocktailsToken: action.state };

  case SAVE_TOKEN_MEALS:
    return { ...state, mealsToken: action.state };

  default: return state;
  }
};

export default reducerUser;
