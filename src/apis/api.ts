import axios from "axios";
import { Coin } from "@tharsis/provider";

const commonProcess = (res: any) => {
  if (res && Object.keys(res).includes("result")) {
    return res.result;
  }
  return res;
};

export const getNodeInfo = (endpoint: string): Promise<any> =>
  axios
    .get(`${endpoint}/node_info`)
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
