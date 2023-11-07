import { Chain, Sender, Fee } from "@tharsis/transactions";
import { Coin } from "@tharsis/provider";
import { createTransaction } from "@tharsis/proto";
import {
  generateFee,
  generateTypes,
  generateMessage,
  createEIP712,
} from "@tharsis/eip712";
import { createMsgSendToEth as eip712_createMsgSendToEth } from "./messages/eip712/msgSendToEth";
import { createMsgSendToEth as proto_createMsgSendToEth } from "./messages/proto/msgSendToEth";

export interface MessageSendToEthParams {
  sender: string;
  ethDest: string;
  amount: Coin;
  bridgeFee: Coin;
  chainFee: Coin;
}

const MSG_SEND_TO_ETH_TYPES = {
  MsgValue: [
    { name: "sender", type: "string" },
    { name: "eth_dest", type: "string" },
    { name: "amount", type: "TypeAmount" },
    { name: "bridge_fee", type: "TypeAmount" },
    { name: "chain_fee", type: "TypeAmount" },
  ],
  TypeAmount: [
    { name: "denom", type: "string" },
    { name: "amount", type: "string" },
  ],
};

export const createMessageSendToEth = (
  chain: Chain,
  sender: Sender,
  fee: Fee,
  memo: string,
  params: MessageSendToEthParams
) => {
  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress
  );
  const types = generateTypes(MSG_SEND_TO_ETH_TYPES);
  const msg = eip712_createMsgSendToEth(
    sender.accountAddress,
    params.ethDest,
    params.amount,
    params.bridgeFee,
    params.chainFee
  );
  const messages = generateMessage(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    msg
  );
  console.log("messages : ", messages);
  const eipToSign = createEIP712(types, chain.chainId, messages);
  console.log("eipToSign : ", eipToSign);
  const msgSendToEth = proto_createMsgSendToEth(
    sender.accountAddress,
    params.ethDest,
    params.amount,
    params.bridgeFee,
    params.chainFee
  );
  console.log("msgSendToEth : ", msgSendToEth);
  const tx = createTransaction(
    msgSendToEth,
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
  console.log("tx : ", tx);
  return {
    signDirect: tx.signDirect,
    legacyAmino: tx.legacyAmino,
    eipToSign,
  };
};
