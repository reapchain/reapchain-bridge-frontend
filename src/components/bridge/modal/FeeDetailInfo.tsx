import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { getBgIconSource, getIconSource, getTokenSource } from "utils/util";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import icon from "assets/images/ellipse.svg";
import { WalletType } from "queries/useWalletType";
import { Token } from "types/chain";
import { bridgeFee, chainFee } from "constants/bridgeConfig";
import { formatEther } from "@ethersproject/units";
import { formatFixed } from "@ethersproject/bignumber";

const StyledContainer = styled.div``;
const StyledList = styled.div`
  padding: 0px 20px;
`;
const StyledItem = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledToken = styled.div`
  display: flex;
  align-items: center;
`;
const StyledRatio = styled.div`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 800;
`;
const StyledImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 2px;
  margin-right: 2px;
`;
const StyledItemTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledItemValue = styled.div`
  font-weight: 700;
`;
const StyledIcon = styled.img`
  margin-top: 2px;
  width: 4px;
  height: 4px;
  margin-right: 6px;
`;
const StyledTokenIcon = styled.img`
  width: 12px;
  height: 12px;
  padding-right: 4px;
`;

type Props = {
  targetWallet: WalletType;
  fromToken: Token;
  toToken: Token;
  sendAmount: string;
  receiveAmount: string;
};

const FeeDetailInfo: React.FC<Props> = ({ targetWallet }) => {
  if (targetWallet === "MetaMask") {
    return (
      <StyledContainer>
        <StyledList>
          <StyledItem>
            <StyledItemTitle>
              <StyledIcon src={icon} />
              Bridge Rate
            </StyledItemTitle>
            <StyledToken>
              <StyledTokenIcon src={getTokenSource("cREAP")} alt="icon" />
              <StyledItemValue>cREAP&nbsp;=&nbsp;</StyledItemValue>
              <StyledTokenIcon src={getTokenSource("REAP")} alt="icon" />
              <StyledItemValue>REAP&nbsp;:&nbsp;</StyledItemValue>
              <StyledRatio>1 : 1</StyledRatio>
            </StyledToken>
          </StyledItem>
          <StyledItem>
            <StyledItemTitle>
              <StyledIcon src={icon} />
              Fee
              <Popover content={<div>Fee...</div>} title="Fee">
                <InfoCircleOutlined style={{ marginLeft: "6px" }} />
              </Popover>
            </StyledItemTitle>
            <StyledItemValue>Ethereum Tx Fee</StyledItemValue>
          </StyledItem>
          <StyledItem>
            <StyledItemTitle>
              <StyledIcon src={icon} />
              Estimated Time of Arrival
              <Popover
                content={<div>Estimated Time of Arrival</div>}
                title="Estimated Time of Arrival"
              >
                <InfoCircleOutlined style={{ marginLeft: "4px" }} />
              </Popover>
            </StyledItemTitle>
            <StyledItemValue>about 20 minutes</StyledItemValue>
          </StyledItem>
        </StyledList>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledList>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Bridge Rate
          </StyledItemTitle>
          <StyledToken>
            <StyledTokenIcon src={getTokenSource("REAP")} alt="icon" />
            <StyledItemValue>REAP&nbsp;:&nbsp;</StyledItemValue>
            <StyledTokenIcon src={getTokenSource("cREAP")} alt="icon" />
            <StyledItemValue>cREAP&nbsp;=&nbsp;</StyledItemValue>
            <StyledRatio>1 : 1</StyledRatio>
          </StyledToken>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Fee(Bridge)
            <Popover content={<div>Bridge Fee</div>} title="Fee">
              <InfoCircleOutlined style={{ marginLeft: "6px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>
            {parseInt(formatEther(bridgeFee))} REAP
          </StyledItemValue>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Fee(Chain)
            <Popover content={<div>Chain Fee</div>} title="Fee">
              <InfoCircleOutlined style={{ marginLeft: "6px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>
            {parseInt(formatEther(chainFee))} REAP
          </StyledItemValue>
        </StyledItem>
        <StyledItem>
          <StyledItemTitle>
            <StyledIcon src={icon} />
            Estimated Time of Arrival
            <Popover
              content={<div>Estimated Time of Arrival</div>}
              title="Estimated Time of Arrival"
            >
              <InfoCircleOutlined style={{ marginLeft: "4px" }} />
            </Popover>
          </StyledItemTitle>
          <StyledItemValue>20 minutes</StyledItemValue>
        </StyledItem>
      </StyledList>
    </StyledContainer>
  );
};

export default FeeDetailInfo;
