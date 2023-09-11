import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { getApi } from "../apis/axios";
import { Chain } from "types/chain";
// import { reapchainTestNet } from "constants/network";
import { chainQueryKey } from "queries/useChainQuery";
import { Web3 } from "web3";

export type TestChain = {
  chainName: string;
};

const fetcher = async (chain: Chain) => {
  // const targetChain = reapchainTestNet;
  // let def = ["0x1", "0x3", "0x4", "0x5", "0x2a"];
  // const web3 = new Web3();
  // if (def.indexOf(targetChain.chainId) === -1) {
  //   await web3.eth.request({
  //     method: "wallet_addEthereumChain",
  //     params: [targetChain],
  //   });
  // } else {
  //   await web3.eth.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [
  //       {
  //         chainId: targetChain.chainId,
  //       },
  //     ],
  //   });
  // }
};

export const useChainMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries(chainQueryKey);
    },
  });
};

// export const getChain = async () => {};
