import React from "react";
import { styled } from "styled-components";
import colors from "assets/colors";

const StyledButton = styled.div<{ active?: string }>`
  height: 24px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.active ? colors.blue : colors.secondary};
  display: flex;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  color: white;
`;

const StyledButtonText = styled.div<{ active?: string }>`
  text-align: center;
  vertical-align: top;
  font-size: 13px;
  font-weight: 600;
  line-height: 140%;
  color: ${(props) => (props.active ? colors.white : colors.darkblue01)};
`;

type Props = {
  active: string;
  onClick: () => void;
};

const RefundButton: React.FC<Props> = ({ active, onClick }) => {
  const handleClick = () => {
    if (active) {
      onClick();
    }
  };

  return (
    <StyledButton active={active} onClick={handleClick}>
      <StyledButtonText active={active}>Refund</StyledButtonText>
    </StyledButton>
  );
};

export default RefundButton;
