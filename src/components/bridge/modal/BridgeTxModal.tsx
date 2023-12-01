import React, { useState } from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { Modal, message } from "antd";
import { Chain, Token } from "types/chain";
import BridgeTxChainItem from "components/bridge/modal/BridgeTxChainItem";
import FeeDetailInfo from "components/bridge/modal/FeeDetailInfo";
import { connectKeplrWallet } from "utils/keplr";
import { BigNumber } from "@ethersproject/bignumber";
import { MessageSendToEthParams } from "transactions/msgSendToEth";
import { keplrSendTx } from "utils/keplrTx";
import { removeLastDot } from "utils/number";
import { parseEther } from "@ethersproject/units";
import { compareHexAddress, convertToBech32, convertToHex } from "utils/util";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { BridgeABI, ERC20ABI } from "contracts/abi";
import {
  ERC20ContractAddress,
  BridgeContractAddress,
  ApproveAmount,
} from "constants/contractConfig";
import { WalletType } from "queries/useWalletType";
import { Contract } from "@ethersproject/contracts";
import BridgeTxSend, { SendTxInfo } from "components/bridge/modal/BridgeTxSend";
import ExecuteButton from "components/common/button/ExecuteButton";
import { calcFee } from "utils/fee";

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

const StyledHorizon = styled.div`
  height: 0px;
  border: 1px solid transparent;
  border-width: 1px 0px 0px 0px;
  border-color: ${colors.darkblue03};
  margin: 12px 0px;
`;

const StyledContents = styled.div`
  margin-top: 12px;
  margin-bottom: 0px;
`;

const StyledInformation = styled.div``;

const StyledFromToArea = styled.div`
  margin-top: 8px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid transparent;
  border-color: ${colors.darkblue03};
  background-color: ${colors.background};
`;

const StyledFeeWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
`;

type Props = {
  open: boolean;
  targetWallet: WalletType;
  fromChain: Chain;
  toChain: Chain;
  fromToken: Token;
  toToken: Token;
  sendAmount: string;
  receiveAmount: string;
  availableBalance: BigNumber;
  onExecute: () => void;
  onCancel: () => void;
};

const BridgeTxModal: React.FC<Props> = ({
  open,
  targetWallet,
  fromChain,
  toChain,
  fromToken,
  toToken,
  sendAmount,
  receiveAmount,
  availableBalance,
  onExecute,
  onCancel,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { provider, address } = useWeb3Context();
  const [txInfo, setTxInfo] = useState<SendTxInfo>({
    isSend: false,
    type: null,
    hash: "",
    address: "",
    error: "",
  });

  const checkSendAmount = (): boolean => {
    const tempSendAmount = removeLastDot(sendAmount);

    if (!tempSendAmount || Number(tempSendAmount) === 0) {
      messageApi.error("Invalid send amount");
      return false;
    }

    const tempSendAmountOrigin = BigNumber.from(parseEther(tempSendAmount));
    const amountAddedFee = calcFee(tempSendAmount, targetWallet);

    if (tempSendAmountOrigin.lte(0)) {
      messageApi.error("Send amount must be greater than 0");
      return false;
    }

    if (availableBalance.lte(0) || availableBalance.lt(amountAddedFee)) {
      messageApi.error("Insufficient available amount");
      return false;
    }

    return true;
  };

  const handleClickExecute = () => {
    if (!checkSendAmount()) {
      return;
    }

    if (targetWallet === "MetaMask") {
      executeSendToCosmos();
    } else if (targetWallet === "Keplr") {
      executeSendToEth();
    }
  };

  const executeSendToEth = async () => {
    try {
      const keplr = await connectKeplrWallet(fromChain);
      if (!keplr) {
        return;
      }
      const tempSendAmount = removeLastDot(sendAmount);
      const sendAmountBigNumber = BigNumber.from(parseEther(tempSendAmount));
      const sendToEthParams: MessageSendToEthParams = {
        sender: keplr.account.bech32Address,
        ethDest: convertToHex(keplr.account.bech32Address),
        amount: {
          denom: "areap",
          amount: sendAmountBigNumber.toString(),
        },
        bridgeFee: {
          denom: "areap",
          amount: "2000000000000000000",
        },
        chainFee: {
          denom: "areap",
          amount: "1000000000000000000",
        },
      };

      const keplrTxResult = await keplrSendTx(
        "SendToEth",
        sendToEthParams,
        fromChain
      );

      if (!keplrTxResult.result && keplrTxResult.msg === "Request rejected") {
        messageApi.error(keplrTxResult.msg);
        return;
      } else if (!keplrTxResult.result && keplrTxResult.msg !== "[]") {
        messageApi.error(keplrTxResult.msg);
        return;
      }

      setTxInfo({
        isSend: true,
        type: "SendToEth",
        hash: keplrTxResult.txHash,
        address: keplr.account.bech32Address,
        error: keplrTxResult.msg,
      });
    } catch (err) {
      setTxInfo({
        ...txInfo,
        error: err,
        isSend: true,
      });
      console.error(err);
    }
  };

  const executeSendToCosmos = async () => {
    if (!provider) {
      return;
    }

    try {
      const contractERC20 = new Contract(
        ERC20ContractAddress,
        ERC20ABI,
        provider.getSigner()
      );
      const allowanceResult = await contractERC20.allowance(
        address,
        BridgeContractAddress
      );

      const tempSendAmount = removeLastDot(sendAmount);
      const sendAmountBigNumber = BigNumber.from(parseEther(tempSendAmount));

      if (allowanceResult.lt(sendAmountBigNumber)) {
        messageApi.info("To use the bridge, you must approve ERC20.");

        const approveResult = await contractERC20.approve(
          BridgeContractAddress,
          BigNumber.from(ApproveAmount),
          {
            gasLimit: 50000,
          }
        );
        if (approveResult.hash) {
          setTxInfo({
            isSend: true,
            type: "ERC20Approve",
            hash: approveResult.hash,
            address: address,
            error: null,
          });
        }
        return;
      }

      const bech32Address = convertToBech32(address, "reap");
      const hexAddress = convertToHex(bech32Address);

      if (!compareHexAddress(address, hexAddress)) {
        messageApi.error("Error : address missmatch");
        return;
      }

      const contractBridge = new Contract(
        BridgeContractAddress,
        BridgeABI,
        provider?.getSigner()
      );

      const sendToCosmosResult = await contractBridge.sendToCosmos(
        ERC20ContractAddress,
        bech32Address,
        sendAmountBigNumber,
        {
          gasLimit: 100000,
        }
      );
      console.log("sendToCosmosResult : ", sendToCosmosResult);

      setTxInfo({
        isSend: true,
        type: "SendToCosmos",
        hash: sendToCosmosResult.hash,
        address: hexAddress,
        error: null,
      });
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        messageApi.error("Request rejected");
      } else {
        messageApi.error("MetaMask Error");
      }
    }
  };

  const handleClickCancel = () => {
    setTxInfo({
      ...txInfo,
      isSend: false,
    });
    onCancel();
  };

  return (
    <StyledModal
      title={"Transfer"}
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
          <BridgeTxSend
            targetWallet={targetWallet}
            txInfo={txInfo}
            onClose={handleClickCancel}
          />
        ) : (
          <StyledInformation>
            <StyledFromToArea>
              <BridgeTxChainItem
                type={"from"}
                chainName={fromChain.chainName}
                icon={fromChain.icon}
                amount={sendAmount}
                denom={fromToken.symbol}
              />
              <StyledHorizon />
              <BridgeTxChainItem
                type={"to"}
                chainName={toChain.chainName}
                icon={toChain.icon}
                amount={receiveAmount}
                denom={toToken.symbol}
              />
            </StyledFromToArea>
            <StyledFeeWrapper>
              <FeeDetailInfo
                targetWallet={targetWallet}
                fromToken={fromToken}
                toToken={toToken}
                sendAmount={sendAmount}
                receiveAmount={receiveAmount}
              />
            </StyledFeeWrapper>
            <ExecuteButton
              text={"Send Transaction"}
              onClick={handleClickExecute}
            />
          </StyledInformation>
        )}
      </StyledContents>
      {contextHolder}
    </StyledModal>
  );
};

export default BridgeTxModal;
