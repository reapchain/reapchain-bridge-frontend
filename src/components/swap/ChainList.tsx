import ChainListItem from "components/swap/ChainListItem";
import React from "react";
import styled from "styled-components";
import { Chain } from "types/chain";

type Props = {
  list: Array<Chain>;
};

const StyledContent = styled.div``;

const ChainList: React.FC<Props> = ({ list }) => {
  return (
    <StyledContent>
      {list.map((chain) => (
        <ChainListItem key={chain.chainId} item={chain} />
      ))}
    </StyledContent>
  );
};

export default ChainList;
