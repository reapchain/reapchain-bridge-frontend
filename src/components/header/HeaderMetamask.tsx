import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import metamaskIcon from "../../assets/images/metamask-logo.svg";
// import { useChainMutation } from "queries/useChainMutation";
// import { reapchainTestNet } from "constants/network";
import { useChainQuery } from "queries/useChainQuery";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { displayShortHexAddress } from "utils/util";
import { message } from "antd";
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
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyldNotConnected = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  color: ${colors.godong};
`;

type Props = {};

const HeaderMetamask: React.FC<Props> = () => {
  const { provider, address, isActive, connectWeb3 } = useWeb3Context();

  const handleClickMetamask = useCallback(async () => {
    connectWeb3("injected");
  }, []);

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

  useEffect(() => {
    // console.log("provider : ", provider);
    // if (!provider) return;
    // const aa = provider.getSigner();
  }, [provider]);

  if (!isActive) {
    return (
      <StyledContainer onClick={handleClickMetamask}>
        <StyldNotConnected></StyldNotConnected>
        <div>{"Connect MetaMask"}</div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer onClick={handleClickMetamask}>
      <HeaderMetamaskContext address={address} />
    </StyledContainer>
  );
};

export default HeaderMetamask;
