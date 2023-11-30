import React, { useMemo } from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { Modal, message } from "antd";
import { PendingSendToEthTxs, SendToEthTransfer } from "queries/useTxsHistory";
import SendToEthListItem from "components/bridge/history/SendToEthListItem";
import { connectKeplrWallet } from "utils/keplr";
import { MessageCancelSendToEthParams } from "transactions/msgCancelSendToEth";
import { keplrSendTx } from "utils/keplrTx";
import { ReloadOutlined } from "@ant-design/icons";

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
  font-size: 18px;
  font-weight: 600px;
`;
const StyledHistoryList = styled.div`
  margin-top: 20px;
  height: 550px;
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
  pendingSendToEthTxs: PendingSendToEthTxs | null;
  pendingSendToCosmosTxs: null;
  onCancel: () => void;
};

const HistoryModal: React.FC<Props> = ({
  open,
  pendingSendToEthTxs,
  pendingSendToCosmosTxs,
  onCancel,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickCancel = () => {
    onCancel();
  };

  const isNoTxHistory = useMemo(() => {
    if (!pendingSendToEthTxs) {
      return true;
    } else if (
      pendingSendToEthTxs.transfers_in_batches.length === 0 &&
      pendingSendToEthTxs.unbatched_transfers.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [open, pendingSendToEthTxs, pendingSendToCosmosTxs]);

  const handleClickRefund = async (item: SendToEthTransfer) => {
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
          <ReloadOutlined style={{ fontSize: "20px", color: colors.white }} />
        </StyledSettingWrapper>
        <StyledHistoryList>
          {!pendingSendToEthTxs || isNoTxHistory ? (
            <StyledEmptyWrapper>
              <StyledNoTxText>No tx history</StyledNoTxText>
            </StyledEmptyWrapper>
          ) : (
            <>
              {pendingSendToEthTxs.unbatched_transfers.map((transfer) => (
                <SendToEthListItem
                  key={transfer.id}
                  status={"unbatched_transfers"}
                  item={transfer}
                  onClickRefund={handleClickRefund}
                />
              ))}
              {pendingSendToEthTxs.transfers_in_batches.map((transfer) => (
                <SendToEthListItem
                  key={transfer.id}
                  status={"transfers_in_batches"}
                  item={transfer}
                  onClickRefund={() => {}}
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
