import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { Modal, message } from "antd";
import { PendingSendToEthTxs, SendToEthTransfer } from "queries/useTxsHistory";
import SendToEthListItem from "components/bridge/history/SendToEthListItem";
import { connectKeplrWallet } from "utils/keplr";
import { MessageCancelSendToEthParams } from "transactions/msgCancelSendToEth";
import { keplrSendTx } from "utils/keplrTx";
import { ReloadOutlined } from "@ant-design/icons";
import StatusTabButton from "components/bridge/history/StatusTabButton";
import { TxHistory } from "utils/txsHistory";

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    margin-left: -12px;
    border-radius: 12px;
    border: 1px solid transparent;
    border-radius: 12px;
    border-color: ${colors.darkblue03};
    background-color: ${colors.primary};
    padding: 24px;
  }

  & .ant-modal-close-x {
    font-size: 24px;
    color: ${colors.white};
  }

  & .ant-modal-close {
    width: 32px;
    height: 32px;
  }

  & .ant-modal-title {
    background-color: ${colors.primary};
    text-align: center;
    margin-top: -6px;
    font-size: 20px;
    color: ${colors.white};
  }
`;
const StyledContents = styled.div``;
const StyledSettingWrapper = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 8px;
  gap: 12px;
`;
const StyledReloadWrapper = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${colors.blue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 12px;
`;
const StyledPaginationWrapper = styled.div``;
const StyledEmptyWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledNoTxText = styled.div`
  margin-top: -40px;
  font-size: 16px;
  font-weight: 600;
`;
const StyledHistoryList = styled.div`
  margin-top: 20px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;

  scrollbar-color: ${colors.darkblue03} ${colors.darkblue01};
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkblue03};
  }
  &::-webkit-scrollbar-track {
    background-color: ${colors.darkblue01};
  }
`;

type Props = {
  open: boolean;
  txList: TxHistory[];
  onCancel: () => void;
  onRefetch: () => void;
};

const HistoryModal: React.FC<Props> = ({
  open,
  txList,
  onCancel,
  onRefetch,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleClickCancel = () => {
    onCancel();
  };
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // const isNoTxHistory = useMemo(() => {
  //   if (!pendingSendToEthTxs) {
  //     return true;
  //   } else if (
  //     pendingSendToEthTxs.transfers_in_batches.length === 0 &&
  //     pendingSendToEthTxs.unbatched_transfers.length === 0
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }, [open, , filterStatus]);

  const handleClickRefund = async (item: TxHistory) => {
    try {
      const keplr = await connectKeplrWallet();
      if (!keplr) {
        return;
      }

      const params: MessageCancelSendToEthParams = {
        transactionId: Number(item.id),
        sender: keplr.account.bech32Address,
      };
      console.log("MessageCancelSendToEthParams : ", params);

      const keplrTxResult = await keplrSendTx("CancelSendToEth", params);

      if (!keplrTxResult.result && keplrTxResult.msg === "Request rejected") {
        messageApi.error(keplrTxResult.msg);
        return;
      } else if (!keplrTxResult.result && keplrTxResult.msg !== "[]") {
        messageApi.error(keplrTxResult.msg);
        return;
      }

      messageApi.success("Refund request completed");
    } catch (err) {
      messageApi.error("Error");
    }
  };

  const handleClickTabButton = (status: string) => {
    setFilterStatus(status);
  };

  useEffect(() => {
    if (open) {
      onRefetch();
    }
  }, [open]);

  return (
    <StyledModal
      title={"Bridge Tx History"}
      open={open}
      onCancel={handleClickCancel}
      closeIcon={false}
      width={700}
      bodyStyle={{
        padding: 0,
        color: colors.white,
        display: "flex",
        flexDirection: "column",
      }}
      style={{
        top: 200,
        borderRadius: 12,
        color: colors.godong,
      }}
      footer={null}
    >
      <StyledContents>
        <StyledSettingWrapper>
          {/* <StatusTabButton
            value={"All"}
            selected={filterStatus}
            onClick={() => handleClickTabButton("All")}
          />
          <StatusTabButton
            value={"Pending"}
            selected={filterStatus}
            onClick={() => handleClickTabButton("Pending")}
          />
          <StatusTabButton
            value={"Complete"}
            selected={filterStatus}
            onClick={() => handleClickTabButton("Complete")}
          /> */}
          <StyledReloadWrapper>
            <ReloadOutlined
              onClick={onRefetch}
              style={{ fontSize: "20px", color: colors.white, padding: "8px" }}
            />
          </StyledReloadWrapper>
        </StyledSettingWrapper>
        <StyledHistoryList>
          {txList.length < 1 ? (
            <StyledEmptyWrapper>
              <StyledNoTxText>No tx history</StyledNoTxText>
            </StyledEmptyWrapper>
          ) : (
            <>
              {txList.map((tx) => (
                <SendToEthListItem
                  key={tx.id}
                  item={tx}
                  onClickRefund={handleClickRefund}
                />
              ))}
            </>
          )}
        </StyledHistoryList>
        <StyledPaginationWrapper />
      </StyledContents>
      {contextHolder}
    </StyledModal>
  );
};

export default HistoryModal;
