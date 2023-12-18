import axios from "axios";
import { Coin } from "@tharsis/provider";
import { ethereumConfig, reapchainConfig } from "constants/chainConfig";
import { reapchainKeplrConfig } from "constants/keplrConfig";

const commonProcess = (res: any) => {
  if (res && Object.keys(res).includes("result")) {
    return res.result;
  }
  return res;
};

export const getNodeInfo = (endpoint: string): Promise<any> =>
  axios
    .get(`${endpoint}/node_info`, {})
    .then((res) => {
      return { data: res.data };
    })
    .catch((e) => {
      console.log("error=>", e);
    });

export const getBankBalance = async (
  endpoint: string,
  address: string,
  denom: string
): Promise<string> =>
  axios
    .get(`${endpoint}/bank/balances/${address}`)
    .then((res) => {
      const data = commonProcess(res.data);

      if (!data || data.length < 1) {
        return "0";
      }

      const myCoin = data.find((coin: Coin) => coin.denom === denom);

      if (!myCoin) {
        return "0";
      }

      return myCoin.amount;
    })
    .catch((e) => {
      console.log("error=>", e);
    });

export const getAuthAccount = async (
  endpoint: string,
  address: string
): Promise<any> =>
  axios
    .get(`${endpoint}/cosmos/auth/v1beta1/accounts/${address}`)
    .then((res) => {
      const data = commonProcess(res.data);

      if (!data.account) {
        return null;
      }

      if (data.account.base_account) {
        return data.account.base_account;
      }

      if (data.account.base_vesting_account) {
        return data.account.base_vesting_account;
      }

      return null;
    })
    .catch((e) => {
      console.log("error=>", e);
    });

export const getReapchainTxInfo = async (
  endpoint: string,
  txHash: string
): Promise<any> =>
  axios
    .get(`${endpoint}/cosmos/tx/v1beta1/txs/${txHash}`)
    .then((res) => {
      const data = commonProcess(res.data);
      // console.log("getReapchainTxInfo data : ", data);

      return true;
    })
    .catch((e) => {
      console.log("error", e);
      return false;
    });

export const getEthereumTxInfo = async (txHash: string): Promise<any> =>
  axios
    .post(
      ethereumConfig.rpcEndpoint,
      {
        jsonrpc: "2.0",
        method: "eth_getTransactionByHash",
        params: [txHash],
        id: 1,
      },
      {
        timeout: 3000,
      }
    )
    .then((res) => {
      const data = commonProcess(res);
      if (data.data.result) {
        return true;
      } else {
        return false;
      }
    })
    .catch((e) => {
      console.log("error", e);
      return false;
    });

export const broadcastReapchainTx = async (txBytes: string): Promise<any> =>
  axios
    .post(`${reapchainKeplrConfig.rest}/cosmos/tx/v1beta1/txs`, {
      tx_bytes: txBytes,
      mode: "BROADCAST_MODE_SYNC",
    })
    .then((res) => {
      const data = commonProcess(res);
      return data;
    })
    .catch((e) => {
      console.log("error", e);
      return null;
    });

export const getPendingSendToEth = async (address: string): Promise<any> =>
  axios
    .get(
      `${reapchainKeplrConfig.rest}/gravity/v1beta/query_pending_send_to_eth`,
      {
        params: {
          sender_address: address,
        },
      }
    )
    .then((res) => {
      const data = commonProcess(res.data);
      return data;
    })
    .catch((e) => {
      console.log("error=>", e);
    });

export const getPendingBatchSendToEth = async (address: string): Promise<any> =>
  axios
    .get(
      `${reapchainKeplrConfig.rest}/gravity/v1beta/batch/last_pending_request_by_addr`,
      {
        params: {
          address,
        },
      }
    )
    .then((res) => {
      const data = commonProcess(res.data);
      return data;
    })
    .catch((e) => {
      console.log("error=>", e);
    });
