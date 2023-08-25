import React from "react";
import styled from "styled-components";
import { RetweetOutlined } from "@ant-design/icons";
import colors from "../../assets/colors";

type Props = {};

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledChangeFromToButton = styled.div`
  cursor: pointer;
  border-radius: 12px;
  background-color: ${colors.secondary3};
`;

const StyledIcon = styled.div`
  padding: 6px 6px 4px 6px;
  color: ${colors.white};
`;

const ChangeFromToButton: React.FC<Props> = () => {
  return (
    <StyledButtonWrapper>
      <StyledChangeFromToButton>
        <StyledIcon>
          <RetweetOutlined style={{ fontSize: "32px" }} />
        </StyledIcon>
      </StyledChangeFromToButton>
    </StyledButtonWrapper>
  );
};

export default ChangeFromToButton;
