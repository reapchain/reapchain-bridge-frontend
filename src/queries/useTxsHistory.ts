import { getPendingSendToEth } from "apis/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { TxHistory, getTxHistory, updateSendToEthTxs } from "utils/txsHistory";
import { convertToBech32, convertToHex } from "utils/util";

export type ERC20Token = {
  contract: string;
  amount: string;
};

export type SendToEthTransfer = {
  id: string;
  sender: string;
  dest_address: string;
  erc20_token: ERC20Token;
  erc20_fee: ERC20Token;
};

export type PendingSendToEthTxs = {
  transfers_in_batches: SendToEthTransfer[];
  unbatched_transfers: SendToEthTransfer[];
} | null;

export type TxsHistory = {
  sendToEthTxs: PendingSendToEthTxs;
  sendToCosmosTxs: any;
};

let historyTxs: TxsHistory = {
  sendToEthTxs: {
    transfers_in_batches: [],
    unbatched_transfers: [],
  },
  sendToCosmosTxs: [],
};

const TXS_HISTORY_QUERY_KEY = "/history/txs";

export const getTxsHistory = async (address: string): Promise<TxHistory[]> => {
  if (!address) {
    return [];
  }

  if (address.substring(0, 2) === "0x") {
    address = convertToBech32(address, "reap");
  }

  const sendToEthTxs = await getPendingSendToEth(address);
  updateSendToEthTxs(address, sendToEthTxs);

  return getTxHistory(address);
};

export const useTxsHistory = (address: string) =>
  useQuery<TxHistory[]>(
    [TXS_HISTORY_QUERY_KEY, address],
    () => getTxsHistory(address),
    {
      enabled: !!address,
    }
  );

// export const useTxsHistoryTest = (address: string) =>
//   useQuery<TxsHistory>([TXS_HISTORY_QUERY_KEY, address], () =>
//     getPendingSendToEthTxs(address)
//   );

// export const useTestQuery = async (targetWallet: string, address: string) =>
//   useQuery(["/history/txs", address], () => getPendingSendToEthTxs(address), {
//     enabled: targetWallet === "Keplr" && address ? true : false,
//   });

// export const usePendingSendToEthTxs = async (
//   targetWallet: string,
//   address: string
// ) => {
//   return useQuery<PendingSendToEthTxs>(
//     [TXS_HISTORY_QUERY_KEY, address],
//     () => getPendingSendToEthTxs(address),
//     { enabled: address ? true : false }
//   );
// };

export const useTxsHistoryQuery = () =>
  useQuery<TxsHistory>(TXS_HISTORY_QUERY_KEY, () => {
    return historyTxs as TxsHistory;
  });

const setSendToEthHistory = async (txs: PendingSendToEthTxs) => {
  historyTxs.sendToEthTxs = txs;
};

export const useSendToEthHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(setSendToEthHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(TXS_HISTORY_QUERY_KEY);
    },
    onError: () => {
      console.log("setSendToEthHistory onError");
    },
  });
};
