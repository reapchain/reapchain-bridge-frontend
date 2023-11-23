import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import TokenSelectButton from "./TokenSelectButton";
import { Input, InputNumber } from "antd";
import colors from "../../assets/colors";
import { Token } from "types/chain";
import { displayBalanceWithDash } from "utils/number";
import { BigNumberish } from "@ethersproject/bignumber";

const StyledBridgeInputArea = styled.div`
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.background};
  padding: 20px;
  color: ${colors.darkblue01};
`;

const StyledContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 0.9;
`;

const StyledInputAmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const StyledTitleText = styled.div`
  font-size: 12px;
`;

const StyledInputAmount = styled(Input)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
  padding: 0px;

  &:: placeholder {
    color: ${colors.white};
    opacity: 0.2;
  }
`;

const StyledTokenSelectWrapper = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.white};
`;

type Props = {
  type: "send" | "receive";
  amount: string;
  max: number;
  availableBalance: BigNumberish;
  token: Token;
  onClick: () => void;
  onChange?: (value: string) => void;
};

const BridgeAmountArea: React.FC<Props> = ({
  type,
  amount,
  max,
  availableBalance,
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
    return type === "send" ? "Send :" : "Receive (estimated) :";
  };

  const disabled = () => {
    return type === "receive" ? true : false;
  };

  const displayBalance = (balance: string, symbol: string) => {
    if (balance === "0" || !balance) {
      return "-";
    } else {
      return `${balance} ${symbol}`;
    }
  };

  return (
    <StyledBridgeInputArea>
      <StyledContentWrapper>
        <StyledTitleText>{getTypeTitle()}</StyledTitleText>
        {type === "send" && (
          <StyledTitleText>
            Balance: {displayBalanceWithDash(availableBalance, token.symbol, 4)}
          </StyledTitleText>
        )}
      </StyledContentWrapper>
      <StyledInputAmountWrapper>
        <StyledInputAmount
          style={{
            color: colors.white,
            width: 300,
            fontWeight: 700,
            fontSize: 24,
          }}
          disabled={disabled()}
          bordered={false}
          size={"large"}
          value={amount}
          min={0}
          placeholder={"0.0"}
          onChange={handleChangeAmount}
        />
        <StyledTokenSelectWrapper>
          <TokenSelectButton token={token} onClick={handleClick} />
        </StyledTokenSelectWrapper>
      </StyledInputAmountWrapper>
    </StyledBridgeInputArea>
  );
};

export default BridgeAmountArea;
