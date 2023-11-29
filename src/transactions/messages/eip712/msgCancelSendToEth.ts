export const createMsgCancelSendToEth = (
  transactionId: number,
  sender: string
) => {
  return {
    type: "gravity/MsgCancelSendToEth",
    value: {
      transaction_id: transactionId,
      sender: sender,
    },
  };
};
