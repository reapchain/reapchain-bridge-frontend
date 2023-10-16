import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

type MenuItemProps = {
  $first?: boolean | undefined;
};

const StyledMenuItem = styled.div<MenuItemProps>`
  a {
    font-weight: 600;
    color: ${colors.darkGray1};
  }

  &: hover {

  }
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
      <a>{text}</a>
    </StyledMenuItem>
  );
};

export default HeaderOptionDropdownItem;
