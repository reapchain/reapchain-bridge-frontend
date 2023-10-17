import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import colors from "assets/colors";
import BridgeAmountArea from "components/bridge/BridgeAmountArea";
import ChainSelectButton from "components/bridge/ChainSelectButton";
import ChainSelectModal from "components/bridge/ChainSelectModal";
import ExchangeButton from "components/bridge/ExchangeButton";
import ExecuteButton from "components/bridge/ExecuteButton";
import { Chain, Token } from "types/chain";
import { networks } from "constants/network";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import TokenSelectModal from "components/bridge/TokenSelectModal";
import { BigNumber } from "@ethersproject/bignumber";
import {
  applyAmountNumber,
  removeLastDot,
  validateDecimalInput,
} from "utils/number";
import { debounce } from "lodash";
import FeeInfo from "components/bridge/FeeInfo";

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
  const [fromChain, setFromChain] = useState<Chain>(networks.ethereum_mainnet);
  const [toChain, setToChain] = useState<Chain>(networks.reapchain_mainnet);
  const [fromToken, setFromToken] = useState<Token>(
    networks.ethereum_mainnet.tokens[0]
  );
  const [toToken, setToToken] = useState<Token>(
    networks.reapchain_mainnet.tokens[0]
  );
  const [sendAmount, setSendAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  // const [sendAmount, setSendAmount] = useState<BigNumber>(BigNumber.from("0"));
  // const [receiveAmount, setReceiveAmount] = useState<BigNumber>(
  //   BigNumber.from("0")
  // );

  const {
    provider,
    address,
    isActive,
    signer,
    connectWeb3,
    connectWeb3Signer,
  } = useWeb3Context();

  const handleOpenSelectChain = (target: string) => {
    setChainModalTarget(target);
    openChainModal();
  };

  const handleSelectChain = (target: string, chain: Chain) => {
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

  useEffect(() => {
    if (isInit === true) {
      setIsInit(false);
      return;
    }

    if (!isActive) {
      return;
    }

    connectWeb3Signer(fromChain);
  }, [isActive, fromChain]);

  useEffect(() => {}, [chainModalTarget]);
  useEffect(() => {}, [tokenModalTarget]);
  useEffect(() => debouncedCalcFee(), [sendAmount]);

  const handleChangeSendAmount = (value: string) => {
    const tempValue = validateDecimalInput(value);

    setSendAmount(tempValue);
  };

  // const handleChangeReceiveAmount = (value: string) => {
  //   setReceiveAmount(value);
  // };

  const calcReceiveAmountAndFee = () => {
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

    const tempReceiveAmount = Number(tempSendAmount) * ratio;

    setReceiveAmount(tempReceiveAmount.toString());
  };

  const debouncedCalcFee = debounce(calcReceiveAmountAndFee, 500);

  const handleClickExecute = () => {
    console.log("handleClickExecute");
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
          max={0}
          token={toToken}
          onClick={() => handleOpenSelectToken("to")}
        />
      </StyledContentWrapper>
      <StyledConnectWalletWrapper>
        <ExecuteButton onClick={handleClickExecute} />
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
    </StyledBridgeCard>
  );
};

export default Bridge;
