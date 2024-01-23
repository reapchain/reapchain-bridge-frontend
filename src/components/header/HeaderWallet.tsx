import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { Button, Dropdown, DropdownProps, message } from "antd";
import HeaderWalletContext from "components/header/HeaderWalletContext";
import { useWalletQuery } from "queries/useWalletType";
import { connectKeplrWallet } from "utils/keplr";
import { abbrAddress2, displayShortHexAddress } from "utils/util";
import {
  initKeplrWallet,
  useKeplrMutation,
  useKeplrQuery,
} from "queries/useKeplrWallet";
import { getItem, setItem } from "utils/localStorage";
import { localStorageKey } from "constants/storage";
import {
  ethereumNetworkConfig,
  reapchainNetworkConfig,
} from "constants/networkConfig";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const StyledContainer = styled.div`
  background-color: ${colors.blue};
  border: 1px solid transparent;
  cursor: pointer;
  width: 200px;
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
`;

const StyledDropdown = styled(Dropdown)`
  background-color: ${colors.blue};
  border: 1px solid transparent;
  cursor: pointer;
  width: 200px;
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
`;

const StyldNotConnected = styled.div`
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
`;

const StyledMenuItem = styled.div`
  font-weight: 600;
  color: ${colors.darkblue01};
  cursor: pointer;

  padding: 6px 10px;
  border-radius: 8px;

  &: hover {
    background-color: ${colors.primary};

    div {
      color: ${colors.white};
      font-weight: 600;
    }
  }
`;

const StyledButtonText = styled.div``;

const StyledAddress = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  color: ${colors.darkblue01};
`;

const dropDownStyle = {
  backgroundColor: colors.secondary,
  border: `1px solid`,
  borderColor: colors.darkblue01,
  marginTop: "12px",
};

type Props = {};

const HeaderWallet: React.FC<Props> = () => {
  const { data: walletData } = useWalletQuery();
  const targetWallet = walletData ?? "MetaMask";
  const { provider, address, isActive, connectWeb3, disconnectWeb3 } =
    useWeb3Context();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: keplrMutate } = useKeplrMutation();
  const { data: keplrData } = useKeplrQuery();
  const keplrWallet = keplrData ?? initKeplrWallet;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [copyFlag, setCopyFlag] = useState(false);

  const handleMenuClick = (e: any) => {
    if (e.key !== "1") {
      setOpenDropdown(false);
    }
    console.log(e);
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (
    nextOpen: boolean
  ) => {
    setOpenDropdown(nextOpen);
  };

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
      const keplr = await connectKeplrWallet(reapchainNetworkConfig);
      if (!keplr) {
        return;
      }
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

  const disconnectWallet = () => {
    if (targetWallet === "MetaMask") {
      disconnectWeb3();
    } else if (targetWallet === "Keplr") {
      keplrMutate({
        isActive: false,
        address: "",
        name: "",
      });
      setItem(localStorageKey.KEY_KEPLR_ACTIVE, "inactive");
      window.removeEventListener("keplr_keystorechange", () => {});
    }
  };

  const getAddress = () => {
    if (targetWallet === "MetaMask") {
      return address;
    } else {
      return keplrWallet.address;
    }
  };

  const copyAddress = async () => {
    setCopyFlag(true);
    await navigator.clipboard.writeText(getAddress());

    setTimeout(() => {
      setCopyFlag(false);
    }, 1500);
  };

  const handleClickLinkButton = useCallback(() => {
    if (targetWallet === "MetaMask") {
      window.open(
        `${ethereumNetworkConfig.explorerUrl}/address/${address}`,
        "_blank"
      );
    } else {
      window.open(
        `${reapchainNetworkConfig.explorerUrl}/account/${keplrWallet.address}`,
        "_blank"
      );
    }
  }, [address, targetWallet, keplrWallet]);

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
      menu={{
        items: [
          {
            label: (
              <StyledMenuItem onClick={copyAddress}>
                <StyledAddress>
                  {copyFlag ? (
                    <CheckOutlined style={{ paddingRight: "4px" }} />
                  ) : (
                    <CopyOutlined style={{ paddingRight: "4px" }} />
                  )}
                  <StyledButtonText>
                    {abbrAddress2(getAddress(), 8, 6)}
                  </StyledButtonText>
                </StyledAddress>
              </StyledMenuItem>
            ),
            key: 1,
          },
          {
            label: (
              <StyledMenuItem onClick={handleClickLinkButton}>
                <StyledButtonText>Account Info</StyledButtonText>
              </StyledMenuItem>
            ),
            key: 2,
          },
          {
            label: (
              <StyledMenuItem onClick={disconnectWallet}>
                <StyledButtonText>Disconnect</StyledButtonText>
              </StyledMenuItem>
            ),
            key: 3,
          },
        ],
        onClick: handleMenuClick,
        style: dropDownStyle,
      }}
      open={openDropdown}
      onOpenChange={handleOpenChange}
      placement={"bottomLeft"}
      trigger={["click"]}
      overlayStyle={{ color: colors.white }}
    >
      <Button type="link">
        {targetWallet === "MetaMask" ? (
          <HeaderWalletContext
            walletType={targetWallet}
            address={address}
            displayAddress={displayShortHexAddress(address)}
          />
        ) : (
          <HeaderWalletContext
            walletType={targetWallet}
            address={keplrWallet.address}
            displayAddress={keplrWallet.name}
          />
        )}
      </Button>
    </StyledDropdown>
  );
};

export default HeaderWallet;
