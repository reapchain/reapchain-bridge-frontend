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
  onClick: () => void;
};

const ExecuteButton: React.FC<Props> = ({ onClick }) => {
  const { isActive } = useWeb3Context();

  const handleClick = () => {
    onClick();
  };

  if (!isActive) {
    return <StyledContainer>Connect Wallet</StyledContainer>;
  }

  return <StyledContainer onClick={handleClick}>Transfer</StyledContainer>;
};

export default ExecuteButton;
