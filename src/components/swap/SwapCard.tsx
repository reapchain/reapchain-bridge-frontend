import React, { useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import ChainSelectButton from "./ChainSelectButton";
import SwapSendArea from "./SwapSendArea";
import ChangeFromToButton from "./ChangeFromToButton";
import SwapReceiveArea from "./SwapReceiveArea";
import ConnectWalletButton from "./ConnectWalletButton";
import colors from "../../assets/colors";
import ChainSelectModal from "components/swap/ChainSelectModal";
import {
  useConnectionMutation,
  useConnectionQuery,
} from "queries/useChainTest";
import { networks } from "constants/network";

const StyledSwapCard = styled(Card)`
  background-color: ${colors.white};
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

const StyledFromToText = styled.div`
  width: 36px;
`;

const SwapCard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState("");

  const handleClickSelectFromChain = () => {
    setModalTarget("from");
    setModalOpen(true);
  };

  const handleClickSelectToChain = () => {
    setModalTarget("from");
    setModalOpen(true);
  };

  const handleCancelModal = () => {
    setModalTarget("");
    setModalOpen(false);
  };

  return (
    <StyledSwapCard style={{ width: 550 }}>
      <StyledSelectTokenWrapper>
        <StyledFromToText>From</StyledFromToText>
        <ChainSelectButton
          chainName={"REAP Token"}
          onClick={handleClickSelectFromChain}
        />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapSendArea />
      </StyledContentWrapper>

      <ChangeFromToButton />

      <StyledSelectTokenWrapper>
        <StyledFromToText>To</StyledFromToText>
        <ChainSelectButton
          chainName={"REAP Coin"}
          onClick={handleClickSelectToChain}
        />
      </StyledSelectTokenWrapper>

      <StyledContentWrapper>
        <SwapReceiveArea />
      </StyledContentWrapper>

      <StyledConnectWalletWrapper>
        <ConnectWalletButton />
      </StyledConnectWalletWrapper>
      <ChainSelectModal
        open={modalOpen}
        target={modalTarget}
        onCancel={handleCancelModal}
      />
    </StyledSwapCard>
  );
};

export default SwapCard;
