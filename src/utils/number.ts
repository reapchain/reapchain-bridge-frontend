export const applyLocaleString = (value: number) => {
  return ("" + value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
