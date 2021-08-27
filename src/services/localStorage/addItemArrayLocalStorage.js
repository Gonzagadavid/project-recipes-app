import getLocalStorage from './getLocalStorage';
import setLocalStorage from './setLocalStorage';

const addItemArrayLocalStorage = (key, item) => {
  const array = getLocalStorage(key) || [];
  const newArray = [...array, item];
  setLocalStorage(key, newArray);
};

export default addItemArrayLocalStorage;
