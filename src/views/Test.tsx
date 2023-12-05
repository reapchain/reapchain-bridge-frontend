import React, { useEffect, useState } from "react";
import { networks } from "constants/network";
import { Chain } from "types/chain";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from "@ethersproject/units";
import { getEthereumChainObject } from "utils/util";
import { message } from "antd";
import { BridgeABI, ERC20ABI } from "contracts/abi";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";
import Web3 from "web3";
import { fetchBankBalance, sendToEth, transferReap } from "utils/metamask";
import TopButton from "components/common/button/TopButton";
import TabButton from "components/common/button/TabButton";
import TabButton2 from "components/common/button/TabButton2";
import ExecuteButton from "components/common/button/ExecuteButton";

type Props = {};

const ERC20ContractAddress = "0x89b7284C67B30e8E85A930B8A07c4943286D0D1d";
const BridgeContractAddress = "0xD927E5fd74928e273F586E8F9eDfF0D7001292CB";
// const BridgeContractAddress = "0x00c670Fa32173b40b12f5AEf811600AfEa11d7E9";
const myAccount1 = "0x1F45834d8a907B12870498341De6C79609dfa1E8";
const myAccount2 = "0x8e03c003d2e0D1fFC4786F7E1D6BF9BeaBB33A61";
const myAccount1Bech32 = "reap1razcxnv2jpa39pcynq6pmek8jcyalg0gdv3fx7";

const Test: React.FC = (props: Props) => {
  const { connector, hooks } = useWeb3React();
  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
    useSelectedProvider,
  } = hooks;
  const account = useSelectedAccount(connector);
  const chain = useSelectedChainId(connector);
  const provider = useSelectedProvider(connector);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [web3, setWeb3] = useState<Web3<RegisteredSubscription> | undefined>();

  // const { activate, deactivate, account, chainId } = useWeb3React();

  const [messageApi, contextHolder] = message.useMessage();

  const fetchWeb3 = () => {
    if ((window as any).ethereum === undefined) {
      messageApi.warning("Please install Metamask and connect");
      return;
    }

    const web3 = new Web3(connector.provider);

    if (!web3 || !account) {
      return;
    }

    return web3;
  };

  const testFunction = async () => {
    console.log("testFunction");

    messageApi.success("test");
  };

  // @@ transfer
  const handleClickTransfer = async () => {
    console.log("handleClickTransfer");
    const web3 = fetchWeb3();
    console.log(web3);

    if (!web3) {
      return;
    }

    try {
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: myAccount2,
        value: web3.utils.toWei("0.01", "ether"),
      });
      console.log(tx);
      //tx.transactionHash
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleClickERC20BalanceOf = async () => {
    console.log("handleClickERC20");
    const web3 = fetchWeb3();

    if (!web3) {
      return;
    }

    const contract = new Contract(ERC20ContractAddress, ERC20ABI, provider);
    const result = await contract.balanceOf(myAccount1);
    console.log("balanceOf result : ", formatEther(result), " cREAP");
  };

  const handleClickERC20Transfer = async () => {
    try {
      const contract = new Contract(
        ERC20ContractAddress,
        ERC20ABI,
        provider?.getSigner()
      );
      const result = await contract.transfer(myAccount2, parseEther("100"));
      console.log("transfer result : ", result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickERC20Approve = async () => {
    try {
      const contract = new Contract(
        ERC20ContractAddress,
        ERC20ABI,
        provider?.getSigner()
      );
      const result = await contract.approve(
        BridgeContractAddress,
        parseEther("100"),
        {
          gasLimit: 50000,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSendToCosmos = async () => {
    console.log("handleClickSendToCosmos");
    try {
      const contract = new Contract(
        BridgeContractAddress,
        BridgeABI,
        provider?.getSigner()
      );
      const result = await contract.sendToCosmos(
        ERC20ContractAddress,
        myAccount1Bech32,
        parseEther("100"),
        // parseEther("100")
        {
          gasLimit: 100000,
        }
      );
      console.log("result : ", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (provider) {
      // handleSwitch(networks.ethereum_sepolia);

      const tempWeb3 = fetchWeb3();
      setWeb3(tempWeb3);
    }
  }, [provider]);

  const handleSwitch = async (chain: Chain) => {
    console.log("handleSwitch : ", chain);
    console.log("connector.provider : ", connector.provider);

    try {
      if (!connector.provider) {
        console.log("no provider...");
        // window.open(metamaskDownloadLink, "_blank");
        return;
      }
      await connector.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain.chainId }],
      });
    } catch (switchError: any) {
      console.log("switchError : ", switchError);
      messageApi.error("error");
      if (switchError.code && switchError.code === 4902) {
        try {
          await connector.provider?.request({
            method: "wallet_addEthereumChain",
            params: [getEthereumChainObject(chain)],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleClickBankBalance = () => {
    console.log("handleClickBankBalance");

    if (!account) {
      return;
    }

    fetchBankBalance(account, "areap");
  };

  const handleClickSendToEth = () => {
    if (!connector.provider) {
      console.error("no provider");
      return;
    }
    sendToEth(account || "", connector.provider!, {});
  };

  const handleClickTransferReap = () => {
    if (!connector.provider) {
      console.error("no provider");
      return;
    }
    transferReap(account || "", connector.provider!, {});
  };

  return (
    <div>
      <div>
        <h1>Test</h1>

        {/* <div style={{ padding: "24px", flex: "0", gap: "12px" }}>
          <TopButton text={"rBridge"} />
          <TabButton active={true} from={"rBridge"} to={"rBridge"} />
          <TabButton active={false} from={"rBridge"} to={"rBridge"} />
          <ExecuteButton text={"rBridge"} />
        </div> */}

        <div>
          <div>
            <h3>Address - {account ? account : "No Account Detected"}</h3>
            <h3>ChainId - {chain ? chain : "No Chain Connected"}</h3>
          </div>

          <div>
            <button onClick={testFunction}>Test</button>
          </div>

          <div>
            <button onClick={() => handleSwitch(networks.ethereum_sepolia)}>
              {networks.ethereum_sepolia.chainName}
            </button>
            <br />
            <button onClick={() => handleSwitch(networks.reapchain_testnet)}>
              {networks.reapchain_testnet.chainName}
            </button>
            <br />
          </div>
        </div>
        <div>
          <h2>Sepolia Testnet</h2>
          <button onClick={handleClickTransfer}>ETH Transfer</button>
          <br />
          <button onClick={handleClickERC20BalanceOf}>ERC20 - balanceOf</button>
          <br />
          <button onClick={handleClickERC20Transfer}>ERC20 - Transfer</button>
          <br />
          <button onClick={handleClickERC20Approve}>ERC20 - Approve</button>
          <br />
          <button onClick={handleClickSendToCosmos}>
            Bridge - sendToCosmos
          </button>
        </div>
        <hr />
        <div>
          <h2>Reapchain Testnet</h2>
          <button onClick={handleClickBankBalance}>Reap - Balance</button>
          <br />
          <button onClick={handleClickTransferReap}>Reap - Transfer</button>
          <br />
          <button onClick={handleClickSendToEth}>Reap - SendToEth</button>
          <br />
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Test;
