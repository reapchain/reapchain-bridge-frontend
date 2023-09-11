import ChainListItem from "components/bridge/ChainListItem";
import React from "react";
import styled from "styled-components";
import { Chain } from "types/chain";

type Props = {
  list: Array<Chain>;
  selected: Chain | null;
  onSelect: (item: Chain) => void;
};

const StyledContent = styled.div``;

const ChainList: React.FC<Props> = ({ list, selected, onSelect }) => {
  const isSelected = (chain: Chain) => {
    if (!selected) {
      return false;
    }

    if (selected.chainId === chain.chainId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledContent>
      {list.map((chain) => (
        <ChainListItem
          key={chain.chainId}
          item={chain}
          selected={isSelected(chain)}
          onSelect={onSelect}
        />
      ))}
    </StyledContent>
  );
};

export default ChainList;
