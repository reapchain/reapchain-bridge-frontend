import React, { useState } from "react";
import styled from "styled-components";
import TokenSelectButton from "./TokenSelectButton";
import { InputNumber } from "antd";
import colors from "../../assets/colors";

const StyledSwapSendArea = styled.div`
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

const SwapSendArea: React.FC = () => {
  const [sendAmount, setSendAmount] = useState<number | null>(0);

  const handleChangeSendAmount = (value: any) => {
    setSendAmount(value);
  };

  return (
    <StyledSwapSendArea>
      <StyledContentWrapper style={{ marginBottom: "12px" }}>
        <StyledContent>Send: </StyledContent>
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
            value={sendAmount}
            min={0}
            max={10000000}
            defaultValue={0}
            placeholder={"0.0"}
            onChange={handleChangeSendAmount}
          />
        </StyledSendAmount>
        <StyledSendAmount>
          <TokenSelectButton tokenName={"REAP"} />
        </StyledSendAmount>
      </StyledContentWrapper>
    </StyledSwapSendArea>
  );
};

export default SwapSendArea;
