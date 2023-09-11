import React from "react";
import styled from "styled-components";
import logoIcon from "../../assets/images/logo.png";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";
import { Token } from "types/chain";
import { getIconSource } from "utils/util";

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

const TokenSelectButton: React.FC<Props> = ({ token, onClick }) => {
  return (
    <StyledTokenSelectButton onClick={onClick}>
      <img
        src={getIconSource(token.icon)}
        alt="icon"
        style={{ width: 20, height: 20 }}
      />
      <div
        style={{
          marginLeft: "8px",
          fontWeight: "600",
          fontSize: "16px",
          color: colors.godong,
        }}
      >
        {token.name}
      </div>
      <Icon path={mdiChevronDown} size={1} style={{ opacity: 1 }} />
    </StyledTokenSelectButton>
  );
};

export default TokenSelectButton;
