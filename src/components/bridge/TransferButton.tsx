import React from "react";
import styled from "styled-components";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import ExecuteButton from "components/common/button/ExecuteButton";

const StyledContainer = styled.div``;

type Props = {
  onClickConnectWallet: () => void;
  onClickExecute: () => void;
};

const TransferButton: React.FC<Props> = ({
  onClickConnectWallet,
  onClickExecute,
}) => {
  const { isActive } = useWeb3Context();

  const handleClickExecute = () => {
    if (!isActive) {
      onClickConnectWallet();
      return;
    }
    onClickExecute();
  };

  return (
    <StyledContainer onClick={handleClickExecute}>
      <ExecuteButton text={"Transfer"} />
    </StyledContainer>
  );
};

export default TransferButton;
