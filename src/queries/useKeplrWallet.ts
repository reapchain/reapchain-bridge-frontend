import { useQuery, useMutation, useQueryClient } from "react-query";

export type KeplrWallet = {
  isActive: boolean;
  address: string;
  name: string;
};

export const initKeplrWallet: KeplrWallet = {
  isActive: false,
  address: "",
  name: "",
};

let keplrWallet: KeplrWallet = initKeplrWallet;

const KEPLR_QUERY_KEY = "/wallet/keplr";

export const useKeplrQuery = () =>
  useQuery<KeplrWallet>(KEPLR_QUERY_KEY, () => keplrWallet);

const setKeplrWallet = async (newWallet: KeplrWallet) => {
  keplrWallet = newWallet;
};

export const useKeplrMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(setKeplrWallet, {
    onSuccess: () => {
      queryClient.invalidateQueries(KEPLR_QUERY_KEY);
    },
    onError: () => {
      console.log("setWallet onError");
    },
  });
};
