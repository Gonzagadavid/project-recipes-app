import { ERROR_REQUISICAO } from '../constants';

const fetchApi = async (url) => {
  const respJson = await fetch(url);
  if (!respJson.ok) return { error: ERROR_REQUISICAO };
  const resp = await respJson.json();
  return resp;
};

export default fetchApi;
