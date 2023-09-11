import colors from "assets/colors";
import React from "react";
import styled, { css } from "styled-components";
import { Token } from "types/chain";
import { getIconSource } from "utils/util";

const StyledItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: ${colors.warmSal9};
  color: ${colors.godong};
  padding: 8px;
  height: 32px;
  font-size: 16px;
  font-weight: 600;

  &:not(:first-child) {
    margin-top: 12px;
  }

  &: hover {
    transition: 0.5s;
    border: 2px solid transparent;
    background-color: ${colors.lightSal9};
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: ${colors.sal9};
      border: 2px solid;
      border-color: ${colors.pointPink};
    `}
`;

const StyledImageIcon = styled.img`
  margin-left: 4px;
  margin-right: 4px;
`;

type Props = {
  item: Token;
  selected: boolean;
  onSelect: (item: Token) => void;
};

const TokenListItem: React.FC<Props> = ({ item, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(item);
  };

  return (
    <StyledItem onClick={handleClick} selected={selected}>
      <StyledImageIcon
        src={getIconSource(item.icon)}
        alt="icon"
        style={{ width: 28, height: 28 }}
      />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {item.name}
      </div>
    </StyledItem>
  );
};

export default TokenListItem;
