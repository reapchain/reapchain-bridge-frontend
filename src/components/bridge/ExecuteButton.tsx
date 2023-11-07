import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { useWeb3Context } from "components/common/Web3ContextProvider";

const StyledContainer = styled.div`
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.pointPink};
  color: #fff;
  padding: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

type Props = {
  onClickConnectWallet: () => void;
  onClickExecute: () => void;
};

const ExecuteButton: React.FC<Props> = ({
  onClickConnectWallet,
  onClickExecute,
}) => {
  const { isActive } = useWeb3Context();

  const handleClickConnectWallet = () => {
    onClickConnectWallet();
  };

  const handleClickExecute = () => {
    onClickExecute();
  };

  if (!isActive) {
    return (
      <StyledContainer onClick={handleClickConnectWallet}>
        Connect Wallet
      </StyledContainer>
    );
  }

  return (
    <StyledContainer onClick={handleClickExecute}>Transfer</StyledContainer>
  );
};

export default ExecuteButton;
