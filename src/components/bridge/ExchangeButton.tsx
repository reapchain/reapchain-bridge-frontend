import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import icon from "assets/images/reload.svg";

const StyledButtonContainer = styled.div`
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 12px;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid;
  border-color: ${colors.darkblue04};
`;

const StyledExchangeButton = styled.div``;

const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
`;

type Props = {
  onClick: () => void;
};

const ExchangeButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledButtonContainer>
      <StyledExchangeButton onClick={onClick}>
        <StyledIcon src={icon} />
      </StyledExchangeButton>
    </StyledButtonContainer>
  );
};

export default ExchangeButton;
