import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { Button, Dropdown, MenuProps, message } from "antd";
import HeaderMetamaskContext from "components/header/HeaderMetamaskContext";
import { useWalletQuery } from "queries/useWalletType";
import { networks } from "constants/network";
import { connectKeplrWallet } from "utils/keplr";
import { displayShortHexAddress } from "utils/util";
import {
  initKeplrWallet,
  useKeplrMutation,
  useKeplrQuery,
} from "queries/useKeplrWallet";
import { getItem, setItem } from "utils/localStorage";
import { localStorageKey } from "constants/storage";

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
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
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

const dropDownStyle = {
  backgroundColor: colors.realWhite,
  border: "1.5px solid transparent",
  borderColor: colors.pointPink,
};

type Props = {};

const HeaderMetamask: React.FC<Props> = () => {
  const { data: walletData } = useWalletQuery();
  const targetWallet = walletData ?? "MetaMask";
  const { provider, address, isActive, connectWeb3, disconnectWeb3 } =
    useWeb3Context();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: keplrMutate } = useKeplrMutation();
  const { data: keplrData } = useKeplrQuery();
  const keplrWallet = keplrData ?? initKeplrWallet;

  useEffect(() => {
    if (getItem(localStorageKey.KEY_KEPLR_ACTIVE) === "active") {
      if (targetWallet === "Keplr") {
        connectKeplr();

        window.addEventListener("keplr_keystorechange", () => {
          connectKeplr();
        });
      }
    }
  }, [targetWallet, isActive, address]);

  const connectKeplr = async () => {
    try {
      const keplr = await connectKeplrWallet(networks.reapchain_testnet);
      if (!keplr) {
        return;
      }
      console.log("keplr.account : ", keplr.account);
      const keplrWallet = {
        isActive: true,
        address: keplr.account.bech32Address,
        name: keplr.account.name,
      };
      keplrMutate(keplrWallet);
      return keplr;
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = () => {
    if (walletData === "MetaMask") {
      connectWeb3("injected");
    } else if (targetWallet === "Keplr") {
      connectKeplr();
    }
  };

  const disconnectWallet = (wallet: string) => {
    if (wallet === "MetaMask") {
      disconnectWeb3();
    } else if (wallet === "Keplr") {
      keplrMutate({
        isActive: false,
        address: "",
        name: "",
      });
      setItem(localStorageKey.KEY_KEPLR_ACTIVE, "inactive");
      window.removeEventListener("keplr_keystorechange", () => {});
    }
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

  const handleClickLinkButton = () => {
    console.log("targetWallet : ", targetWallet);
    if (targetWallet === "MetaMask") {
      window.open(
        `${networks.ethereum_sepolia.explorerUrl}/address/${address}`,
        "_blank"
      );
    } else {
      window.open(
        `${networks.reapchain_testnet.explorerUrl}/account/${keplrWallet.address}`,
        "_blank"
      );
    }
  };

  const [metamaskDropdown] = useState<MenuProps>({
    items: [
      {
        label: (
          <StyledMenuItem onClick={handleClickLinkButton}>
            <a>Account Info</a>
          </StyledMenuItem>
        ),
        key: 1,
      },
      {
        label: (
          <StyledMenuItem onClick={() => disconnectWallet("MetaMask")}>
            <a>Disconnect</a>
          </StyledMenuItem>
        ),
        key: 2,
      },
    ],
    style: dropDownStyle,
  });

  const [keplrDropdown] = useState<MenuProps>({
    items: [
      {
        label: (
          <StyledMenuItem onClick={handleClickLinkButton}>
            <a>Account Info</a>
          </StyledMenuItem>
        ),
        key: 1,
      },
      {
        label: (
          <StyledMenuItem onClick={() => disconnectWallet("Keplr")}>
            <a>Disconnect</a>
          </StyledMenuItem>
        ),
        key: 2,
      },
    ],
    style: dropDownStyle,
  });

  useEffect(() => {}, [provider]);

  if (
    (targetWallet === "MetaMask" && !isActive) ||
    (targetWallet === "Keplr" && !keplrWallet.isActive)
  ) {
    return (
      <StyledContainer onClick={connectWallet}>
        <StyldNotConnected>Connect {targetWallet}</StyldNotConnected>
      </StyledContainer>
    );
  }

  return (
    <StyledDropdown
      menu={targetWallet === "MetaMask" ? metamaskDropdown : keplrDropdown}
      placement={"bottomLeft"}
      trigger={["click"]}
      overlayStyle={{ color: colors.white }}
    >
      <Button type="link">
        {targetWallet === "MetaMask" ? (
          <HeaderMetamaskContext
            walletType={targetWallet}
            address={address}
            displayAddress={displayShortHexAddress(address)}
          />
        ) : (
          <HeaderMetamaskContext
            walletType={targetWallet}
            address={keplrWallet.address}
            displayAddress={keplrWallet.name}
          />
        )}
      </Button>
    </StyledDropdown>
  );
};

export default HeaderMetamask;
