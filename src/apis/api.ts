import axios from "axios";
import { getApi } from "./axios";
import { Coin } from "@tharsis/provider";

const commonProcess = (res: any) => {
  if (res && Object.keys(res).includes("result")) {
    return res.result;
  }
  return res;
};

export const getNodeInfo = async (): Promise<any> => {
  try {
    const res = await getApi("node_info");

    if (!res.data) {
      return [];
    }
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNodeInfo2 = (): Promise<any> =>
  axios
    .get(`${process.env.REACT_APP_TEST_LCD_URL}/node_info`)
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
