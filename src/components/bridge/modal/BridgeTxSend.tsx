import colors from "assets/colors";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Progress, Typography } from "antd";
import { abbrAddress, abbrAddress2 } from "utils/util";
import { networks } from "constants/network";
import { getEthereumTxInfo, getReapchainTxInfo } from "apis/api";
import { reapchainKeplrConfig } from "constants/keplrConfig";
import { useInterval } from "react-use";
import {
  ethereumNetworkConfig,
  reapchainNetworkConfig,
} from "constants/networkConfig";
const { Link } = Typography;

const conicColors = { "0%": "#87d068", "50%": "#ffe58f", "100%": "#ffccc7" };

const StyledContainer = styled.div`
  flex: 1;
  margin-top: -12px;
`;
const TitleWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;
`;
const StyledTitleText = styled.div`
  color: ${colors.godong};
  font-size: 18px;
  font-weight: 700;
`;
const StyledSubTitleText = styled.span`
  color: ${colors.godong};
  font-size: 16px;
  font-weight: 600;
`;
const ProgressWrapper = styled.div`
  width: 125px;
  height: 125px;
`;
const LinkArea = styled.div`
  flex-direction: column;
  padding-left: 20px;
`;
const LinkWrapper = styled.div`
  margin-top: 4px;
`;
const StyledLinkButton = styled(Link)`
  padding: 0px;
  font-size: 16px;
  font-weight: 700;
  text-underline-offset: 3px;
`;

const StyledTxSendWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  padding-bottom: 16px;
`;

export interface SendTxInfo {
  isSend: boolean;
  hash: string;
  address: string;
  error: any;
}

type Props = {
  targetWallet: string;
  txInfo: SendTxInfo;
};

const BridgeTxSend: React.FC<Props> = ({ targetWallet, txInfo }) => {
  const [percent, setPercent] = useState<number>(20);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useInterval(() => fetchTxStatus(), 1000);

  const fetchTxStatus = async () => {
    console.log("fetchTxStatus");
    if (!showInfo) {
      if (targetWallet === "Keplr") {
        const res = await getReapchainTxInfo(
          reapchainKeplrConfig.rest,
          txInfo.hash
        );
        if (!res) {
          const prevPercent = percent >= 100 ? percent - 100 : percent;
          const nowPercent = prevPercent + 10;
          setPercent(nowPercent);
        } else {
          setPercent(100);
          setShowInfo(true);
        }
      } else if (targetWallet === "MetaMask") {
        const res = await getEthereumTxInfo(txInfo.hash);
        console.log("res : ", res);
        if (!res) {
          const prevPercent = percent >= 100 ? percent - 100 : percent;
          const nowPercent = prevPercent + 10;
          setPercent(nowPercent);
        } else {
          setPercent(100);
          setShowInfo(true);
        }
      }
    }
  };

  const handleClickTxHash = () => {
    if (targetWallet === "Keplr") {
      window.open(
        `${reapchainNetworkConfig.explorerUrl}/tx/${txInfo.hash}`,
        "_blank"
      );
    } else {
      window.open(`${ethereumNetworkConfig}/tx/${txInfo.hash}`, "_blank");
    }
  };
  const handleClickAccount = () => {
    if (targetWallet === "Keplr") {
      window.open(
        `${networks.reapchain_testnet.explorerUrl}/account/${txInfo.address}`,
        "_blank"
      );
    } else {
      window.open(
        `${networks.reapchain_testnet.explorerUrl}/address/${txInfo.address}`,
        "_blank"
      );
    }
  };

  return (
    <StyledContainer>
      <StyledTxSendWrapper>
        <ProgressWrapper>
          <Progress
            percent={percent}
            type="circle"
            strokeWidth={8}
            size={125}
            strokeColor={conicColors}
            showInfo={showInfo}
          />
        </ProgressWrapper>
        <LinkArea>
          <TitleWrapper>
            <StyledTitleText>Tx Sending[Reap → Token]</StyledTitleText>
          </TitleWrapper>
          <LinkWrapper>
            <StyledSubTitleText>Tx Hash : </StyledSubTitleText>
            <StyledLinkButton
              style={{
                color: colors.pointPink,
                textDecorationLine: "underline",
              }}
              onClick={handleClickTxHash}
            >
              {abbrAddress(txInfo.hash, 12)}
            </StyledLinkButton>
          </LinkWrapper>
          <LinkWrapper>
            <StyledSubTitleText>Account Info : </StyledSubTitleText>
            <StyledLinkButton
              style={{
                color: colors.pointPink,
                textDecorationLine: "underline",
              }}
              onClick={handleClickAccount}
            >
              {targetWallet === "Keplr"
                ? abbrAddress2(txInfo.address, 16, 8)
                : abbrAddress2(txInfo.address, 12, 8)}
            </StyledLinkButton>
          </LinkWrapper>
        </LinkArea>
      </StyledTxSendWrapper>
    </StyledContainer>
  );
};

export default BridgeTxSend;
