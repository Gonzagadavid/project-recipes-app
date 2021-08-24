import fetchApi from '../../../services/fetchApi';
import { actionBebidasId, actionErrorBebidas } from '../../actions/actionsBebidas';

const fetchBebidasId = (id) => async (dispatch) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks, error } = await fetchApi(url);

  if (error) return dispatch(actionErrorBebidas(error));

  dispatch(actionBebidasId(drinks[0]));
};

export default fetchBebidasId;
