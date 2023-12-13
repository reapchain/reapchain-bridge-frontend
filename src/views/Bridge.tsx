import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import styled from "styled-components";
import colors from "assets/colors";
import BridgeAmountArea from "components/bridge/BridgeAmountArea";
import ChainSelectButton from "components/bridge/ChainSelectButton";
import ExchangeButton from "components/bridge/ExchangeButton";
import TransferButton from "components/bridge/TransferButton";
import { Chain, Token } from "types/chain";
import { networks } from "constants/network";
import { useWeb3Context } from "components/common/Web3ContextProvider";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { ERC20ContractAddress } from "constants/contractConfig";
import { ERC20ABI } from "contracts/abi";
import { removeLastDot, validateDecimalInput } from "utils/number";
import { debounce } from "lodash";
import { useWeb3React } from "@web3-react/core";
import { formatEther, parseEther } from "@ethersproject/units";
import { useLocation, useNavigate } from "react-router-dom";
import { useWalletQuery, useWalletMutation } from "queries/useWalletType";
import { connectKeplrWallet } from "utils/keplr";
import { getBankBalance } from "apis/api";
import {
  useKeplrQuery,
  initKeplrWallet,
  useKeplrMutation,
} from "queries/useKeplrWallet";
import { reapchainKeplrConfig } from "constants/keplrConfig";
import {
  ethereumNetworkConfig,
  reapchainNetworkConfig,
} from "constants/networkConfig";
import BridgeTxModal from "components/bridge/modal/BridgeTxModal";
import { applySendToEthFee } from "utils/fee";

const StyledBridgeCard = styled(Card)`
  background-color: ${colors.primary};
  border: 1px solid;
  border-radius: 12px;
  border-color: ${colors.darkblue03};
  color: ${colors.godong};
  font-weight: 600;
  width: 600px;
`;

const StyledSelectChainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledContentWrapper = styled.div`
  margin-top: 20px;
`;

const StyledSelectToken = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const ExchangeButtonWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledExecuteButtonWrapper = styled.div`
  width: 600px;
  margin-top: 40px;
`;

const StyledFromToText = styled.div`
  color: ${colors.white};
  font-size: 28px;
  font-weight: 800;
  opacity: 0.2;
  vertical-align: top;
`;

const Bridge: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: walletData } = useWalletQuery();
  const targetWallet = walletData ?? "MetaMask";
  const { data: keplrData } = useKeplrQuery();
  const keplrWallet = keplrData ?? initKeplrWallet;
  const { mutate: walletMutate } = useWalletMutation();
  const { mutate: keplrMutate } = useKeplrMutation();
  const [isInit, setIsInit] = useState(true);
  const [chainModalOpen, setChainModalOpen] = useState(false);
  const [chainModalTarget, setChainModalTarget] = useState("from");
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [tokenModalTarget, setTokenModalTarget] = useState("from");
  const [fromChain, setFromChain] = useState<Chain>(ethereumNetworkConfig);
  const [toChain, setToChain] = useState<Chain>(reapchainNetworkConfig);
  const [fromToken, setFromToken] = useState<Token>(
    ethereumNetworkConfig.tokens[0]
  );
  const [toToken, setToToken] = useState<Token>(
    reapchainNetworkConfig.tokens[0]
  );
  const [sendAmount, setSendAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [availableBalance, setAvailableBalance] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const [messageApi, contextHolder] = message.useMessage();

  const [txModalOpen, setTxModalOpen] = useState<boolean>(false);

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
    if (location.pathname === "/bridge/reap") {
      navigate("/bridge/token");
    } else if (location.pathname === "/bridge/token") {
      navigate("/bridge/reap");
    } else {
      setFromChain(toChain);
      setToChain(fromChain);
      setFromToken(toChain.tokens[0]);
      setToToken(fromChain.tokens[0]);
      setSendAmount("");
      setReceiveAmount("");
    }
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

  const fetchBalanceOfCoin = async () => {
    if (!keplrData || !keplrData.isActive) {
      return;
    }

    try {
      const balance = await getBankBalance(
        reapchainKeplrConfig.rest,
        keplrWallet.address,
        reapchainKeplrConfig.currencies[0].coinMinimalDenom
      );
      if (targetWallet === "Keplr") {
        setAvailableBalance(BigNumber.from(balance));
      }
    } catch (error) {
      console.error(error);
      messageApi.warning("Failed to load available balance.");
      setAvailableBalance(BigNumber.from(0));
    }
  };

  const fetchBalanceOfToken = async () => {
    if (parseInt(fromChain.chainId) !== chainId) {
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

      if (targetWallet === "MetaMask") {
        setAvailableBalance(result);
      }

      return result;
    } catch (error) {
      console.log(error);
      setAvailableBalance(BigNumber.from(0));
    }
  };

  const fetchBalance = () => {
    if (targetWallet === "MetaMask") {
      fetchBalanceOfToken();
    } else {
      fetchBalanceOfCoin();
    }
  };

  const selectFromToChain = () => {
    if (location.pathname === "/" || location.pathname === "/bridge") {
      navigate("/bridge/token");
      return;
    }
    if (location.pathname === "/bridge/reap") {
      walletMutate("Keplr");
      setFromChain(reapchainNetworkConfig);
      setFromToken(reapchainNetworkConfig.tokens[0]);
      setToChain(ethereumNetworkConfig);
      setToToken(ethereumNetworkConfig.tokens[0]);
    } else {
      walletMutate("MetaMask");
      setFromChain(ethereumNetworkConfig);
      setFromToken(ethereumNetworkConfig.tokens[0]);
      setToChain(reapchainNetworkConfig);
      setToToken(reapchainNetworkConfig.tokens[0]);
    }
  };

  const connectWallet = () => {
    if (isInit === true) {
      setIsInit(false);
      return;
    }
    if (!isActive) {
      return;
    }
    if (targetWallet === "MetaMask") {
      connectWeb3Signer(fromChain);
    } else if (targetWallet === "Keplr") {
    }
  };

  const clearForm = () => {
    connectWallet();
    fetchBalance();
    setSendAmount("");
    setReceiveAmount("");
    setAvailableBalance(BigNumber.from(0));
  };

  useEffect(() => {
    clearForm();
    fetchBalance();
  }, [isActive, keplrWallet, fromChain, fromToken, address, provider]);

  useEffect(() => debouncedChangeSendAmount(), [sendAmount]);

  useEffect(() => {
    selectFromToChain();
    setAvailableBalance(BigNumber.from(0));
  }, [location]);

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

    if (targetWallet === "Keplr") {
      setReceiveAmount(applySendToEthFee(sendAmountBigNumber));
    } else {
      setReceiveAmount(formatEther(sendAmountBigNumber.mul(ratio)));
    }
  }, 500);

  const checkConnectWallet = () => {
    if (targetWallet === "MetaMask") {
      if (!address) {
        // messageApi.error("Please connect your MetaMask wallet.");
      }
      connectWeb3("injected");
    } else {
      if (!keplrWallet || !keplrWallet.isActive) {
        messageApi.error("Please connect your Keplr wallet.");
      }
      connectKeplr();
    }
  };

  const connectKeplr = async () => {
    const keplr = await connectKeplrWallet(networks.reapchain_testnet);
    if (!keplr) {
      return;
    }

    const keplrWallet = {
      isActive: true,
      address: keplr.account.bech32Address,
      name: keplr.account.name,
    };
    keplrMutate(keplrWallet);
    return keplr;
  };

  const executeTransaction = () => {
    setTxModalOpen(true);
  };

  const handleClickExecute = () => {
    checkConnectWallet();

    if (!sendAmount || !receiveAmount) {
      messageApi.warning("Please check your send & receive amount.");
      return;
    }

    if (targetWallet === "Keplr" && receiveAmount === "-") {
      messageApi.warning(
        "The amount you are trying to send is too low. Please set it higher."
      );
      return;
    }

    if (targetWallet === "MetaMask") {
      executeSendToCosmos();
    } else if (targetWallet === "Keplr") {
      executeSendToEth();
    }
  };

  const checkSendAmount = (): boolean => {
    const tempSendAmount = removeLastDot(sendAmount);

    if (!tempSendAmount || Number(tempSendAmount) === 0) {
      messageApi.error("Invalid send amount");
      return false;
    }

    const tempSendAmountOrigin = BigNumber.from(parseEther(tempSendAmount));

    if (tempSendAmountOrigin.lte(0)) {
      messageApi.error("Send amount must be greater than 0");
      return false;
    }

    if (availableBalance.lte(0) || availableBalance.lt(tempSendAmountOrigin)) {
      messageApi.error("Insufficient available amount");
      return false;
    }

    return true;
  };

  const executeSendToEth = async () => {
    const keplr = await connectKeplrWallet(fromChain);
    if (!keplr) {
      return;
    }
    if (!checkSendAmount()) {
      return;
    }
    setTxModalOpen(true);
  };

  const executeSendToCosmos = async () => {
    if (!signer || !provider) {
      messageApi.error("no signer");
      connectWallet();
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

    if (!checkSendAmount()) {
      return;
    }

    setTxModalOpen(true);
    return;
  };

  const handleClickModalClose = () => {
    setTxModalOpen(false);
  };

  return (
    <>
      <StyledBridgeCard>
        <StyledSelectChainWrapper>
          <ChainSelectButton chain={fromChain} onClick={() => {}} />
          <StyledFromToText>From</StyledFromToText>
        </StyledSelectChainWrapper>
        <StyledContentWrapper>
          <BridgeAmountArea
            type={"send"}
            amount={sendAmount}
            availableBalance={availableBalance}
            max={0}
            token={fromToken}
            onClick={() => {}}
            onChange={handleChangeSendAmount}
          />
        </StyledContentWrapper>
      </StyledBridgeCard>
      <ExchangeButtonWrapper>
        <ExchangeButton onClick={handleExchange} />
      </ExchangeButtonWrapper>
      <StyledBridgeCard>
        <StyledSelectChainWrapper>
          <ChainSelectButton chain={toChain} onClick={() => {}} />
          <StyledFromToText>To</StyledFromToText>
        </StyledSelectChainWrapper>
        <StyledContentWrapper>
          <BridgeAmountArea
            type={"receive"}
            amount={receiveAmount}
            availableBalance={"0"}
            max={0}
            token={toToken}
            onClick={() => {}}
          />
        </StyledContentWrapper>
      </StyledBridgeCard>
      <StyledExecuteButtonWrapper>
        <TransferButton
          onClickExecute={handleClickExecute}
          // onClickConnectWallet={handleClickConnectWallet}
        />
      </StyledExecuteButtonWrapper>
      <BridgeTxModal
        open={txModalOpen}
        targetWallet={targetWallet}
        fromChain={fromChain}
        toChain={toChain}
        fromToken={fromToken}
        toToken={toToken}
        sendAmount={sendAmount}
        receiveAmount={receiveAmount}
        availableBalance={availableBalance}
        onExecute={executeTransaction}
        onCancel={handleClickModalClose}
        clearForm={clearForm}
      />
      {contextHolder}
    </>
  );
};

export default Bridge;
