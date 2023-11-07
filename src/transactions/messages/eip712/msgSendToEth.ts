import { Coin } from "@tharsis/provider";

export const createMsgSendToEth = (
  sender: string,
  ethDest: string,
  amount: Coin,
  bridgeFee: Coin,
  chainFee: Coin
) => {
  return {
    type: "gravity/MsgSendToEth",
    value: {
      sender: sender,
      eth_dest: ethDest,
      amount: amount,
      bridge_fee: bridgeFee,
      chain_fee: chainFee,
    },
  };
};
