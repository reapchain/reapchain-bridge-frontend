import React from "react";
import styled from "styled-components";
import { InputNumber } from "antd";
import colors from "../../assets/colors";

const StyledContainer = styled.div`
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.lightSal9};
  color: ${colors.godong};
  padding: 16px;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 0.9;
`;

const StyledContent = styled.div``;

const StyledSendAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
`;

const BridgeReceiveArea: React.FC = () => {
  return (
    <StyledContainer>
      <StyledContentWrapper style={{ marginBottom: "12px" }}>
        <StyledContent>Receive (estimated):</StyledContent>
        <StyledContent>Max: 0</StyledContent>
      </StyledContentWrapper>
      <StyledContentWrapper style={{ marginBottom: "4px" }}>
        <StyledSendAmount>
          <InputNumber
            style={{ color: colors.godong }}
            bordered={false}
            color={"red"}
            size={"large"}
            controls={false}
            value={0}
            min={0}
            max={10000000}
            defaultValue={0}
            placeholder={"0.0"}
            onChange={() => {}}
          />
        </StyledSendAmount>
      </StyledContentWrapper>
    </StyledContainer>
  );
};

export default BridgeReceiveArea;
