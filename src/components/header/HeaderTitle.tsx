import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import reapchainIcon from "assets/images/bridge_logo.png";

type Props = {
  title: string;
};

const StyledHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  font-size: 30px;
  font-weight: 700;
  font-family: Federant;
  height: 44px;
  color: ${colors.white};
  line-height: auto;
  vertical-align: top;
`;

const StyledMainIcon = styled.img``;

const HeaderItem: React.FC<Props> = ({ title }) => {
  return (
    <StyledHeaderTitle>
      <StyledMainIcon src={reapchainIcon} />
    </StyledHeaderTitle>
  );
};

export default HeaderItem;
