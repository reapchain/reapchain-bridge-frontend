import React, { useState } from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { Modal } from "antd";
import { SendTxInfo } from "components/bridge/modal/BridgeTxSend";
import ExecuteButton from "components/common/button/ExecuteButton";
import ApproveTxSend from "components/bridge/approve/ApproveTxSend";
import { Contract } from "@ethersproject/contracts";
import {
  BridgeContractAddress,
  ERC20ContractAddress,
  ApproveAmount,
} from "constants/contractConfig";
import { ERC20ABI } from "contracts/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3Context } from "components/common/Web3ContextProvider";

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    margin-left: -12px;
    border-radius: 12px;
    border: 1px solid transparent;
    border-color: ${colors.darkblue03};
    background-color: ${colors.primary};
    padding: 24px;
  }

  & .ant-modal-close-x {
    font-size: 24px;
    color: ${colors.white};
  }

  & .ant-modal-close {
    width: 32px;
    height: 32px;
  }

  & .ant-modal-title {
    background-color: ${colors.primary};
    text-align: center;
    margin-top: -6px;
    font-size: 20px;
    font-weight: 700;
    color: ${colors.white};
  }
`;

const StyledContents = styled.div`
  margin-top: 12px;
  margin-bottom: 0px;
`;

const StyledInformation = styled.div``;

const StyledApproveMessage = styled.div`
  font-size: 16px;
  font-weight: 700;

  padding: 12px 24px 32px 24px;
`;

type Props = {
  open: boolean;
  onCancel: () => void;
};

const ApproveModal: React.FC<Props> = ({ open, onCancel }) => {
  const { provider, address } = useWeb3Context();
  const [loading, setLoading] = useState<boolean>(false);
  const [txInfo, setTxInfo] = useState<SendTxInfo>({
    isSend: false,
    type: null,
    hash: "",
    address: "",
    error: "",
    txResult: null,
  });

  const handleClickCancel = () => {
    onCancel();
  };

  const executeApprove = async () => {
    if (!provider) {
      return;
    }

    const contractERC20 = new Contract(
      ERC20ContractAddress,
      ERC20ABI,
      provider?.getSigner()
    );
    const approveResult = await contractERC20.approve(
      BridgeContractAddress,
      BigNumber.from(ApproveAmount),
      {
        gasLimit: 100000,
      }
    );
    if (approveResult.hash) {
      setTxInfo({
        isSend: true,
        type: "ERC20Approve",
        hash: approveResult.hash,
        address: address,
        error: null,
        txResult: approveResult,
      });
    }
  };

  const handleClickExecute = () => {
    console.log("handleClickExecute");
    if (loading === true) {
      return;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);

    executeApprove();
  };

  return (
    <StyledModal
      title={"ERC-20 Approve"}
      open={open}
      onCancel={handleClickCancel}
      closeIcon={false}
      width={600}
      bodyStyle={{
        padding: 0,
        color: colors.white,
        display: "flex",
        flexDirection: "column",
      }}
      style={{
        top: 200,
        borderRadius: 12,
        color: colors.godong,
      }}
      footer={null}
    >
      <StyledContents>
        {txInfo.isSend ? (
          <ApproveTxSend txInfo={txInfo} onClose={handleClickCancel} />
        ) : (
          <StyledInformation>
            <StyledApproveMessage>
              To transfer from cREAP to REAP, you must approve ERC-20 contract
              interaction first. <br />
              <br />
              After sending an approve transaction, wait for the transaction to
              complete before attempting to transfer.
            </StyledApproveMessage>
            <ExecuteButton
              text={"Send Approve Tx"}
              onClick={handleClickExecute}
            />
          </StyledInformation>
        )}
      </StyledContents>
    </StyledModal>
  );
};

export default ApproveModal;
