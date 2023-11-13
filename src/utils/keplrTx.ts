import { getAuthAccount } from "apis/api";
import { MessageSendToEthParams } from "transactions/msgSendToEth";
import { Chain } from "types/chain";
import { getAccounts, getKeplrChainConfig } from "utils/keplr";
import { makeSignDoc } from "@cosmjs/launchpad";
import {
  AuthInfo,
  TxRaw,
  TxBody,
  Fee,
} from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing";
import { MsgSendToEth as MsgSendToEthTest } from "@chain-clients/gravitybridge/main/codegen/gravity/v1/msgs";

export enum BroadcastMode {
  Block = "block",
  Sync = "sync",
  Async = "async",
}

export const keplrSendTx = async (
  txType: string,
  chain: Chain,
  txData: any
) => {
  try {
    const keplrAccount = await getAccounts(chain);

    console.log("keplrAccount : ", keplrAccount);

    if (!window.keplr) {
      console.log("error : no keplr instance...");
      return;
    }

    if (!keplrAccount) {
      console.log("error : account Info...");
      return;
    }

    const keplrChainConfig = getKeplrChainConfig(chain);
    const authAccount = await getAuthAccount(
      keplrChainConfig.rest,
      keplrAccount.address
    );

    console.log("authAccount : ", authAccount);

    if (!authAccount) {
      console.log("error : no account Info...");
      return;
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
      return;
    }

    console.log("txMessageSet : ", txMessageSet);

    const signDoc = makeSignDoc(
      txMessageSet.aminoMsgs,
      fee,
      keplrChainConfig.chainId,
      "ReapChainBridge_SendToETH",
      sender.accountNumber,
      sender.sequence
    );
    console.log("signDoc : ", signDoc);

    const signResponse = await window.keplr.signAmino(
      keplrChainConfig.chainId,
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

    const sendTxRes = await window.keplr.sendTx(
      keplrChainConfig.chainId,
      signedTx,
      BroadcastMode.Sync
    );
    console.log("sendTxRes : ", sendTxRes);
  } catch (e) {
    console.log(e);
    return {
      result: false,
      txhash: "no txhash...",
      msg: e,
    };
  }
};

const createKeplrMessage = (txType: string, txData: any) => {
  if (txType === "SendToEth") {
    return createKeplrSendToEthMessage(txData);
  } else {
    return null;
  }
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
        value: MsgSendToEthTest.encode({
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
