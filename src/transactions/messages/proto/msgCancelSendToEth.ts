import { gravity } from "../../proto-ts/gravity/v1/msgs";

export const createMsgCancelSendToEth = (
  transactionId: number,
  sender: string
) => {
  const message = new gravity.v1.MsgCancelSendToEth({
    transaction_id: transactionId,
    sender: sender,
  });

  return {
    message: message,
    path: "gravity.v1.MsgCancelSendToEth",
  };
};
