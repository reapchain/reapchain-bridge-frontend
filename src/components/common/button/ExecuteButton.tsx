import React from "react";
import { styled } from "styled-components";
import colors from "assets/colors";

const StyledButton = styled.div`
  height: 55px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
  background-color: ${colors.blue};
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const StyledButtonText = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  color: ${colors.white};
`;

type Props = {
  text: string;
  onClick?: () => {};
};

const ExecuteButton: React.FC<Props> = ({ text, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <StyledButton onClick={handleClick}>
      <StyledButtonText>{text}</StyledButtonText>
    </StyledButton>
  );
};

export default ExecuteButton;
