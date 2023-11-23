import React, { useMemo } from "react";
import { styled } from "styled-components";
import colors from "assets/colors";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.div<{ active: boolean }>`
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

const StyledButtonText = styled.div<{ active: boolean }>`
  text-align: left;
  vertical-align: top;
  font-size: 18px;
  font-weight: 700;
  line-height: 140%;
  color: ${(props) => (props.active ? colors.white : colors.darkblue01)};
`;

const StyledIcon = styled(Icon)<{ active: boolean }>`
  color: ${(props) => (props.active ? colors.lightblue : colors.darkblue01)};
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
    navigate(`/${value}`);
  };

  const isActive = useMemo(() => {
    return value === selected;
  }, [value, selected]);

  return (
    <StyledButton active={isActive} onClick={handleClick}>
      <StyledButtonText active={isActive}>{from}</StyledButtonText>
      <StyledIcon active={isActive} path={mdiChevronRight} size={1} />
      <StyledButtonText active={isActive}>{to}</StyledButtonText>
    </StyledButton>
  );
};

export default TabButton;
