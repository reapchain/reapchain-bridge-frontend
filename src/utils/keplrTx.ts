import { broadcastReapchainTx, getAuthAccount } from "apis/api";
import { MessageSendToEthParams } from "transactions/msgSendToEth";
import { Chain } from "types/chain";
import { getAccounts } from "utils/keplr";
import { makeSignDoc } from "@cosmjs/launchpad";
import {
  AuthInfo,
  TxRaw,
  TxBody,
  Fee,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import {
  MsgSendToEth,
  MsgCancelSendToEth,
} from "@chain-clients/gravitybridge/main/codegen/gravity/v1/msgs";
import { reapchainKeplrConfig } from "constants/keplrConfig";
import { MessageCancelSendToEthParams } from "transactions/msgCancelSendToEth";

export enum BroadcastMode {
  Block = "block",
  Sync = "sync",
  Async = "async",
}

interface KeplrTxResult {
  result: boolean;
  txHash: string;
  msg: string;
}

export const keplrSendTx = async (
  txType: string,
  txData: any,
  chain?: Chain
): Promise<KeplrTxResult> => {
  try {
    const keplrAccount = await getAccounts();

    if (!window.keplr) {
      return {
        result: false,
        txHash: "",
        msg: "No account instance",
      };
    }

    if (!keplrAccount) {
      return {
        result: false,
        txHash: "",
        msg: "No account Info",
      };
    }

    const authAccount = await getAuthAccount(
      reapchainKeplrConfig.rest,
      keplrAccount.address
    );

    if (!authAccount) {
      return {
        result: false,
        txHash: "",
        msg: "No account Info",
      };
    }

    const sender = {
      accountAddress: keplrAccount.address,
      pubkey: keplrAccount.pubkey.key || "",
      sequence: authAccount.sequence,
      accountNumber: authAccount.account_number,
    };

    const fee = {
      amount: [
        {
          amount: "30000000000000",
          denom: "areap",
        },
      ],
      gas: "250000",
    };

    const txMessageSet = createKeplrMessage(txType, txData);

    if (!txMessageSet) {
      return {
        result: false,
        txHash: "",
        msg: "Failed to create message",
      };
    }

    const signDoc = makeSignDoc(
      txMessageSet.aminoMsgs,
      fee,
      reapchainKeplrConfig.chainId,
      getKeplrTxMemo(txType),
      sender.accountNumber,
      sender.sequence
    );

    // error???
    const signResponse = await window.keplr.signAmino(
      reapchainKeplrConfig.chainId,
      keplrAccount.address,
      signDoc
    );

    console.log("signResponse : ", signResponse);

    const signedTx = TxRaw.encode({
      bodyBytes: TxBody.encode(
        TxBody.fromPartial({
          messages: txMessageSet.protoMsgs,
          memo: signResponse.signed.memo,
        })
      ).finish(),
      authInfoBytes: AuthInfo.encode({
        signerInfos: [
          {
            publicKey: {
              typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
              value: PubKey.encode({
                key: Buffer.from(
                  signResponse.signature.pub_key.value,
                  "base64"
                ),
              }).finish(),
            },
            modeInfo: {
              single: {
                mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
              },
              multi: undefined,
            },
            sequence: signResponse.signed.sequence,
          },
        ],
        fee: Fee.fromPartial({
          amount: [...signResponse.signed.fee.amount],
          gasLimit: signResponse.signed.fee.gas,
        }),
      }).finish(),
      signatures: [Buffer.from(signResponse.signature.signature, "base64")],
    }).finish();
    console.log("signedTx : ", signedTx);

    // broadcase tx with keplr
    // const sendTxRes = await window.keplr.sendTx(
    //   reapchainKeplrConfig.chainId,
    //   signedTx,
    //   BroadcastMode.Sync
    // );

    const txBytes = Buffer.from(signedTx).toString("base64");
    const txResponse: any = await broadcastReapchainTx(txBytes);
    console.log("txResponse : ", txResponse);

    if (!txResponse || !txResponse.data) {
      return {
        result: false,
        txHash: "",
        msg: "Connection failed",
      };
    }

    const txResponseData = txResponse.data.tx_response;

    if (txResponseData.raw_log && txResponseData.raw_log.length > 0) {
      return {
        result: false,
        txHash: txResponseData.txhash,
        msg: txResponseData.raw_log,
      };
    }

    return {
      result: true,
      txHash: txResponseData.txhash,
      msg: "",
    };
  } catch (e: any) {
    console.log("KeplrSendTx Error : ", e);
    return {
      result: false,
      txHash: "",
      msg: e.message || "Error",
    };
  }
};

const createKeplrMessage = (txType: string, txData: any) => {
  if (txType === "SendToEth") {
    return createKeplrSendToEthMessage(txData);
  } else if (txType === "CancelSendToEth") {
    return createKeplrCancelSendToEthMessage(txData);
  } else {
    return null;
  }
};

const getKeplrTxMemo = (txType: string) => {
  return `ReapChainBridge_${txType}`;
};

const createKeplrSendToEthMessage = (params: MessageSendToEthParams) => {
  return {
    aminoMsgs: [
      {
        type: "gravity/MsgSendToEth",
        value: {
          sender: params.sender,
          eth_dest: params.ethDest,
          amount: params.amount,
          bridge_fee: params.bridgeFee,
          chain_fee: params.chainFee,
        },
      },
    ],
    protoMsgs: [
      {
        typeUrl: "/gravity.v1.MsgSendToEth",
        value: MsgSendToEth.encode({
          sender: params.sender,
          ethDest: params.ethDest,
          amount: params.amount,
          bridgeFee: params.bridgeFee,
          chainFee: params.chainFee,
        }).finish(),
      },
    ],
  };
};

const createKeplrCancelSendToEthMessage = (
  params: MessageCancelSendToEthParams
) => {
  return {
    aminoMsgs: [
      {
        type: "gravity/MsgCancelSendToEth",
        value: {
          transaction_id: params.transactionId,
          sender: params.sender,
        },
      },
    ],
    protoMsgs: [
      {
        typeUrl: "/gravity.v1.MsgCancelSendToEth",
        value: MsgCancelSendToEth.encode({
          transactionId: params.transactionId,
          sender: params.sender,
        }).finish(),
      },
    ],
  };
};
