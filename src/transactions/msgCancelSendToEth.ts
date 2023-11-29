import { Chain, Sender, Fee } from "@tharsis/transactions";
import { createTransaction } from "@tharsis/proto";
import {
  generateFee,
  generateTypes,
  generateMessage,
  createEIP712,
} from "@tharsis/eip712";
import { createMsgCancelSendToEth as eip712_createMsgCancelSendToEth } from "./messages/eip712/msgCancelSendToEth";
import { createMsgCancelSendToEth as proto_createMsgCancelSendToEth } from "./messages/proto/msgCancelSendToEth";

export interface MessageCancelSendToEthParams {
  transactionId: number;
  sender: string;
}

const MSG_CANCEL_SEND_TO_ETH_TYPES = {
  MsgValue: [
    { name: "transaction_id", type: "string" },
    { name: "sender", type: "string" },
  ],
};

export const createCancelSendToEth = (
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageCancelSendToEthParams
) => {
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress
  );
  const types = generateTypes(MSG_CANCEL_SEND_TO_ETH_TYPES);
  const msg = eip712_createMsgCancelSendToEth(
    params.transactionId,
    params.sender
  );
  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msg
  );
  const eipToSign = createEIP712(types, chain.chainId, messages);
  const msgCancelSendToEth = proto_createMsgCancelSendToEth(
    params.transactionId,
    sender.accountAddress
  );
  const tx = createTransaction(
    msgCancelSendToEth,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    "ethsecp256",
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId
  );
  return {
    signDirect: tx.signDirect,
    legacyAmino: tx.legacyAmino,
    eipToSign,
  };
};
