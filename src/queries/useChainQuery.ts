import { useQuery } from "react-query";
import Web3 from "web3";

const getChain = async () => {
  try {
    return "";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const chainQueryKey = "/chain";
export const connectedQueryKey = "/connected";

export let connected = false;

export const useConnectedQuery = () => {
  return useQuery(connectedQueryKey, () => {});
};

const fetcher = () => getChain();

export const useChainQuery = () => {
  return useQuery(chainQueryKey, fetcher);
};
