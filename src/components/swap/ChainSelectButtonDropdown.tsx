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
import ethereumIcon from "assets/images/reapchain.png";

type Props = {
  chainName: string;
};

const StyledChainSelectButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
  color: ${colors.godong};
  padding: 6px 12px;
  margin-left: 12px;
  margin-right: auto;
  height: 24px;
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

const ChainSelectButton: React.FC<Props> = ({ chainName }) => {
  const [selected, setSelected] = useState<Chain>(chainList[0]);

  return (
    <StyledChainSelectButton>
      <StyledSelect
        showSearch
        value={selected.chainName}
        onChange={(obj) => {
          console.log(obj);
        }}
      >
        {chainList.map((chain: Chain) => {
          return (
            <Select.Option value={chain.chainId} key={chain.chainId}>
              <StyledChainLogo>
                <StyledChainLogoImage
                  style={{ marginBottom: "-4px" }}
                  src={getIcon(chain.icon)}
                  alt={"chain logo"}
                />
                {chain.displayName}
              </StyledChainLogo>
            </Select.Option>
          );
        })}
      </StyledSelect>
      {/* <img src={logoIcon} alt="icon" style={{ width: 20, height: 20 }} />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {chainName}
      </div>
      <Icon path={mdiChevronDown} size={1} style={{ opacity: 0.5 }} /> */}
    </StyledChainSelectButton>
  );
};

export default ChainSelectButton;
