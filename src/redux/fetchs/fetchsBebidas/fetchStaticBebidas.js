import { BEBIDAS_CATEGORIES, BEBIDAS_INGREDIENTS } from '../../../endPoints/bebidas';
import fetchApi from '../../../services/fetchApi';
import {
  actionBebidasCategories, actionBebidasIngredients, actionErrorBebidas,
} from '../../actions/actionsBebidas';

const fetchStaticBebidas = (endPoint) => async (dispatch) => {
  const { drinks, error } = await fetchApi(endPoint);

  if (error) return dispatch(actionErrorBebidas(error));

  switch (endPoint) {
  case BEBIDAS_INGREDIENTS: return dispatch(actionBebidasIngredients(drinks));

  case BEBIDAS_CATEGORIES: return dispatch(actionBebidasCategories(drinks));

  default: dispatch(actionErrorBebidas('url invalida'));
  }
};

export default fetchStaticBebidas;
