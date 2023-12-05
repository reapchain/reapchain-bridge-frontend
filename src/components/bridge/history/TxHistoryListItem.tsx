import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getBgIconSource } from "utils/util";
import { formatEther } from "@ethersproject/units";
import RefundButton from "components/bridge/history/RefundButton";
import { TxHistory } from "utils/txsHistory";
import { getBigNumber } from "utils/number";
import { addSendToEthFee } from "utils/fee";

const StyledContainer = styled.div`
  border-radius: 12px;
  padding: 12px 20px;
  background-color: ${colors.background};
`;
const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const StyledTokenTransfer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledTokenTransferAmount = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledTokenIcon = styled.img`
  width: 36px;
  height: 36px;
  padding-right: 12px;
`;
const StatusText = styled.div`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 700;
  width: 100px;
`;
const TokenTitleText = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
`;
const SourceAmountText = styled.div`
  color: ${colors.red01};
  font-size: 16px;
  font-weight: 600;
`;
const DestinationAmountText = styled.div`
  color: ${colors.blue01};
  font-size: 16px;
  font-weight: 600;
`;

const displayStatus = (item: TxHistory) => {
  if (item.type === "SendToEth") {
    if (item.status === "unbatched") {
      return "Pending";
    } else if (item.status === "inbatches") {
      return "In Progress";
    } else if (item.status === "completed") {
      return "Completed";
    } else if (item.status === "refunding??") {
      return "Refunding?";
    } else {
      return "Completed";
    }
  } else if (item.type === "SendToCosmos") {
    return item.status;
  } else {
    return "-";
  }
};

const refundActive = (status: string) => {
  if (status === "unbatched_transfers") {
    return "true";
  } else {
    return "";
  }
};

type Props = {
  item: TxHistory;
  onClickRefund: (item: TxHistory) => void;
};

const TxHistoryListItem: React.FC<Props> = ({ item, onClickRefund }) => {
  const handleClick = () => {};

  const fromAmount = () => {
    const ratio = 1;
    return formatEther(getBigNumber(item.transferAmount).mul(ratio));
  };

  const toAmount = () => {
    const ratio = 1;
    return formatEther(getBigNumber(item.transferAmount).mul(ratio));
  };

  const handleClickRefund = () => {
    onClickRefund(item);
  };

  if (item.type === "SendToEth") {
    return (
      <StyledContainer>
        <StyledItemWrapper>
          <StatusText>{displayStatus(item)}</StatusText>
          <StyledTokenTransfer>
            <StyledTokenIcon src={getBgIconSource("reapchain")} alt="icon" />
            <StyledTokenTransferAmount>
              <TokenTitleText>{"REAP"}</TokenTitleText>
              <SourceAmountText>{`-${addSendToEthFee(
                item.transferAmount
              )}`}</SourceAmountText>
            </StyledTokenTransferAmount>
            <ArrowRightOutlined
              style={{
                fontSize: "20px",
                color: colors.darkblue01,
                padding: "0px 20px",
              }}
            />
            <StyledTokenIcon src={getBgIconSource("ethereum")} alt="icon" />
            <StyledTokenTransferAmount>
              <TokenTitleText>{"cREAP"}</TokenTitleText>
              <DestinationAmountText>{`+${toAmount()}`}</DestinationAmountText>
            </StyledTokenTransferAmount>
          </StyledTokenTransfer>
          <div></div>
        </StyledItemWrapper>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledItemWrapper>
        <StatusText>{displayStatus(item)}</StatusText>
        <StyledTokenTransfer>
          <StyledTokenIcon src={getBgIconSource("ethereum")} alt="icon" />
          <StyledTokenTransferAmount>
            <TokenTitleText>{"cREAP"}</TokenTitleText>
            <SourceAmountText>{`-${fromAmount()}`}</SourceAmountText>
          </StyledTokenTransferAmount>
          <ArrowRightOutlined
            style={{
              fontSize: "20px",
              color: colors.darkblue01,
              padding: "0px 20px",
            }}
          />
          <StyledTokenIcon src={getBgIconSource("reapchain")} alt="icon" />
          <StyledTokenTransferAmount>
            <TokenTitleText>{"REAP"}</TokenTitleText>
            <DestinationAmountText>{`+${toAmount()}`}</DestinationAmountText>
          </StyledTokenTransferAmount>
        </StyledTokenTransfer>
        <div>
          {/* <RefundButton
            active={refundActive(status)}
            onClick={handleClickRefund}
          /> */}
        </div>
      </StyledItemWrapper>
    </StyledContainer>
  );
};

export default TxHistoryListItem;
