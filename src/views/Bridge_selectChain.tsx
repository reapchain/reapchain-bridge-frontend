import React, { useEffect, useMemo, useState } from "react";
import { Card, message } from "antd";
import styled from "styled-components";
import colors from "assets/colors";
import BridgeAmountArea from "components/bridge/BridgeAmountArea";
import ChainSelectButton from "components/bridge/ChainSelectButton";
import ChainSelectModal from "components/bridge/ChainSelectModal";
import ExchangeButton from "components/bridge/ExchangeButton";
import TransferButton from "components/bridge/TransferButton";
import { Chain, Token } from "types/chain";
import { networks } from "constants/network";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import TokenSelectModal from "components/bridge/TokenSelectModal";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import {
  ERC20ContractAddress,
  BridgeContractAddress,
  ApproveAmount,
} from "constants/contractConfig";
import { BridgeABI, ERC20ABI } from "contracts/abi";
import {
  applyAmountNumber,
  removeLastDot,
  validateDecimalInput,
} from "utils/number";
import { debounce } from "lodash";
import FeeInfo from "components/bridge/FeeInfo";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import { Web3 } from "web3";
import { useWeb3React } from "@web3-react/core";
import { formatEther, parseEther } from "@ethersproject/units";
import { compareHexAddress, convertToBech32, convertToHex } from "utils/util";

const StyledBridgeCard = styled(Card)`
  background-color: ${colors.white};
  border: 1px solid transparent;
  border-radius: 12px;
  border-color: ${colors.pointPink};
  color: ${colors.godong};
  padding: 12px 12px;
  font-weight: 600;
`;

const StyledSelectTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const StyledContentWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
`;

const ExchangeButtonWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
`;

const StyledConnectWalletWrapper = styled.div`
  margin-top: 36px;
`;

const StyledFromToText = styled.div`
  width: 36px;
`;

const Bridge: React.FC = () => {
  const [isInit, setIsInit] = useState(true);
  const [chainModalOpen, setChainModalOpen] = useState(false);
  const [chainModalTarget, setChainModalTarget] = useState("from");
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [tokenModalTarget, setTokenModalTarget] = useState("from");
  const [fromChain, setFromChain] = useState<Chain>(networks.ethereum_sepolia);
  const [toChain, setToChain] = useState<Chain>(networks.reapchain_testnet);
  // const [fromChain, setFromChain] = useState<Chain>(networks.ethereum_mainnet);
  // const [toChain, setToChain] = useState<Chain>(networks.reapchain_mainnet);
  const [fromToken, setFromToken] = useState<Token>(
    networks.ethereum_sepolia.tokens[0]
  );
  const [toToken, setToToken] = useState<Token>(
    networks.reapchain_testnet.tokens[0]
  );
  const [sendAmount, setSendAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  // const [sendAmount, setSendAmount] = useState<BigNumber>(BigNumber.from("0"));
  // const [receiveAmount, setReceiveAmount] = useState<BigNumber>(
  //   BigNumber.from("0")
  // );
  const [availableBalance, setAvailableBalance] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [messageApi, contextHolder] = message.useMessage();

  const {
    provider,
    address,
    isActive,
    signer,
    connectWeb3,
    connectWeb3Signer,
  } = useWeb3Context();

  const { connector, hooks } = useWeb3React();
  const { useSelectedChainId } = hooks;
  const chainId = useSelectedChainId(connector);

  const handleOpenSelectChain = (target: string) => {
    setChainModalTarget(target);
    openChainModal();
  };

  const handleSelectChain = (target: string, chain: Chain) => {
    connectWeb3("injected");

    if (target === "from") {
      if (toChain.chainId === chain.chainId) {
        setToChain(fromChain);
        setToToken(fromChain.tokens[0]);
      }
      setFromChain(chain);
      setFromToken(chain.tokens[0]);
    } else if (target === "to") {
      if (fromChain.chainId === chain.chainId) {
        setFromChain(toChain);
        setFromToken(toChain.tokens[0]);
      }
      setToChain(chain);
      setToToken(chain.tokens[0]);
    }

    closeChainModal();
  };

  const handleOpenSelectToken = (target: string) => {
    setTokenModalTarget(target);
    openTokenModal();
  };

  const handleSelectToken = (target: string, token: Token) => {
    if (target === "from") {
      setFromToken(token);
    } else if (target === "to") {
      setToToken(token);
    }

    closeTokenModal();
  };

  const openChainModal = () => {
    setChainModalOpen(true);
  };

  const closeChainModal = () => {
    setChainModalOpen(false);
  };

  const openTokenModal = () => {
    setTokenModalOpen(true);
  };

  const closeTokenModal = () => {
    setTokenModalOpen(false);
  };

  const handleExchange = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toChain.tokens[0]);
    setToToken(fromChain.tokens[0]);
    setSendAmount("");
    setReceiveAmount("");
  };

  const getTargetChain = () => {
    return chainModalTarget === "from" ? fromChain : toChain;
  };

  const getTargetToken = () => {
    return tokenModalTarget === "from" ? fromToken : toToken;
  };

  const getTargetTokenChain = () => {
    return tokenModalTarget === "from" ? fromChain : toChain;
  };

  const fetchBalanceOfToken = async () => {
    if (parseInt(fromChain.chainId) !== chainId) {
      console.log("ChainId missmatch");
      setAvailableBalance(BigNumber.from(0));
      return;
    }

    if (!fromToken.contractAddress) {
      console.log("err2");
      setAvailableBalance(BigNumber.from(0));
      return;
    }

    try {
      const contract = new Contract(ERC20ContractAddress, ERC20ABI, provider);
      const result = await contract.balanceOf(address);

      setAvailableBalance(result);

      return result;
    } catch (error) {
      console.log(error);
      setAvailableBalance(BigNumber.from(0));
    }
  };

  useEffect(() => {
    if (isInit === true) {
      setIsInit(false);
      return;
    }

    if (!isActive) {
      return;
    }

    connectWeb3Signer(fromChain);
  }, [isActive, fromChain, fromToken]);

  useEffect(() => {
    fetchBalanceOfToken();
  }, [isActive, chainId, fromToken]);

  useEffect(() => {}, [chainModalTarget]);
  useEffect(() => {}, [tokenModalTarget]);
  useEffect(() => debouncedChangeSendAmount(), [sendAmount]);

  const handleChangeSendAmount = (value: string) => {
    const tempValue = validateDecimalInput(value);

    setSendAmount(tempValue);
  };

  const debouncedChangeSendAmount = debounce(() => {
    const ratio = 1;

    if (!sendAmount) {
      setReceiveAmount("");
      return;
    }

    const tempSendAmount = removeLastDot(sendAmount);

    if (!tempSendAmount || Number(tempSendAmount) === 0) {
      setReceiveAmount("");
      return;
    }

    const sendAmountBigNumber = BigNumber.from(parseEther(tempSendAmount));

    if (availableBalance.lt(sendAmountBigNumber) || availableBalance.lte(0)) {
      messageApi.warning("Insufficient available amount");
      setReceiveAmount("");
      return;
    }

    setReceiveAmount(formatEther(sendAmountBigNumber.mul(ratio)));
  }, 500);

  const handleClickConnectWallet = () => {
    connectWeb3("injected");
    handleSelectChain("from", fromChain);
  };

  const handleClickExecute = async () => {
    connectWeb3("injected");
    handleSelectChain("from", fromChain);

    if (!signer || !provider) {
      messageApi.error("no signer");
      return;
    }

    if (parseInt(fromChain.chainId) !== chainId) {
      messageApi.error("Please connect the chain first");
      return;
    }

    if (!fromToken.contractAddress) {
      messageApi.error(
        "The currently selected chain does not provide contract functionality"
      );
      return;
    }

    const tempSendAmount = removeLastDot(sendAmount);

    if (!tempSendAmount || Number(tempSendAmount) === 0) {
      messageApi.error("Invalid send amount");
      return;
    }

    const sendAmountBigNumber = BigNumber.from(parseEther(tempSendAmount));

    if (sendAmountBigNumber.lte(0)) {
      messageApi.error("Send amount must be greater than 0");
      return;
    }

    if (availableBalance.lte(0) || availableBalance.lt(sendAmountBigNumber)) {
      messageApi.error("Insufficient available amount");
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

    console.log("next...");

    // approve and sendtoCosmos......
  };

  return (
    <StyledBridgeCard style={{ width: 550 }}>
      <StyledSelectTokenWrapper>
        <StyledFromToText>From</StyledFromToText>
        <ChainSelectButton
          chain={fromChain}
          onClick={() => handleOpenSelectChain("from")}
        />
      </StyledSelectTokenWrapper>
      <StyledContentWrapper>
        <BridgeAmountArea
          type={"send"}
          amount={sendAmount}
          availableBalance={availableBalance}
          max={0}
          token={fromToken}
          onClick={() => handleOpenSelectToken("from")}
          onChange={handleChangeSendAmount}
        />
      </StyledContentWrapper>
      <ExchangeButtonWrapper>
        <ExchangeButton onClick={handleExchange} />
      </ExchangeButtonWrapper>
      <StyledSelectTokenWrapper>
        <StyledFromToText>To</StyledFromToText>
        <ChainSelectButton
          chain={toChain}
          onClick={() => handleOpenSelectChain("to")}
        />
      </StyledSelectTokenWrapper>
      <StyledContentWrapper>
        <BridgeAmountArea
          type={"receive"}
          amount={receiveAmount}
          availableBalance={"0"}
          max={0}
          token={toToken}
          onClick={() => handleOpenSelectToken("to")}
        />
      </StyledContentWrapper>
      <StyledConnectWalletWrapper>
        <TransferButton
          onClickExecute={handleClickExecute}
          onClickConnectWallet={handleClickConnectWallet}
        />
      </StyledConnectWalletWrapper>
      {receiveAmount && <FeeInfo />}
      <ChainSelectModal
        open={chainModalOpen}
        target={chainModalTarget}
        selected={getTargetChain()}
        onSelect={handleSelectChain}
        onCancel={closeChainModal}
      />
      <TokenSelectModal
        open={tokenModalOpen}
        target={tokenModalTarget}
        chain={getTargetTokenChain()}
        selected={getTargetToken()}
        onSelect={handleSelectToken}
        onCancel={closeTokenModal}
      />
      {contextHolder}
    </StyledBridgeCard>
  );
};

export default Bridge;
