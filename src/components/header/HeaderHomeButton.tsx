import React from "react";
import styled from "styled-components";
import icon from "../../assets/images/logo.png";

const StyledContainer = styled.div`
  border: 1px solid transparent;
  height: 44px;
  padding: 8px 9px;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-weight: 700;
  border-radius: 12px;
`;

type Props = {};

const HeaderHomeButton: React.FC<Props> = () => {
  return (
    <StyledContainer>
      <img src={icon} alt="icon" style={{ width: 28, height: 28 }} />
    </StyledContainer>
  );
};

export default HeaderHomeButton;
