import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getBgIconSource } from "utils/util";

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
  margin-left: -15%;
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
  type: string;
  item: any;
};

const displayStatus = (type: string) => {
  if (type === "unbatched_transfers") {
    return "Unbatched";
  } else if (type === "transfers_in_batches") {
    return "In Batches";
  } else if (type === "test1") {
    return "Refunding";
  } else if (type === "test2") {
    return "Refunded";
  } else {
    return "-";
  }
};

const HistoryModal: React.FC<Props> = ({ type, item }) => {
  return (
    <StyledContainer>
      <StyledItemWrapper>
        <div>
          <StatusText>{displayStatus(type)}</StatusText>
        </div>
        <StyledTokenTransfer>
          <StyledTokenIcon src={getBgIconSource("ethereum")} alt="icon" />
          <StyledTokenTransferAmount>
            <TokenTitleText>{"tREAP"}</TokenTitleText>
            <SourceAmountText>{"-10000"}</SourceAmountText>
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
            <DestinationAmountText>{"+10000"}</DestinationAmountText>
          </StyledTokenTransferAmount>
        </StyledTokenTransfer>
        <div>
          <div>{"2023-11-23 19:30"}</div>
          <div>{"[Refund]"}</div>
        </div>
      </StyledItemWrapper>
    </StyledContainer>
  );
};

export default HistoryModal;
