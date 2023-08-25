import React from "react";
import styled from "styled-components";
import HeaderLinkButton from "./HeaderLinkButton";
import HeaderTitle from "./HeaderTitle";
import HeaderHomeButton from "./HeaderHomeButton";
import HeaderOptionButton from "./HeaderOptionButton";
import HeaderMetamaskButtom from "./HeaderMetamaskButtom";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 0px;
  z-index: 10;
  justify-content: space-between;
`;

const StyledHeaderItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderItemWrapper>
        <HeaderHomeButton />
        <HeaderLinkButton
          tooltip="Dashboard"
          href="https://dashboard.reapchain.org/dashboard"
        />
        <HeaderLinkButton
          tooltip="Explorer"
          href="https://dashboard.reapchain.org/blocks"
        />
        <HeaderLinkButton
          tooltip="Staking"
          href="https://dashboard.reapchain.org/validators"
        />
      </StyledHeaderItemWrapper>
      <StyledHeaderItemWrapper>
        <HeaderTitle title={"rBridge"} />
      </StyledHeaderItemWrapper>
      <StyledHeaderItemWrapper>
        <HeaderMetamaskButtom />
        <HeaderOptionButton />
      </StyledHeaderItemWrapper>
    </StyledHeader>
  );
};

export default Header;
