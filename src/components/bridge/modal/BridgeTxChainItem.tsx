import colors from "assets/colors";
import React, { useMemo } from "react";
import styled from "styled-components";
import { getBgIconSource, getTokenSource } from "utils/util";
import { formatEther } from "@ethersproject/units";
import { useWalletQuery } from "queries/useWalletType";
import { getBigNumberEth } from "utils/number";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ChainTitleText = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 700;
`;
const ChainSideText = styled.div`
  color: ${colors.darkblue01};
  font-size: 13px;
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
const StyledDenomText = styled.div`
  color: ${colors.darkblue01};
  font-size: 13px;
  font-weight: 600;
`;
const StyledIcon = styled.img``;
const StyledTransferInfo = styled.div`
  flex: 1;
  flex-direction: column;
  margin-left: 8px;
`;
const StyledTransferInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledTokenIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 4px;
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
  const { data: walletData } = useWalletQuery();
  const targetWallet = walletData ?? "MetaMask";

  const isFrom = useMemo(() => {
    return type === "from";
  }, [type]);

  const displayBalance = () => {
    return amount;
  };

  const sourceAmount = useMemo(() => {
    const num = getBigNumberEth(amount).mul(1);
    return formatEther(num);
  }, [amount, targetWallet]);

  return (
    <StyledContainer>
      <StyledIcon
        src={getBgIconSource(icon)}
        alt="icon"
        style={{ width: 35, height: 35 }}
      />
      <StyledTransferInfo>
        <StyledTransferInfoItem style={{ marginBottom: "-2px" }}>
          <ChainTitleText>{chainName}</ChainTitleText>
          {isFrom ? (
            <SourceAmountText>- {sourceAmount}</SourceAmountText>
          ) : (
            <DestinationAmountText>+ {displayBalance()}</DestinationAmountText>
          )}
        </StyledTransferInfoItem>
        <StyledTransferInfoItem style={{ marginTop: "-4px" }}>
          <ChainSideText>
            {isFrom ? "Source" : "Destination"} Chain
          </ChainSideText>
          <StyledDenomText>
            <StyledTokenIcon src={getTokenSource(denom)} alt="icon" />
            {denom}
          </StyledDenomText>
        </StyledTransferInfoItem>
      </StyledTransferInfo>
    </StyledContainer>
  );
};

export default BridgeTxChainItem;
