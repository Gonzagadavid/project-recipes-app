import getLocalStorage from './getLocalStorage';
import setLocalStorage from './setLocalStorage';

const removeItemArrayLocalStorage = (key, idItem) => {
  const array = getLocalStorage(key);
  const newArray = array.filter(({ id }) => id !== idItem);
  setLocalStorage(key, newArray);
};

export default removeItemArrayLocalStorage;
