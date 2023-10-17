import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import metamaskIcon from "../../assets/images/metamask-logo.svg";
import { EllipsisOutlined } from "@ant-design/icons";
// import { useChainMutation } from "queries/useChainMutation";
// import { reapchainTestNet } from "constants/network";
import { useChainQuery } from "queries/useChainQuery";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { displayShortHexAddress } from "utils/util";
import { Button, Dropdown, MenuProps, message } from "antd";
import HeaderMetamaskContext from "components/header/HeaderMetamaskContext";

const StyledContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid transparent;
  cursor: pointer;
  width: 165px;
  height: 44px;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;
  font-weight: 700;
  border-radius: 12px;
  border: 1.5px solid transparent;

  &: hover {
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyledDropdown = styled(Dropdown)`
  background-color: ${colors.white};
  border: 1px solid transparent;
  cursor: pointer;
  width: 165px;
  height: 44px;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 12px;
  border: 1.5px solid transparent;

  &: hover {
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyldNotConnected = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  color: ${colors.godong};
`;

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

type Props = {};

const HeaderMetamask: React.FC<Props> = () => {
  const { provider, address, isActive, connectWeb3, disconnectWeb3 } =
    useWeb3Context();

  // const handleClickMetamask = useCallback(async () => {
  //   connectWeb3("injected");
  // }, []);

  const connectMetamask = () => {
    connectWeb3("injected");
  };

  const disconnectMetamask = () => {
    disconnectWeb3();
  };

  // const [messageApi, contextHolder] = message.useMessage();
  // const showMessage = (text: string) => {
  //   messageApi.info(text);
  // };

  // return (
  //   <StyledContainer onClick={handleClickMetamask}>
  //     {contextHolder}
  //     isActive : {isActive ? "true" : "false"}
  //     isActivating : {isActivating ? "true" : "false"}
  //     address : {address ? displayShortHexAddress(address) : "-"}
  //   </StyledContainer>
  // );

  const [dropdownMenu] = useState<MenuProps>({
    items: [
      {
        label: (
          <StyledMenuItem onClick={disconnectMetamask}>
            <a>Disconnect</a>
          </StyledMenuItem>
        ),
        key: 1,
      },
    ],
    style: {
      backgroundColor: colors.realWhite,
      border: "1.5px solid transparent",
      borderColor: colors.pointPink,
    },
  });

  useEffect(() => {
    // if (!provider) return;
    // const aa = provider.getSigner();
  }, [provider]);

  if (!isActive) {
    return (
      <StyledContainer onClick={connectMetamask}>
        <StyldNotConnected>Connect MetaMask</StyldNotConnected>
      </StyledContainer>
    );
  }

  return (
    <StyledDropdown
      menu={dropdownMenu}
      placement={"bottomLeft"}
      trigger={["click"]}
      overlayStyle={{ color: colors.white }}
    >
      <Button type="link">
        <HeaderMetamaskContext address={address} />
      </Button>
    </StyledDropdown>
  );
};

export default HeaderMetamask;
