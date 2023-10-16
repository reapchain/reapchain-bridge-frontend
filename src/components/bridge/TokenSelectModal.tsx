import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { Modal } from "antd";
import { networks } from "constants/network";
import { Chain, Token } from "types/chain";
import TokenList from "components/bridge/TokenList";

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

const StyledTokenList = styled.div`
  margin-top: 24px;
`;

type Props = {
  open: boolean;
  target: string;
  chain: Chain;
  selected: Token;
  onSelect: (target: string, item: Token) => void;
  onCancel: () => void;
};

const TokenSelectModal: React.FC<Props> = ({
  open,
  target,
  chain,
  selected,
  onSelect,
  onCancel,
}) => {
  const getModalTitle = () => {
    const targetNext = target === "from" ? "Source" : "Destination";
    return `Select ${targetNext} Token`;
  };

  const handleSelect = (token: Token) => {
    onSelect(target, token);
  };

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
      <StyledTokenList>
        {chain.chainName}
        target : {target}
        <TokenList
          list={chain.tokens}
          selected={selected}
          onSelect={handleSelect}
        />
      </StyledTokenList>
    </StyledModal>
  );
};

export default TokenSelectModal;
