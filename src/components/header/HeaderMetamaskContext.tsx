import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import metamaskIcon from "../../assets/images/metamask-logo.svg";
import { displayShortHexAddress } from "utils/util";

const StyledImage = styled.img`
  padding-left: 4px;
  padding-right: 4px;
`;

const StyledContent = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  color: ${colors.godong};
`;

type Props = {
  address: string;
};

const HeaderMetamaskContext: React.FC<Props> = ({ address }) => {
  return (
    <>
      <StyledImage src={metamaskIcon} width={24} height={24} alt="metamask" />
      <StyledContent>{displayShortHexAddress(address)}</StyledContent>
    </>
  );
};

export default HeaderMetamaskContext;
