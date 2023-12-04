import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { removeTrailingZeros } from "utils/number";

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
