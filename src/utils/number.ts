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

export const validateDecimalInput = (input: string) => {
  const floatRegex = /^[0-9]+[.]?[0-9]*$/;

  if ((!floatRegex.test(input) && input) || Number(input) < 0) {
    return input.slice(0, -1);
  }

  return input;
};

export const removeLastDot = (input: string) => {
  if (!input) {
    return "";
  }

  if (input.charAt(input.length - 1) === ".") {
    return input.slice(0, -1);
  }

  return input;
};
