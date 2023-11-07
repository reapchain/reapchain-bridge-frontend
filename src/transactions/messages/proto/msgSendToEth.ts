import { gravity } from "../../proto-ts/gravity/v1/msgs";
import { Coin } from "@tharsis/provider";
import { cosmos } from "../../proto-ts/cosmos/base/v1beta1/coin";

export const createMsgSendToEth = (
  sender: string,
  ethDest: string,
  amount: Coin,
  bridgeFee: Coin,
  chainFee: Coin
) => {
  const value = new cosmos.base.v1beta1.Coin(amount);
  const bridgeFeeValue = new cosmos.base.v1beta1.Coin(bridgeFee);
  const chainFeeValue = new cosmos.base.v1beta1.Coin(chainFee);
  const message = new gravity.v1.MsgSendToEth({
    sender,
    eth_dest: ethDest,
    amount: value,
    bridge_fee: bridgeFeeValue,
    chain_fee: chainFeeValue,
  });

  return {
    message: message,
    path: "gravity.v1.MsgSendToEth",
  };
};
