import React from "react";
import { Tooltip } from "antd";
import { styled } from "styled-components";
import colors from "assets/colors";
import icon from "assets/images/logo.png";

const StyledButton = styled.div`
  max-width: 140px;
  height: 44px;

  padding-left: 24px;
  padding-right: 24px;

  border-radius: 12px;
  background-color: ${colors.secondary};

  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const StyledIcon = styled.img``;

const StyledButtonText = styled.div`
  text-align: left;
  vertical-align: top;
  font-size: 14px;
  font-weight: 700;
  line-height: 140%;
  color: ${colors.white};
`;

type Props = {
  text: string;
  tooltip: string;
  href: string;
  Icon?: React.ReactElement;
};

const TopButton: React.FC<Props> = ({ text, tooltip, href, Icon }) => {
  const handleClickLink = () => {
    window.open(href, "_blank");
  };

  return (
    <Tooltip placement="bottom" title={tooltip}>
      <StyledButton onClick={handleClickLink}>
        <StyledIcon
          src={icon}
          alt="icon"
          style={{ width: "20px", height: "20px" }}
        />
        <StyledButtonText>{text}</StyledButtonText>
      </StyledButton>
    </Tooltip>
  );
};

export default TopButton;
