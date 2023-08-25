import React from "react";
import styled from "styled-components";
import logoIcon from "../../images/logo.png";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import colors from "../../assets/colors";

type Props = {
  chainName: string;
};

const StyledChainSelectButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
  color: ${colors.godong};
  padding: 6px 12px;
  margin-left: 12px;
  margin-right: auto;
  height: 24px;
`;

const ChainSelectButton: React.FC<Props> = ({ chainName }) => {
  return (
    <StyledChainSelectButton>
      <img src={logoIcon} alt="logo" style={{ width: 20, height: 20 }} />
      <div style={{ marginLeft: "8px", fontWeight: "600", fontSize: "16px" }}>
        {chainName}
      </div>
      <Icon path={mdiChevronDown} size={1} style={{ opacity: 0.5 }} />
    </StyledChainSelectButton>
  );
};

export default ChainSelectButton;
