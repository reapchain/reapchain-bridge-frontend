import React, { useMemo } from "react";
import { styled } from "styled-components";
import colors from "assets/colors";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { getBgIconSource, getTokenSource } from "utils/util";

const StyledButton = styled.div<{ active?: string }>`
  height: 48px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.active ? colors.blue : colors.secondary};
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;

  color: white;
`;

const StyledButtonText = styled.div<{ active?: string }>`
  text-align: left;
  vertical-align: top;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => (props.active ? colors.white : colors.darkblue01)};
`;

const StyledIcon = styled(Icon)<{ active?: string }>`
  color: ${(props) => (props.active ? colors.lightblue : colors.darkblue01)};
`;

const StyledTokenIcon = styled.img`
  width: 20px;
  height: 20px;
`;

type Props = {
  value: string;
  selected: string;
  from: string;
  to: string;
};

const TabButton: React.FC<Props> = ({ value, selected, from, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (value === selected) {
      return;
    }
    navigate(`/${value}`);
  };

  if (value === selected) {
    return (
      <StyledButton active={"true"} onClick={handleClick}>
        <StyledTokenIcon src={getTokenSource(from)} alt="icon" />
        <StyledButtonText active={"true"}>{from}</StyledButtonText>
        <StyledIcon active={"true"} path={mdiChevronRight} size={1} />
        <StyledTokenIcon src={getTokenSource(to)} alt="icon" />
        <StyledButtonText active={"true"}>{to}</StyledButtonText>
      </StyledButton>
    );
  }

  return (
    <StyledButton onClick={handleClick}>
      <StyledTokenIcon src={getTokenSource(from)} alt="icon" />
      <StyledButtonText>{from}</StyledButtonText>
      <StyledIcon path={mdiChevronRight} size={1} />
      <StyledTokenIcon src={getTokenSource(to)} alt="icon" />
      <StyledButtonText>{to}</StyledButtonText>
    </StyledButton>
  );
};

export default TabButton;
