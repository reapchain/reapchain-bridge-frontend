import colors from "assets/colors";
import React, { useMemo } from "react";
import styled from "styled-components";
import { getBgIconSource } from "utils/util";
import { formatEther, parseEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

const StyledContainer = styled.div`
  display: flex;
`;
const ChainTitleText = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
`;
const ChainSideText = styled.div`
  color: ${colors.darkblue01};
  font-size: 13px;
  font-weight: 500;
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
const StyledDenomText = styled.div`
  color: ${colors.darkblue01};
  font-size: 14px;
  font-weight: 600;
`;
const StyledIcon = styled.img``;
const StyledTransferInfo = styled.div`
  flex: 1;
  flex-direction: column;
  margin-left: 8px;
  margin-top: -4px;
`;
const StyledTransferInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  type: "from" | "to";
  chainName: string;
  icon: string;
  amount: string;
  denom: string;
}

const BridgeTxChainItem: React.FC<Props> = ({
  type,
  chainName,
  icon,
  amount,
  denom,
}) => {
  const isFrom = useMemo(() => {
    return type === "from";
  }, [type]);

  const displayBalance = () => {
    // const bigNumber = parseEther(amount);
    // return formatEther(bigNumber);
    return amount;
  };

  return (
    <StyledContainer>
      <StyledIcon
        src={getBgIconSource(icon)}
        alt="icon"
        style={{ width: 40, height: 40 }}
      />
      <StyledTransferInfo>
        <StyledTransferInfoItem>
          <ChainTitleText>{chainName}</ChainTitleText>
          {isFrom}
          {isFrom ? (
            <SourceAmountText>- {displayBalance()}</SourceAmountText>
          ) : (
            <DestinationAmountText>+ {displayBalance()}</DestinationAmountText>
          )}
        </StyledTransferInfoItem>
        <StyledTransferInfoItem>
          <ChainSideText>
            {isFrom ? "Source" : "Destination"} Chain
          </ChainSideText>
          <StyledDenomText>{denom}</StyledDenomText>
        </StyledTransferInfoItem>
      </StyledTransferInfo>
    </StyledContainer>
  );
};

export default BridgeTxChainItem;
