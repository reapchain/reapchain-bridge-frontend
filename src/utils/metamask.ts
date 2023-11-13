import axios from "axios";
import {
  generateEndpointAccount,
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from "@tharsis/provider";
import {
  createTxRawEIP712,
  createMessageSend,
  signatureToWeb3Extension,
} from "@tharsis/transactions";
import detectEthereumProvider from "@metamask/detect-provider";
import { hashMessage } from "ethers";
import { Provider } from "@web3-react/types";
import { Chain, Fee, Sender } from "@tharsis/transactions";
import { convertToBech32 } from "utils/util";
import { formatEther } from "@ethersproject/units";
import { arrayify } from "@ethersproject/bytes";
import { recoverPublicKey } from "@ethersproject/signing-key";
import { Buffer } from "buffer";
import { Secp256k1 } from "@cosmjs/crypto";
import {
  createMessageSendToEth,
  MessageSendToEthParams,
} from "transactions/msgSendToEth";
import * as elliptic from "elliptic";
import { generateFee } from "@tharsis/eip712";

export interface Balance {
  denom: string;
  amount: string;
}

// const chain: Chain = {
//   chainId: 0x3602f,
//   cosmosChainId: "reapchain_221231-1",
// };

const testEndpoint = "https://test-lcd.reapchain.org";
// const testEndpoint = "http://43.201.57.7:1317";
const pubkeyType = "/ethermint.crypto.v1.ethsecp256k1.PubKey";

export const fetchBankBalance = async (address: string, denom: string) => {
  try {
    const addressReap = convertToBech32(address, "reap");
    console.log("addressReap : ", addressReap);

    let { data } = await axios.get(
      `${testEndpoint}/bank/balances/${addressReap}`
    );

    const myBalance = data.result.find(
      (balance: Balance) => balance.denom === denom
    );

    if (!myBalance) {
      return "0";
    }

    const balance = formatEther(myBalance.amount);
    console.log("balance : ", balance);

    return balance;
  } catch (error) {
    console.error(error);
  }
};

export const sendToEth = async (
  hexAddress: string,
  provider: Provider,
  txData: any
) => {
  try {
    if (!hexAddress) {
      return;
    }

    const myChain: Chain = {
      chainId: 0x3602f,
      cosmosChainId: "reapchain_221231-1",
    };

    const bech32Address = convertToBech32(hexAddress, "reap");

    let { data: myAccount } = await axios.get(
      `${testEndpoint}/${generateEndpointAccount(bech32Address)}`
    );

    // cannot use origin pubkey
    if (!myAccount.account.base_account.pub_key || true) {
      // let pubkey = getLocalPubkey(hexAddress);
      let pubkey = getLocalPubkey(hexAddress);

      if (!pubkey || true) {
        pubkey = await setLocalPubkey(hexAddress, provider);
        if (!pubkey) {
          throw new Error("personal sign is required.");
        }
      }
      myAccount.account.base_account.pub_key = {
        "@type": pubkeyType,
        key: pubkey,
      };
    } else {
      myAccount.account.base_account.pub_key = {
        "@type": pubkeyType,
        key: myAccount.account.base_account.pub_key.key,
      };
    }

    const sender: Sender = {
      accountAddress: myAccount.account.base_account.address,
      sequence: myAccount.account.base_account.sequence,
      accountNumber: myAccount.account.base_account.account_number,
      pubkey: myAccount.account.base_account.pub_key.key || "",
    };
    console.log("sender : ", sender);
    const msg = createMetamaskMessageSendToEth(myChain, sender, txData);
    console.log("msg(sendToEth) : ", msg);

    const signature: any = await provider.request({
      method: "eth_signTypedData_v4",
      params: [hexAddress, JSON.stringify(msg.eipToSign)],
    });
    const extension = signatureToWeb3Extension(myChain, sender, signature);
    const rawTx = createTxRawEIP712(
      msg.legacyAmino.body,
      msg.legacyAmino.authInfo,
      extension
    );

    console.log("rawTx : ", rawTx);
    console.log("tx data : ", JSON.parse(generatePostBodyBroadcast(rawTx)));

    const res = await axios.post(
      testEndpoint + generateEndpointBroadcast(),
      JSON.parse(generatePostBodyBroadcast(rawTx))
    );
    console.log("post res : ", res);

    if (res.data) {
      if (res.data.tx_response.raw_log === "signature verification failed") {
        return {
          result: false,
          msg: "signature verification failed",
        };
      }
    }
    return {
      result: true,
      txhash: res.data.tx_response.txhash || "",
    };

    console.log(msg);
  } catch (error) {
    console.error(error);
  }
};

export const transferReap = async (
  hexAddress: string,
  provider: Provider,
  txData: any
) => {
  try {
    if (!hexAddress) {
      return;
    }

    const myChain: Chain = {
      chainId: 0x3602f,
      cosmosChainId: "reapchain_221231-1",
    };

    const bech32Address = convertToBech32(hexAddress, "reap");

    let { data: myAccount } = await axios.get(
      `${testEndpoint}/${generateEndpointAccount(bech32Address)}`
    );

    if (!myAccount.account.base_account.pub_key) {
      let pubkey = getLocalPubkey(hexAddress);
      if (!pubkey) {
        pubkey = await setLocalPubkey(hexAddress, provider);
        if (!pubkey) {
          throw new Error("personal sign is required.");
        }
      }
      myAccount.account.base_account.pub_key = {
        "@type": pubkeyType,
        key: pubkey,
      };
    } else {
      myAccount.account.base_account.pub_key = {
        "@type": pubkeyType,
        key: myAccount.account.base_account.pub_key.key,
      };
    }

    const sender: Sender = {
      accountAddress: myAccount.account.base_account.address,
      sequence: myAccount.account.base_account.sequence,
      accountNumber: myAccount.account.base_account.account_number,
      pubkey: myAccount.account.base_account.pub_key.key || "",
    };
    console.log("sender : ", sender);
    const msg = createMetamaskMessageTransferReap(myChain, sender, txData);
    console.log("msg(transfer) : ", msg);

    const signature: any = await provider.request({
      method: "eth_signTypedData_v4",
      params: [hexAddress, JSON.stringify(msg.eipToSign)],
    });
    console.log("signature : ", signature);

    const extension = signatureToWeb3Extension(myChain, sender, signature);
    console.log("extension : ", extension);

    const rawTx = createTxRawEIP712(
      msg.legacyAmino.body,
      msg.legacyAmino.authInfo,
      extension
    );
    console.log("rawTx : ", rawTx);

    const res = await axios.post(
      testEndpoint + generateEndpointBroadcast(),
      JSON.parse(generatePostBodyBroadcast(rawTx))
    );
    console.log("post res : ", res);

    if (res.data) {
      if (res.data.tx_response.raw_log === "signature verification failed") {
        return {
          result: false,
          msg: "signature verification failed",
        };
      }
    }
    return {
      result: true,
      txhash: res.data.tx_response.txhash || "",
    };

    console.log(msg);
  } catch (error) {
    console.error(error);
  }
};

const createMetamaskMessageSendToEth = (
  chain: Chain,
  sender: Sender,
  txData: any
) => {
  const tempFee = {
    amount: "31250000000000",
    denom: "areap",
    gas: "250000",
  };

  const testTxData: MessageSendToEthParams = {
    sender: sender.accountAddress,
    ethDest: "0x1F45834d8a907B12870498341De6C79609dfa1E8",
    amount: { denom: "areap", amount: "10000000000000000000" },
    bridgeFee: {
      denom: "areap",
      amount: "10000000000000000",
    },
    chainFee: {
      denom: "areap",
      amount: "10000000000000000",
    },
  };

  return createMessageSendToEth(chain, sender, tempFee, "", testTxData);
};

const createMetamaskMessageTransferReap = (
  chain: Chain,
  sender: Sender,
  txData: any
) => {
  const tempFee = {
    amount: "31250000000000",
    denom: "areap",
    gas: "250000",
  };

  const myFeeTest = generateFee(
    "1000000000000000000",
    "1000000000000000000",
    "250000",
    "reap1razcxnv2jpa39pcynq6pmek8jcyalg0gdv3fx7"
  );
  console.log("myFeeTest : ", myFeeTest);

  return createMessageSend(chain, sender, tempFee, "", {
    destinationAddress: "reap1w92fjswvtmg0yds8352de9td2ajy888q2wpcnm",
    amount: "1000000000000000000",
    denom: "areap",
  });
};

const getLocalPubkey = (ethAddress: string) => {
  const locals = localStorage.getItem(`ethPubkey`);
  if (!locals) {
    return;
  }

  const val = JSON.parse(locals)[ethAddress];
  if (!val) {
    return "";
  }

  return val;
};

const setLocalPubkey = async (ethAddress: string, provider: Provider) => {
  let pubKeyData = localStorage.getItem("ethPubkey") || "{}";
  let data = JSON.parse(pubKeyData);

  if (data.ethAddress) {
    return;
  }

  const signMsg = "generate_pubkey";
  const signMsgHex = "0x" + Buffer.from(signMsg).toString("hex");

  try {
    const sign: any = await provider.request({
      method: "personal_sign",
      params: [signMsgHex, ethAddress],
    });
    console.log("sign : ", sign);
    const msgHash = hashMessage(signMsg);
    console.log("msgHash : ", msgHash);
    const msgHashBytes = arrayify(msgHash);
    const recoveredPubKey = recoverPublicKey(msgHashBytes, sign);
    console.log("recoveredPubKey : ", recoveredPubKey);
    const pubKey = Secp256k1.compressPubkey(
      Buffer.from(recoveredPubKey.substring(2), "hex")
    );
    console.log("pubKey : ", pubKey);
    const pubKeyBase64 = Buffer.from(pubKey).toString("base64");
    console.log("pubKeyBase64 : ", pubKeyBase64);

    data[ethAddress] = pubKeyBase64;
    // data[ethAddress + "_u"] = pubKeyBase64_u;
    localStorage.setItem("ethPubkey", JSON.stringify(data));

    console.log("# Test");
    const curve = new elliptic.ec("secp256k1");
    const feePayerPubkey = recoveredPubKey.substring(2);
    const keyBuffer = Buffer.from(feePayerPubkey, "hex");
    const publicKey = curve.keyFromPublic(keyBuffer).getPublic();
    console.log("publicKey : ", publicKey);
    const publicKeyHex = publicKey.encode("hex", true);
    console.log("publicKeyHex : ", publicKeyHex);

    return pubKeyBase64;
  } catch (error) {
    console.log(error);
    return "";
  }
};

// const uPubkey = crypto.keys.unmarshalPublicKey(
//   Buffer.from(recoveredPubKey.substring(2))
// );
// console.log("uPubkey : ", uPubkey);

// const curve = new elliptic.ec("secp256k1");
// const keyHex = recoveredPubKey.substring(2);
// const keyBuffer = Buffer.from(keyHex, "hex");
// const publicKey = curve.keyFromPublic(keyBuffer).getPublic();
// console.log("publicKey : ", publicKey);
// const publicKeyHex = publicKey.encode("hex", true);
// console.log("publicKeyHex : ", publicKeyHex);

// const hexTest0 =
//   "0383e7f590e5e611fa79b936f669fc239ca7b534dc48b3e7a4c6ff064dfe85556a";
// const hexTest1 =
//   "0383E7F590E5E611FA79B936F669FC239CA7B534DC48B3E7A4C6FF064DFE85556A";
// const hexTest2 =
//   "03CE214354CA1CAE8A2AB960C7D46033C0FCE74EDEAFF3116D6ABF4F3F599AB90B";

// console.log("pubkey1 : ", pubKey);

// const uPubKey2 = Secp256k1.compressPubkey(Buffer.from(hexTest1, "hex"));
// console.log("uPubKey2 : ", uPubKey2);

// const pubKeyBase64_u = Buffer.from(uPubKey2).toString("base64");
