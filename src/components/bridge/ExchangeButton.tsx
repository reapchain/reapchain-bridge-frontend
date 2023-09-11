import React from "react";
import styled from "styled-components";
import { RetweetOutlined } from "@ant-design/icons";
import colors from "../../assets/colors";

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledExchangeButton = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background-color: ${colors.etcYellow};
`;

const StyledIcon = styled.div`
  padding: 6px 6px 4px 6px;
  color: ${colors.white};
`;

type Props = {
  onClick: () => void;
};

const ExchangeButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledButtonWrapper>
      <StyledExchangeButton onClick={onClick}>
        <StyledIcon>
          <RetweetOutlined style={{ fontSize: "32px" }} />
        </StyledIcon>
      </StyledExchangeButton>
    </StyledButtonWrapper>
  );
};

export default ExchangeButton;
