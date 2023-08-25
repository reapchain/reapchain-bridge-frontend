import React from "react";
import styled from "styled-components";
import colors from "../../assets/colors";

type Props = {
  icon: React.ReactElement;
  href: string;
};

const StyledIconWrapper = styled.div`
  padding: 8px;
  background-color: ${colors.secondary2};
  border-radius: 50%;
  margin: 0px 4px;
  cursor: pointer;
  font-style: bold;
`;

const FooterLinkButton: React.FC<Props> = ({ icon, href }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <StyledIconWrapper>{icon}</StyledIconWrapper>
    </a>
  );
};

export default FooterLinkButton;
