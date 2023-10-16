export const applyLocaleString = (value: number) => {
  return ("" + value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const applyAmountNumber = (value: string): boolean => {
  return true;
};

export const testAmountNumber = (value: string): boolean => {
  const validFloatRegex = /^[0-9]+[.]?[0-9]*$/;

  return validFloatRegex.test(value);
};
