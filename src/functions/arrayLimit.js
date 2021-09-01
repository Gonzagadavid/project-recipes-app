const arrayLimit = (array, limit) => {
  const qty = limit;
  const length = qty > array.length ? array.length : qty;
  const arrayQty = Array(length).fill(0);
  return arrayQty.map((_, index) => array[index]);
};

export default arrayLimit;
