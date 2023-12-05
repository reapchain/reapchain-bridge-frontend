import { getPendingSendToEth } from "apis/api";
import { localStorageKey } from "constants/storage";
import { PendingSendToEthTxs, SendToEthTransfer } from "queries/useTxsHistory";
import { getJsonItem, setItem } from "utils/localStorage";
import { convertToBech32 } from "utils/util";

export type TxHistory = {
  id: string | number;
  sender: string;
  destAddress: string;
  type: string;
  status: string;
  transferAmount: string;
  feeAmount: string;
  txHash?: string;
  createdAt?: string;
};

const convertSendToEthTx = (
  tx: SendToEthTransfer,
  status: "unbatched" | "inbatches" | "completed"
): TxHistory => {
  return {
    id: tx.id,
    sender: tx.sender,
    destAddress: tx.dest_address,
    type: "SendToEth",
    status: status,
    transferAmount: tx.erc20_token.amount,
    feeAmount: tx.erc20_fee.amount,
    txHash: "",
    createdAt: "",
  };
};

export const getTxHistory = (address: string): TxHistory[] => {
  const data = getJsonItem(localStorageKey.TXS_HISTORY) || {};

  if (!data) {
    return [];
  }

  //   console.log("getTxHistory Result : ", data[address]);

  return data[address] || [];
};

export const updateSendToCosmosTxs = async (tx: TxHistory) => {
  const beck32Address = convertToBech32(tx.sender, "reap");
  //   const pendingSendToEthTxs = await getPendingSendToEth(beck32Address);
  //   updateSendToEthTxs(tx.sender, pendingSendToEthTxs || null);

  let prevData = getJsonItem(localStorageKey.TXS_HISTORY) || {};

  if (!prevData[beck32Address] || !prevData[beck32Address].length) {
    prevData = {
      ...prevData,
      [beck32Address]: [tx],
    };
    setItem(localStorageKey.TXS_HISTORY, prevData);
    return;
  }

  let prevItem: TxHistory[] = prevData[beck32Address];
  prevItem = prevItem.filter((prevTx) => prevTx.id !== tx.id);

  setItem(localStorageKey.TXS_HISTORY, {
    ...prevData,
    [beck32Address]: [tx, ...prevItem],
  });
};

export const updateSendToEthTxs = (
  address: string,
  txs: PendingSendToEthTxs
) => {
  if (!txs) {
    txs = {
      unbatched_transfers: [],
      transfers_in_batches: [],
    };
  }

  if (address.substring(0, 2) === "0x") {
    address = convertToBech32(address, "reap");
  }

  let prevData = getJsonItem(localStorageKey.TXS_HISTORY) || {};

  const unbatchedTxList = txs.unbatched_transfers.map((tx) =>
    convertSendToEthTx(tx, "unbatched")
  );
  const inbatchesTxList = txs.transfers_in_batches.map((tx) =>
    convertSendToEthTx(tx, "inbatches")
  );

  if (!prevData[address] || !prevData[address].length) {
    prevData = {
      ...prevData,
      [address]: unbatchedTxList.concat(inbatchesTxList),
    };
    setItem(localStorageKey.TXS_HISTORY, prevData);
    return;
  }

  const prevItem: TxHistory[] = prevData[address];
  const newItem = unbatchedTxList.concat(inbatchesTxList);

  let oldItem: TxHistory[] = prevItem.filter(
    (tx) => newItem.findIndex((newTx) => newTx.id === tx.id) < 0
  );

  oldItem = oldItem.map((tx) => {
    if (tx.type === "SendToEth") {
      return {
        ...tx,
        status: "completed",
      };
    } else {
      return tx;
    }
  });

  setItem(localStorageKey.TXS_HISTORY, {
    ...prevData,
    [address]: newItem.concat(oldItem),
  });
};
