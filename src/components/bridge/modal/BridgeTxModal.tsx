import React from "react";
import styled from "styled-components";
import colors from "assets/colors";
import { Modal, message } from "antd";
import { Chain, Token } from "types/chain";
import BridgeTxChainItem from "components/bridge/modal/BridgeTxChainItem";
import FeeDetailInfo from "components/bridge/modal/FeeDetailInfo";
import { connectKeplrWallet, getKeplrChainConfig } from "utils/keplr";
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
} from "constants/contract";
import { WalletType } from "queries/useWalletType";
import { Contract } from "@ethersproject/contracts";

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    border-radius: 12px;
    border: 1.5px solid transparent;
    border-radius: 12px;
    border-color: ${colors.pointPink};
    padding: 24px;
  }

  & .ant-modal-close-x {
    font-size: 24px;
    color: ${colors.godong};
  }

  & .ant-modal-close {
    width: 32px;
    height: 32px;
  }

  & .ant-modal-title {
    text-align: center;
    margin-top: -6px;
    font-size: 20px;
    color: ${colors.godong};
  }
`;

const StyledHorizon = styled.div`
  border: 1.5px solid transparent;
  border-width: 1.5px 0px 0px 0px;
  border-color: ${colors.pointPink};
  margin: 8px 0px;
`;

const StyledContents = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledButton = styled.div`
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.pointPink};
  color: #fff;
  padding: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
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
  onExecute,
  onCancel,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    provider,
    address,
    isActive,
    signer,
    connectWeb3,
    connectWeb3Signer,
  } = useWeb3Context();

  const handleClickExecute = () => {
    if (targetWallet === "MetaMask") {
      executeSendToCosmos();
    } else if (targetWallet === "Keplr") {
      executeSendToEth();
    }
  };

  const executeSendToEth = async () => {
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
        amount: "2000000000000000000",
      },
    };

    const res = keplrSendTx("SendToEth", fromChain, sendToEthParams);
    console.log("res : ", res);
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
        messageApi.info("To use the bridge, you must approve ERC20");

        const approveResult = await contractERC20.approve(
          BridgeContractAddress,
          BigNumber.from(ApproveAmount),
          {
            gasLimit: 50000,
          }
        );
        console.log("approveResult : ", approveResult);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledModal
      title={"Transfer"}
      open={open}
      onCancel={onCancel}
      closeIcon={false}
      width={550}
      bodyStyle={{
        padding: 0,
        color: colors.godong,
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
        <div>
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
          <StyledHorizon />
        </div>
        <FeeDetailInfo />
      </StyledContents>
      <StyledButton onClick={handleClickExecute}>Send Transaction</StyledButton>
    </StyledModal>
  );
};

export default BridgeTxModal;
