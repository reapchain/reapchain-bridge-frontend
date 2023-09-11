import TokenListItem from "components/bridge/TokenListItem";
import React from "react";
import styled from "styled-components";
import { Token } from "types/chain";

type Props = {
  list: Array<Token>;
  selected: Token;
  onSelect: (item: Token) => void;
};

const StyledContent = styled.div``;

const TokenList: React.FC<Props> = ({ list, selected, onSelect }) => {
  const isSelected = (token: Token) => {
    if (!selected) {
      return false;
    }

    if (selected.id === token.id) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <StyledContent>
      {list.map((token) => (
        <TokenListItem
          key={token.id}
          item={token}
          selected={isSelected(token)}
          onSelect={onSelect}
        />
      ))}
    </StyledContent>
  );
};

export default TokenList;
