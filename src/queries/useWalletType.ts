import { useQuery, useMutation, useQueryClient } from "react-query";

export type WalletType = "Keplr" | "MetaMask";

let walletType: WalletType = "MetaMask";

const WALLET_QUERY_KEY = "/wallet";

export const useWalletQuery = () =>
  useQuery<WalletType>(WALLET_QUERY_KEY, () => {
    return walletType as WalletType;
  });

const setWallet = async (type: WalletType) => {
  walletType = type;
};

export const useWalletMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(setWallet, {
    onSuccess: () => {
      queryClient.invalidateQueries(WALLET_QUERY_KEY);
    },
    onError: () => {
      console.log("setWallet onError");
    },
  });
};
