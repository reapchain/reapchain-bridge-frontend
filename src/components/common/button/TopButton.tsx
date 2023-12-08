import React from "react";
import { Tooltip } from "antd";
import { styled } from "styled-components";
import colors from "assets/colors";
import reapchainIcon from "assets/images/logo.png";
import dashboardIcon from "assets/images/dashboard_icon.svg";
import explorerIcon from "assets/images/explorer_icon.svg";
import stakingIcon from "assets/images/staking_icon.svg";

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

const StyledIcon = styled.img`
  width: 16px;
  height: 16px;
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
  tooltip: string;
  href: string;
};

const TopButton: React.FC<Props> = ({ text, tooltip, href }) => {
  const handleClickLink = () => {
    window.open(href, "_blank");
  };

  const getIcon = () => {
    if (text === "Dashboard") {
      return dashboardIcon;
    } else if (text === "Explorer") {
      return explorerIcon;
    } else if (text === "Staking") {
      return stakingIcon;
    } else {
      return reapchainIcon;
    }
  };

  return (
    <Tooltip placement="bottom" title={tooltip}>
      <StyledButton onClick={handleClickLink}>
        <StyledIcon src={getIcon()} alt="icon" />
        <StyledButtonText>{text}</StyledButtonText>
      </StyledButton>
    </Tooltip>
  );
};

export default TopButton;
