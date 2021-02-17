export const formatNumber = (
  num: number,
  decimals: number,
  dec_point = ".",
  thousands_sep = ","
): string | number => {
  const number = !isFinite(+num) ? 0 : +num;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);

  const toFixedFix = (n: number, p: number) => {
    const k = Math.pow(10, p);
    return Math.round(n * k) / k;
  };

  const array = (prec ? toFixedFix(number, prec) : Math.round(number))
    .toString()
    .split(`.`);
  if (array[0].length > 3) {
    array[0] = array[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
  }
  if (array.length === 1) {
    return array[0];
  }
  if ((array[1] || ``).length < prec) {
    array[1] = array[1] || ``;
    array[1] += new Array(prec - array[1].length + 1).join(`0`);
  }
  return array.join(dec_point);
};
