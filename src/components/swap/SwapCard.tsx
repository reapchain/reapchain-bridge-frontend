import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import ChainSelectButton from "./ChainSelectButton";
import SwapSendArea from "./SwapSendArea";
import ChangeFromToButton from "./ChangeFromToButton";
import SwapReceiveArea from "./SwapReceiveArea";
import ConnectWallerButton from "./ConnectWallerButton";
import colors from "../../assets/colors";

const StyledSwapCard = styled(Card)`
  background-color: ${colors.primary};
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: ${colors.secondary4};
  color: ${colors.white};
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
        From <ChainSelectButton chainName={"Reap Token"} />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapSendArea />
      </StyledContentWrapper>

      <ChangeFromToButton />

      <StyledSelectTokenWrapper>
        To <ChainSelectButton chainName={"Reap Coin"} />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapReceiveArea />
      </StyledContentWrapper>

      <StyledConnectWalletWrapper>
        <ConnectWallerButton />
      </StyledConnectWalletWrapper>
    </StyledSwapCard>
  );
};

export default SwapCard;
