import React, { useMemo, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { Modal } from "antd";
import { networks } from "constants/network";
import { Chain } from "types/chain";
import reapchainIcon from "assets/images/reapchain.png";
import ethereumIcon from "assets/images/ethereum.png";
import ChainList from "components/swap/ChainList";

type Props = {
  open: boolean;
  target: string;
  selected?: Chain;
  onCancel: () => void;
};

const chainList: Chain[] = [
  networks.ethereum_mainnet,
  networks.ethereum_sepolia,
  networks.reapchain_mainnet,
  networks.reapchain_testnet,
];

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    border-radius: 12px;
    border: 1.5px solid transparent;
    border-radius: 12px;
    border-color: ${colors.pointPink};
    padding: 24px;
  }

  & .ant-modal-close-x {
    font-size: 24px;
    color: ${colors.godong};
  }

  & .ant-modal-close {
    width: 32px;
    height: 32px;
  }

  & .ant-modal-title {
    margin-top: -6px;
    font-size: 20px;
    color: ${colors.godong};
  }
`;

const StyledChainList = styled.div`
  margin-top: 24px;
`;

const ChainSelectButton: React.FC<Props> = ({
  open,
  target,
  selected,
  onCancel,
}) => {
  const getModalTitle = () => {
    const targetNext = target === "from" ? "Source" : "Destination";
    return `Select ${targetNext} Network`;
  };
  // const getModalTitle = useMemo(() => {
  //   const targetNext = target === "from" ? "Source" : "Destination"
  //   return `Select ${targetNext} Network`;
  // }, [target])

  return (
    <StyledModal
      title={getModalTitle()}
      open={open}
      onCancel={onCancel}
      closeIcon={false}
      width={350}
      bodyStyle={{
        padding: 0,
        color: colors.godong,
        display: "flex",
        flexDirection: "column",
      }}
      style={{
        top: 200,
        borderRadius: 12,
        color: colors.godong,
      }}
      footer={null}
    >
      <StyledChainList>
        <ChainList list={chainList} />
      </StyledChainList>
    </StyledModal>
  );
};

export default ChainSelectButton;
