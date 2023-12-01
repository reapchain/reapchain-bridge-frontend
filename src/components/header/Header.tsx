import React, { useState } from "react";
import styled from "styled-components";
import HeaderTitle from "./HeaderTitle";
import HeaderOptionButton from "./HeaderOptionButton";
import HeaderWallet from "./HeaderWallet";
import TopButton from "components/common/button/TopButton";
import { reapchainNetworkConfig } from "constants/networkConfig";
import HistoryButton from "components/bridge/history/HistoryButton";
import HistoryModal from "components/bridge/history/HistoryModal";
import { useTxsHistory } from "queries/useTxsHistory";
import { useWalletQuery } from "queries/useWalletType";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { initKeplrWallet, useKeplrQuery } from "queries/useKeplrWallet";

const StyledHeader = styled.div`
  display: flex;
  z-index: 10;
  justify-content: space-between;
`;

const StyledHeaderItemWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledTitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Header: React.FC = () => {
  const [historyModalOpen, setHistoryModalOpen] = useState<boolean>(false);

  const { data: walletData } = useWalletQuery();
  const targetWallet = walletData ?? "MetaMask";
  const { provider, address, isActive, connectWeb3, disconnectWeb3 } =
    useWeb3Context();
  const { data: keplrData } = useKeplrQuery();
  const keplrWallet = keplrData ?? initKeplrWallet;
  const { data: pendingSendToEthTxs, refetch } = useTxsHistory(
    keplrWallet.address
  );

  const handleClickHistory = () => {
    setHistoryModalOpen(true);
  };

  return (
    <StyledHeader>
      <StyledHeaderItemWrapper>
        <TopButton
          text={"Dashboard"}
          tooltip={"Dashboard"}
          href={reapchainNetworkConfig.explorerUrl}
        />
        <TopButton
          text={"Explorer"}
          tooltip={"Explorer"}
          href={`${reapchainNetworkConfig.explorerUrl}/blocks`}
        />
        <TopButton
          text={"Staking"}
          tooltip={"Staking"}
          href={`${reapchainNetworkConfig.explorerUrl}/staking`}
        />
      </StyledHeaderItemWrapper>
      <StyledTitleWrapper>
        <HeaderTitle title={"RBG"} />
      </StyledTitleWrapper>
      <StyledHeaderItemWrapper>
        <HistoryButton text={"History"} onClick={handleClickHistory} />
        <HeaderWallet />
        <HeaderOptionButton />
      </StyledHeaderItemWrapper>
      <HistoryModal
        pendingSendToEthTxs={pendingSendToEthTxs || null}
        pendingSendToCosmosTxs={null}
        open={historyModalOpen}
        onCancel={() => setHistoryModalOpen(false)}
        onRefetch={refetch}
      />
    </StyledHeader>
  );
};

export default Header;
