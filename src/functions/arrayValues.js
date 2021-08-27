const arrayValues = (object, strKey) => {
  const keys = Object.keys(object);
  const keysFilter = keys.filter((key) => key.includes(strKey));
  const values = keysFilter
    .map((key) => object[key])
    .filter((item) => item);

  return values;
};

export default arrayValues;
