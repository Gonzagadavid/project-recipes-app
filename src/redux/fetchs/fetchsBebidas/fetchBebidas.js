import { N_FOUND } from '../../../constants';
import fetchApi from '../../../services/fetchApi';
import { actionErrorBebidas, actionSetBebidas } from '../../actions/actionsBebidas';

const fetchBebidas = (endPoint) => async (dispatch) => {
  const { drinks, error } = await fetchApi(endPoint);

  if (error) return dispatch(actionErrorBebidas(error));

  if (drinks === null) return global.alert(N_FOUND);

  dispatch(actionSetBebidas(drinks));
};

export default fetchBebidas;
