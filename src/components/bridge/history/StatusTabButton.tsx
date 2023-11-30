import React from "react";
import { styled } from "styled-components";
import colors from "assets/colors";

const StyledButton = styled.div<{ selected?: boolean }>`
  height: 32px;
  min-width: 50px;
  padding: 4px 16px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.selected ? colors.blue : colors.secondary};
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  color: white;
`;

const StyledButtonText = styled.div<{ selected?: boolean }>`
  text-align: left;
  vertical-align: top;
  font-size: 16px;
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => (props.selected ? colors.white : colors.darkblue01)};
`;

type Props = {
  value: string;
  selected: string;
  onClick: () => void;
};

const StatusTabButton: React.FC<Props> = ({ value, selected, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  const isSelected = () => {
    return value === selected ? true : false;
  };

  return (
    <StyledButton selected={isSelected()} onClick={handleClick}>
      <StyledButtonText selected={isSelected()}>{value}</StyledButtonText>
    </StyledButton>
  );
};

export default StatusTabButton;
