import React from "react";
import styled from "styled-components";
import HeaderTitle from "./HeaderTitle";
import HeaderOptionButton from "./HeaderOptionButton";
import HeaderMetamask from "./HeaderMetamask";
import TopButton from "components/common/button/TopButton";
import { reapchainNetworkConfig } from "constants/networkConfig";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 0px;
  z-index: 10;
  justify-content: space-between;
`;

const StyledHeaderItemWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledTitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderItemWrapper>
        {/* <HeaderHomeButton /> */}
        <TopButton
          text={"Dashboard"}
          tooltip={"Dashboard"}
          href={reapchainNetworkConfig.explorerUrl}
        />
        <TopButton
          text={"Explorer"}
          tooltip={"Explorer"}
          href={`${reapchainNetworkConfig.explorerUrl}/blocks`}
        />
        <TopButton
          text={"Staking"}
          tooltip={"Staking"}
          href={`${reapchainNetworkConfig.explorerUrl}/staking`}
        />
      </StyledHeaderItemWrapper>
      <StyledTitleWrapper>
        <HeaderTitle title={"rBridge"} />
      </StyledTitleWrapper>
      <StyledHeaderItemWrapper>
        <HeaderMetamask />
        <HeaderOptionButton />
      </StyledHeaderItemWrapper>
    </StyledHeader>
  );
};

export default Header;
