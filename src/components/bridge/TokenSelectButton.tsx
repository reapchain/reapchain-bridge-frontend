import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";
import { Token } from "types/chain";
import { getBgIconSource } from "utils/util";

type Props = {
  token: Token;
  onClick: () => void;
};

const StyledTokenSelectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  height: 100%;
`;

const StyledArrowIcon = styled(Icon)`
  color: ${colors.darkblue02};
  margin-left: 4px;
`;

const StyledTokenText = styled.div`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 700;
`;

const StyledIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const TokenSelectButton: React.FC<Props> = ({ token, onClick }) => {
  return (
    <StyledTokenSelectButton onClick={onClick}>
      <StyledIcon src={getBgIconSource(token.icon)} alt="icon" />
      <StyledTokenText>{token.symbol}</StyledTokenText>
      <StyledArrowIcon
        path={mdiChevronDown}
        size={1}
        style={{ color: colors.darkblue02 }}
      />
    </StyledTokenSelectButton>
  );
};

export default TokenSelectButton;
