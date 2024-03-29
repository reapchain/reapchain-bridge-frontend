import React, { useState } from "react";
import styled from "styled-components";
import logoIcon from "../../assets/images/logo.png";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";
import { Select } from "antd";
import { networks } from "constants/network";
import { Chain } from "types/chain";
import reapchainIcon from "assets/images/reapchain.png";
import ethereumIcon from "assets/images/ethereum.png";

type Props = {
  chainName: string;
  onClick: () => void;
};

const StyledChainSelectButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1.5px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
  color: ${colors.godong};
  padding: 6px 12px;
  margin-left: 12px;
  margin-right: auto;
  height: 24px;

  &: hover {
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyledSelect = styled(Select)``;
// const StyledSelect = styled(Select)`
//   width: 200px;
//   height: 30px;
// `;

const StyledChainLogo = styled.div``;
const StyledChainLogoImage = styled.img`
  width: 18px;
  height: auto;
  margin-right: 8px;
`;

const chainList: Chain[] = [
  networks.ethereum_mainnet,
  networks.ethereum_sepolia,
  networks.reapchain_mainnet,
  networks.reapchain_testnet,
];

const getIcon = (logo: string) => {
  if (logo === "reapchain") {
    return reapchainIcon;
  } else if (logo === "ethereum") {
    return ethereumIcon;
  } else {
    return reapchainIcon;
  }
};

const ChainSelectButton: React.FC<Props> = ({ chainName, onClick }) => {
  // const [selected, setSelected] = useState<Chain>(chainList[0]);

  return (
    <StyledChainSelectButton onClick={onClick}>
      <img src={logoIcon} alt="icon" style={{ width: 20, height: 20 }} />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {chainName}
      </div>
      <Icon path={mdiChevronDown} size={1} style={{ opacity: 0.5 }} />
    </StyledChainSelectButton>
  );
};

export default ChainSelectButton;
