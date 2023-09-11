import axios from "axios";
import { getApi } from "./axios";

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
