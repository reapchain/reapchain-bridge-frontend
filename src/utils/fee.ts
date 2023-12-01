import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";

export const removeTrailingZeros = (value: number | string): string => {
  const stringValue = typeof value === "number" ? value.toString() : value;

  if (!stringValue.includes(".") || /^[^.]+0+$/.test(stringValue)) {
    return stringValue;
  }

  return stringValue.replace(/(?:\.0*|(\.\d+?)0+)$/, "$1");
};

export const calcFee = (
  amount: string,
  walletType: "MetaMask" | "Keplr"
): BigNumber => {
  const tempAmount = removeTrailingZeros(amount);

  if (walletType === "MetaMask") {
    return BigNumber.from(parseEther(tempAmount));
  }

  let calcAmount = BigNumber.from(parseEther(tempAmount));
  calcAmount = calcAmount.add(parseEther("2")).add(parseEther("1"));

  return calcAmount;
};
