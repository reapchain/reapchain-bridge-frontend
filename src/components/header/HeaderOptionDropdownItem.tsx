import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

const StyledMenuItem = styled.div`
  font-weight: 600;
  color: ${colors.darkblue01};
  cursor: pointer;

  padding: 6px 12px;
  border-radius: 8px;

  &: hover {
    background-color: ${colors.primary};

    div {
      color: ${colors.white};
      font-weight: 600;
    }
  }
`;

const StyledButtonText = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  color: ${colors.darkblue01};
`;

type Props = {
  href: string | undefined;
  text: string;
};

const HeaderOptionDropdownItem: React.FC<Props> = ({ href, text }) => {
  const handleClickLink = () => {
    window.open(href, "_blank");
  };

  return (
    <StyledMenuItem onClick={handleClickLink}>
      <StyledButtonText>{text}</StyledButtonText>
    </StyledMenuItem>
  );
};

export default HeaderOptionDropdownItem;
