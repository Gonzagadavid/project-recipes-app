const setLocalStorage = (key, item) => {
  const jsonItem = JSON.stringify(item);
  localStorage.setItem(key, jsonItem);
};

export default setLocalStorage;
