import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import metamaskIcon from "../../assets/images/metamask-logo.svg";
import keplrIcon from "../../assets/images/keplr-logo.svg";

const StyledImage = styled.img`
  margin-left: -4px;
  padding-right: 8px;
`;

const StyledContent = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  font-size: 14px;
  color: ${colors.white};
`;

type Props = {
  walletType: "MetaMask" | "Keplr";
  address: string;
  displayAddress: string;
};

const HeaderWalletContext: React.FC<Props> = ({
  walletType,
  address,
  displayAddress,
}) => {
  const getWalletIcon = () => {
    if (walletType === "MetaMask") {
      return metamaskIcon;
    } else {
      return keplrIcon;
    }
  };

  return (
    <>
      <StyledImage
        src={getWalletIcon()}
        width={24}
        height={24}
        alt="walletImage"
      />
      <StyledContent>{displayAddress}</StyledContent>
    </>
  );
};

export default HeaderWalletContext;
