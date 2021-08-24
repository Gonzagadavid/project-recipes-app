import fetchApi from '../../../services/fetchApi';
import { actionErrorComidas, actionSetComidas } from '../../actions/actionsComidas';

const fetchComidas = (endPoint) => async (dispatch) => {
  const { meals, error } = await fetchApi(endPoint);

  if (error) return dispatch(actionErrorComidas(error));

  dispatch(actionSetComidas(meals));
};

export default fetchComidas;
