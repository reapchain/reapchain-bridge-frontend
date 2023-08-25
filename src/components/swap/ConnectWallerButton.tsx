import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

const StyledContainer = styled.div`
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.secondary4};
  color: #fff;
  padding: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const ConnectWallerButton: React.FC = () => {
  return <StyledContainer>Connect Wallet</StyledContainer>;
};

export default ConnectWallerButton;
