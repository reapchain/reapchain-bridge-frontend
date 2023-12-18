import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { WalletType } from "queries/useWalletType";
import { Token } from "types/chain";
import colors from "assets/colors";
import { Input, Checkbox } from "antd";

const StyledContainer = styled.div``;
const ToggleButtonText = styled.div`
  color: ${colors.darkblue01};
  font-size: 14px;
  font-weight: 700;
`;
const StyledInputAddressWrapper = styled.div`
  background-color: ${colors.background};
`;
const StyledCheckbox = styled(Checkbox)``;
// const StyledCheckbox = styled(Checkbox)`
//   & .ant-checkbox-checked .ant-checkbox-inner {
//     background-color: red;
//     border-color: red;
//   }
// `;
const StyledInputAddress = styled(Input)`
  margin-top: 4px;
  border-width: 1px;
  background-color: ${colors.background};
  font-size: 14px;
  font-weight: 600;
  color: ${colors.white};
  border-radius: 8px;
  border-color: ${colors.darkblue01};

  padding: 4px 12px 4px 12px;

  &:: placeholder {
    color: ${colors.white};
    opacity: 0.2;
  }

  &: hover {
    border-color: ${colors.darkblue01};
  }
`;

type Props = {
  targetWallet: string;
  openRecipient: boolean;
  recipient: string;
  setOpenRecipient: (value: boolean) => void;
  setRecipient: (address: string) => void;
};

const RecipientInput: React.FC<Props> = ({
  targetWallet,
  openRecipient,
  recipient,
  setOpenRecipient,
  setRecipient,
}) => {
  const handleClickToggle = () => {
    setOpenRecipient(!openRecipient);
  };

  const handleChangeRecipient = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  return (
    <StyledContainer>
      <StyledCheckbox checked={openRecipient} onChange={handleClickToggle}>
        <ToggleButtonText>
          Send to another Recipient, not your account
        </ToggleButtonText>
      </StyledCheckbox>
      {openRecipient && (
        <StyledInputAddress
          bordered={true}
          value={recipient}
          min={0}
          placeholder={
            targetWallet === "MetaMask" ? "REAP Address" : "ETH Address"
          }
          onChange={handleChangeRecipient}
        />
      )}
    </StyledContainer>
  );
};

export default RecipientInput;
