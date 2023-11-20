import colors from "assets/colors";
import React, { useMemo } from "react";
import styled from "styled-components";
import { getIconSource } from "utils/util";
import { formatEther, parseEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

const StyledContainer = styled.div`
  display: flex;
`;
const ChainTitleText = styled.div`
  color: ${colors.godong};
  font-size: 16px;
  font-weight: 700;
`;
const ChainSideText = styled.div`
  color: ${colors.godong};
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
const StyledDenomText = styled.div`
color: ${colors.godong}
font-size: 14px;
font-weight: 600;
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
      <img
        src={getIconSource(icon)}
        alt="icon"
        style={{ width: 40, height: 40 }}
      />
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          marginLeft: "8px",
          marginTop: "-4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ChainTitleText>{chainName}</ChainTitleText>
          {isFrom}
          {isFrom ? (
            <SourceAmountText>- {displayBalance()}</SourceAmountText>
          ) : (
            <DestinationAmountText>+ {displayBalance()}</DestinationAmountText>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ChainSideText>
            {isFrom ? "Source" : "Destination"} Chain
          </ChainSideText>
          <StyledDenomText>{denom}</StyledDenomText>
        </div>
      </div>
    </StyledContainer>
  );
};

export default BridgeTxChainItem;
