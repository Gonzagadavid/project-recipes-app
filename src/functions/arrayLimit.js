const arrayLimit = (array, init, end) => {
  const qty = end - init;
  const length = qty > array.length ? array.length : qty;
  const arrayQty = Array(length).fill(0);
  return arrayQty.map((_, index) => array[init + index]);
};

export default arrayLimit;
