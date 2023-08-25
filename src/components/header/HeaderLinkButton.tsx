import { Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import icon from "../../images/logo.png";
import colors from "../../assets/colors";

const StyledContainer = styled.div`
  background-color: ${colors.white};
  border: 1px solid transparent;
  cursor: pointer;
  width: 44px;
  height: 44px;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 12px;
  border: 1.5px solid transparent;

  &: hover {
    transition: 0.5s;
    border: 1.5px solid;
    border-color: ${colors.pointPink};
  }
`;

const StyledA = styled.a`
  width: 24px;
  height: 24px;
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
          <StyledA href={href} target="_blank" rel="noreferrer">
            <img src={icon} alt="logo" style={{ width: 24, height: 24 }} />
          </StyledA>
        </StyledContainer>
      </Tooltip>
    </>
  );
};

export default HeaderLinkButton;
