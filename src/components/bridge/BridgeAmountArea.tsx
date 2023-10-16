import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import TokenSelectButton from "./TokenSelectButton";
import { Input, InputNumber } from "antd";
import colors from "../../assets/colors";
import { Token } from "types/chain";

const StyledBridgeInputArea = styled.div`
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

const StyledInputAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
`;

type Props = {
  type: "send" | "receive";
  amount: string;
  max: number;
  token: Token;
  onClick: () => void;
  onChange?: (value: string) => void;
};

const BridgeAmountArea: React.FC<Props> = ({
  type,
  amount,
  max,
  token,
  onClick,
  onChange,
}) => {
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.value);
  };

  const handleClick = () => {
    onClick();
  };

  const getTypeTitle = () => {
    return type === "send" ? "Send:" : "Receive (estimated):";
  };

  const disabled = () => {
    return type === "receive" ? true : false;
  };

  return (
    <StyledBridgeInputArea>
      <StyledContentWrapper style={{ marginBottom: "12px" }}>
        <StyledContent>{getTypeTitle()}</StyledContent>
        <StyledContent>Max: {max}</StyledContent>
      </StyledContentWrapper>
      <StyledContentWrapper style={{ marginBottom: "4px" }}>
        <StyledInputAmount>
          <Input
            style={{
              color: colors.pointPink,
              width: 220,
              fontWeight: 600,
              fontSize: 20,
            }}
            disabled={disabled()}
            bordered={false}
            size={"large"}
            value={amount}
            min={0}
            placeholder={"0.0"}
            onChange={handleChangeAmount}
            // onChange={handleChangeAmount}
          />
          {/* <InputNumber
            style={{ color: colors.godong, width: 220 }}
            bordered={false}
            color={"red"}
            size={"large"}
            controls={false}
            value={amount}
            min={0}
            placeholder={"값."}
            onChange={handleChangeAmount}
          /> */}
        </StyledInputAmount>
        <StyledInputAmount>
          <TokenSelectButton token={token} onClick={handleClick} />
        </StyledInputAmount>
      </StyledContentWrapper>
    </StyledBridgeInputArea>
  );
};

export default BridgeAmountArea;
