import React from "react";
import { styled } from "styled-components";
import colors from "assets/colors";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

const StyledButton = styled.div`
  height: 48px;

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
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  color: ${colors.darkblue01};
`;

type Props = {
  from: string;
  to: string;
  active: boolean;
  onClick?: () => {};
};

const TabButton: React.FC<Props> = ({ from, to, active, onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <StyledButton onClick={handleClick}>
      <StyledButtonText>{from}</StyledButtonText>
      <Icon
        path={mdiChevronRight}
        size={1}
        style={{ color: `${colors.darkblue02}` }}
      />
      <StyledButtonText>{to}</StyledButtonText>
    </StyledButton>
  );
};

export default TabButton;
