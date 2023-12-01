import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getBgIconSource } from "utils/util";
import { SendToEthTransfer } from "queries/useTxsHistory";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";
import RefundButton from "components/bridge/history/RefundButton";

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
  margin-left: -10%;
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
  color: ${colors.quaternary};
  font-size: 16px;
  font-weight: 600;
`;
const DestinationAmountText = styled.div`
  color: ${colors.green1};
  font-size: 16px;
  font-weight: 600;
`;

type Props = {
  status: string;
  item: SendToEthTransfer;
  onClickRefund: (item: SendToEthTransfer) => void;
};

const displayStatus = (status: string) => {
  if (status === "unbatched_transfers") {
    return "Pending";
  } else if (status === "transfers_in_batches") {
    return "In Progress";
  } else if (status === "test1") {
    return "Refunding";
  } else if (status === "test2") {
    return "Refunded";
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

const SendToEthListItem: React.FC<Props> = ({
  status,
  item,
  onClickRefund,
}) => {
  const handleClick = () => {};

  const sumAmount = () => {
    const tokenAmount = BigNumber.from(item.erc20_token.amount);
    const feeAmount = BigNumber.from(item.erc20_fee.amount);
    const sum = formatEther(tokenAmount.add(feeAmount));
    return sum;
  };

  const toAmount = () => {
    const ratio = 1;
    return formatEther(BigNumber.from(item.erc20_token.amount).mul(ratio));
  };

  const handleClickRefund = () => {
    onClickRefund(item);
  };

  return (
    <StyledContainer>
      <StyledItemWrapper>
        <StatusText>{displayStatus(status)}</StatusText>
        <StyledTokenTransfer>
          <StyledTokenIcon src={getBgIconSource("ethereum")} alt="icon" />
          <StyledTokenTransferAmount>
            <TokenTitleText>{"tREAP"}</TokenTitleText>
            <SourceAmountText>{`-${sumAmount()}`}</SourceAmountText>
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

export default SendToEthListItem;
