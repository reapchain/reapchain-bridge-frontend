import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import metamaskIcon from "../../assets/images/metamask-logo.svg";

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
  displayAddress: string;
};

const HeaderMetamaskContext: React.FC<Props> = ({
  address,
  displayAddress,
}) => {
  return (
    <>
      <StyledImage src={metamaskIcon} width={24} height={24} alt="metamask" />
      <StyledContent>{displayAddress}</StyledContent>
    </>
  );
};

export default HeaderMetamaskContext;
