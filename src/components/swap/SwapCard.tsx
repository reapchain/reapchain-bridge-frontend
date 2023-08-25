import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import ChainSelectButton from "./ChainSelectButton";
import SwapSendArea from "./SwapSendArea";
import ChangeFromToButton from "./ChangeFromToButton";
import SwapReceiveArea from "./SwapReceiveArea";
import ConnectWalletButton from "./ConnectWalletButton";
import colors from "../../assets/colors";

const StyledSwapCard = styled(Card)`
  background-color: ${colors};
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: ${colors.pointPink};
  color: ${colors.godong};
  padding: 12px 12px;
  font-weight: 600;
`;

const StyledSelectTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
`;

const StyledContentWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
`;

const StyledConnectWalletWrapper = styled.div`
  margin-top: 36px;
`;

const SwapCard: React.FC = () => {
  return (
    <StyledSwapCard style={{ width: 550 }}>
      <StyledSelectTokenWrapper>
        From <ChainSelectButton chainName={"REAP Token"} />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapSendArea />
      </StyledContentWrapper>

      <ChangeFromToButton />

      <StyledSelectTokenWrapper>
        To <ChainSelectButton chainName={"REAP Coin"} />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapReceiveArea />
      </StyledContentWrapper>

      <StyledConnectWalletWrapper>
        <ConnectWalletButton />
      </StyledConnectWalletWrapper>
    </StyledSwapCard>
  );
};

export default SwapCard;
