import { useQuery } from "react-query";
import Web3 from "web3";

const getChain = async () => {
  try {
    const web3 = new Web3();

    // const enable = await window.ethereum.enable();
    // console.log("enable : ", enable);

    const chainId = await web3.eth.getChainId();
    console.log("chainId : ", chainId);

    const accounts = await web3.eth.requestAccounts();
    console.log("accounts : ", accounts);

    return {
      chainId,
      address: accounts[0],
    };
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
