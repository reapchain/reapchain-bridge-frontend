import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import icon from "../../images/logo.png";
import colors from "../../assets/colors";

const StyledContainer = styled.div`
  background-color: ${colors.primary};
  border: 1px solid transparent;
  cursor: pointer;
  height: 44px;
  padding: 8px 9px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius: 12px;

  &: hover {
    border: 1px solid;
    border-color: ${colors.secondary4};
  }
`;

type Props = {
  tooltip: string;
  href: string;
  Icon?: React.ReactElement;
};

const HeaderLinkButton: React.FC<Props> = ({ tooltip, href }) => {
  return (
    <>
      <Tooltip placement="bottom" title={tooltip}>
        <StyledContainer>
          <a href={href} target="_blank" rel="noreferrer">
            <img src={icon} alt="logo" style={{ width: 24, height: 24 }} />
          </a>
        </StyledContainer>
      </Tooltip>
    </>
  );
};

export default HeaderLinkButton;
