import {
  COMIDAS_AREAS, COMIDAS_CATEGORIES, COMIDAS_INGREDIENTS,
} from '../../../endPoints/comidas';
import fetchApi from '../../../services/fetchApi';
import {
  actionComidasAreas, actionComidasCategories, actionComidasIngredients,
  actionErrorComidas,
} from '../../actions/actionsComidas';

const fetchStaticComida = (endPoint) => async (dispatch) => {
  const { meals, error } = await fetchApi(endPoint);

  if (error) return dispatch(actionErrorComidas(error));

  switch (endPoint) {
  case COMIDAS_AREAS: return dispatch(actionComidasAreas(meals));

  case COMIDAS_CATEGORIES: return dispatch(actionComidasCategories(meals));

  case COMIDAS_INGREDIENTS: return dispatch(actionComidasIngredients(meals));

  default: dispatch(actionErrorComidas('url invalida'));
  }
};

export default fetchStaticComida;
