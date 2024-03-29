import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";
import { Chain } from "types/chain";
import { getBgIconSource } from "utils/util";

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
  background-color: ${colors.background};
  color: ${colors.white};
  padding: 8px;
`;

const StyledChainText = styled.div`
  margin-left: 8px;
  font-weight: 700;
  font-size: 14px;
`;

const StyledArrowIcon = styled(Icon)`
  color: ${colors.darkblue02};
  margin-left: 4px;
`;

const StyledIcon = styled.img``;

const ChainSelectButton: React.FC<Props> = ({ chain, onClick }) => {
  return (
    <StyledChainSelectButton onClick={onClick}>
      <StyledIcon
        src={getBgIconSource(chain.icon)}
        alt="icon"
        style={{ width: 24, height: 24 }}
      />
      <StyledChainText>{chain.chainName}</StyledChainText>
      <StyledArrowIcon
        path={mdiChevronDown}
        size={1}
        style={{ color: colors.darkblue02 }}
      />
    </StyledChainSelectButton>
  );
};

export default ChainSelectButton;
