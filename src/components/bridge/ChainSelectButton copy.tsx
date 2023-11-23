import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";
import { Chain } from "types/chain";
import { getIconSource } from "utils/util";

type Props = {
  chain: Chain;
  onClick: () => void;
};

const StyledChainSelectButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1.5px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
  color: ${colors.godong};
  padding: 6px 4px 6px 10px;
  margin-left: 12px;
  margin-right: auto;
  height: 24px;

  &: hover {
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const ChainSelectButton: React.FC<Props> = ({ chain, onClick }) => {
  return (
    <StyledChainSelectButton onClick={onClick}>
      <img
        src={getIconSource(chain.icon)}
        alt="icon"
        style={{ width: 20, height: 20 }}
      />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {chain.chainName}
      </div>
      <Icon path={mdiChevronDown} size={1} style={{ opacity: 0.5 }} />
    </StyledChainSelectButton>
  );
};

export default ChainSelectButton;
