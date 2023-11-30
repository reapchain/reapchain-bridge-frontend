import colors from "assets/colors";
import React, { useState } from "react";
import styled from "styled-components";
import { Progress, Typography } from "antd";
import { abbrAddress, abbrAddress2 } from "utils/util";
import { getEthereumTxInfo, getReapchainTxInfo } from "apis/api";
import { reapchainKeplrConfig } from "constants/keplrConfig";
import { useInterval } from "react-use";
import {
  ethereumNetworkConfig,
  reapchainNetworkConfig,
} from "constants/networkConfig";
import dotIcon from "assets/images/ellipse.svg";
import checkIcon from "assets/images/progress_check.svg";
const { Link } = Typography;

const StyledContainer = styled.div``;
const StyledTxSendWrapper = styled(Link)`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;
  text-align: center;
`;
const StyledTitleText = styled.div`
  color: ${colors.lightblue};
  font-size: 16px;
  font-weight: 700;
`;
const StyledTxDesc = styled.div`
  color: ${colors.lightblue};
  font-size: 18px;
  font-weight: 700;
`;
const TokenTransferWrapper = styled.div`
  border-radius: 24px;
  padding: 8px 16px;
  margin-bottom: 32px;
  text-align: center;
  background-color: ${colors.background};
`;
const StyledSubTitleText = styled.div`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 600;
`;
const ProgressWrapper = styled.div`
  padding-bottom: 12px;
`;
const ProgressCheckIcon = styled.img`
  position: absolute;
  margin-top: 52px;
  left: 50%;
  transform: translate(-50%);
  color: ${colors.linear01};
`;
const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
`;
const StyledLinkButton = styled(Link)`
  padding: 0px;
  font-size: 16px;
  font-weight: 700;
  text-underline-offset: 4px;
`;
const StyledItemTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledDotIcon = styled.img`
  margin-top: 2px;
  width: 4px;
  height: 4px;
  margin-right: 6px;
`;

export interface SendTxInfo {
  isSend: boolean;
  type: "SendToEth" | "SendToCosmos" | "ERC20Approve" | null;
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
      window.open(
        `${ethereumNetworkConfig.explorerUrl}/tx/${txInfo.hash}`,
        "_blank"
      );
    }
  };
  const handleClickAccount = () => {
    if (targetWallet === "Keplr") {
      window.open(
        `${reapchainNetworkConfig.explorerUrl}/account/${txInfo.address}`,
        "_blank"
      );
    } else {
      window.open(
        `${ethereumNetworkConfig.explorerUrl}/address/${txInfo.address}`,
        "_blank"
      );
    }
  };
  const displayTxDesc = () => {
    if (txInfo.type === "SendToCosmos") {
      return "REAPt → REAP";
    } else if (txInfo.type === "SendToEth") {
      return "REAP → REAPt";
    } else if (txInfo.type === "ERC20Approve") {
      return "Approve ERC20 Token";
    } else {
      return txInfo.type;
    }
  };

  return (
    <StyledContainer>
      <StyledTxSendWrapper>
        <ProgressWrapper>
          <Progress
            percent={percent}
            type="circle"
            strokeWidth={10}
            size={135}
            trailColor={colors.background}
            strokeColor={colors.linear01}
            showInfo={false}
          />
          {showInfo && <ProgressCheckIcon src={checkIcon} />}
        </ProgressWrapper>
        <TitleWrapper>
          <StyledTitleText>Tx Sending</StyledTitleText>
        </TitleWrapper>
        <TokenTransferWrapper>
          <StyledTxDesc>{displayTxDesc()}</StyledTxDesc>
        </TokenTransferWrapper>
        <LinkWrapper>
          <StyledItemTitle>
            <StyledDotIcon src={dotIcon} />
            <StyledSubTitleText>Tx Hash :</StyledSubTitleText>
          </StyledItemTitle>
          <StyledLinkButton
            style={{
              color: colors.white,
              textDecorationLine: "underline",
            }}
            onClick={handleClickTxHash}
          >
            {abbrAddress(txInfo.hash, 12)}
          </StyledLinkButton>
        </LinkWrapper>
        <LinkWrapper>
          <StyledItemTitle>
            <StyledDotIcon src={dotIcon} />
            <StyledSubTitleText>Account Info : </StyledSubTitleText>
          </StyledItemTitle>
          <StyledLinkButton
            style={{
              color: colors.white,
              textDecorationLine: "underline",
            }}
            onClick={handleClickAccount}
          >
            {targetWallet === "Keplr"
              ? abbrAddress2(txInfo.address, 16, 8)
              : abbrAddress2(txInfo.address, 12, 8)}
          </StyledLinkButton>
        </LinkWrapper>
      </StyledTxSendWrapper>
    </StyledContainer>
  );
};

export default BridgeTxSend;
