import React from "react";
import { styled } from "styled-components";
import colors from "assets/colors";
import { HistoryOutlined } from "@ant-design/icons";

const StyledButton = styled.div`
  max-width: 140px;
  height: 44px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
  background-color: ${colors.secondary};
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const StyledButtonText = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 14px;
  font-weight: 700;
  line-height: 140%;
  color: ${colors.white};
`;

type Props = {
  text: string;
  onClick: () => void;
};

const HistoryButton: React.FC<Props> = ({ text, onClick }) => {
  const handleClickLink = () => {
    onClick();
  };

  // TODO: Add pending logic

  return (
    <StyledButton onClick={handleClickLink}>
      <HistoryOutlined style={{ fontSize: "24px", color: colors.darkblue01 }} />
      <StyledButtonText>{text}</StyledButtonText>
    </StyledButton>
  );
};

export default HistoryButton;
