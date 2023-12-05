import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import { bridgeFee, chainFee } from "constants/bridgeConfig";
import {
  getBigNumber,
  getBigNumberEth,
  removeTrailingZeros,
} from "utils/number";

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

export const applySendToEthFee = (value: BigNumber): string => {
  const totalFee = bridgeFee.add(chainFee);
  const receive = value.sub(totalFee);

  if (receive.lte(0)) {
    return "-";
  }

  return formatEther(receive);
};

export const applySendToEthFeeBigNumber = (value: BigNumber): BigNumber => {
  const totalFee = bridgeFee.add(chainFee);
  const amount = value.sub(totalFee);

  if (amount.lte(0)) {
    return BigNumber.from(0);
  }

  return amount;
};

export const addSendToEthFee = (value: string): string => {
  const ratio = 1;
  const totalFee = bridgeFee.add(chainFee);
  const amount = getBigNumber(value).add(totalFee).mul(ratio);

  return formatEther(amount);
};
