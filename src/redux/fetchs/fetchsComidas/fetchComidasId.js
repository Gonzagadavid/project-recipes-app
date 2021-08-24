import fetchApi from '../../../services/fetchApi';
import { actionComidasId, actionErrorComidas } from '../../actions/actionsComidas';

const fetchComidasId = (id) => async (dispatch) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals, error } = await fetchApi(url);

  if (error) return dispatch(actionErrorComidas(error));

  dispatch(actionComidasId(meals[0]));
};

export default fetchComidasId;
