import colors from "assets/colors";
import React from "react";
import styled from "styled-components";
import { Chain } from "types/chain";
import reapchainIcon from "assets/images/reapchain.png";
import ethereumIcon from "assets/images/ethereum.png";

type Props = {
  item: Chain;
};

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
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
    border: 2px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyledImageIcon = styled.img`
  margin-left: 4px;
  margin-right: 4px;
`;

const ChainListItem: React.FC<Props> = ({ item }) => {
  const getIcon = (logo: string) => {
    console.log(logo);
    if (logo === "reapchain") {
      return reapchainIcon;
    } else if (logo === "ethereum") {
      return ethereumIcon;
    } else {
      return reapchainIcon;
    }
  };

  return (
    <StyledItem>
      <StyledImageIcon
        src={getIcon(item.icon)}
        alt="icon"
        style={{ width: 28, height: 28 }}
      />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {item.chainName}
      </div>
    </StyledItem>
  );
};

export default ChainListItem;
