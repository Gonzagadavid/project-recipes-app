const fetchApi = async (url) => {
  const respJson = await fetch(url);
  if (!respJson.ok) return { error: `Ocorreu um erro na requisição ${url}` };
  const resp = await respJson.json();
  return resp;
};

export default fetchApi;
