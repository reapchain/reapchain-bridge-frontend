import React, { useEffect, useState } from "react";
import { networks } from "constants/network";
import { Chain } from "types/chain";
import { useWeb3React } from "@web3-react/core";
import { metamaskDownloadLink } from "constants/link";

type Props = {};

const Test: React.FC = (props: Props) => {
  // const { data } = useChainQuery();

  const handleClickConnect = () => {
    console.log("handleClickConnect...");

    // mutate(reapchainTestNet);
  };

  // const { register, handleSubmit } = useForm<>();

  // const onSubmit = handleSubmit((value) => {
  //   mutate(reapchainTestNet);
  // });

  // useEffect(() => {}, [data]);

  const { connector, hooks } = useWeb3React();

  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
    useSelectedProvider,
  } = hooks;
  const isActivating = useSelectedIsActivating(connector);
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const chain = useSelectedChainId(connector);
  const provider = useSelectedProvider(connector);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const handleToggleConnect = () => {
    setError(undefined); // clear error state

    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
      }
    } else if (!isActivating) {
      setConnectionStatus("Connecting..");
      Promise.resolve(connector.activate(1)).catch((e) => {
        connector.resetState();
        setError(e);
      });
    }
  };
  useEffect(() => {
    if (isActive) {
      setConnectionStatus("Connected");
    } else {
      setConnectionStatus("Disconnected");
    }
  }, [isActive]);

  const [myTest, setMyTest] = useState<any>("none");
  const testFunction = async () => {};

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
      if (switchError.code && switchError.code === 4902) {
        try {
          await connector.provider?.request({
            method: "wallet_addEthereumChain",
            params: [chain],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <div>Test</div>
      <div>
        <header>
          <button onClick={handleClickConnect}>Connect Test</button>
        </header>

        <div>
          <h1>Connection</h1>
          <div>
            <div>queryTest</div>
            {/* <div>data : {data ? data.chainName : "not selected"}</div> */}

            <div></div>

            <div></div>
            <div>
              {/* <button onClick={handleClickTest}>Change</button> */}
              <br />
              <button onClick={() => handleSwitch(networks.reapchain_mainnet)}>
                {networks.reapchain_mainnet.chainName}
              </button>
              <br />
              <button onClick={() => handleSwitch(networks.reapchain_testnet)}>
                {networks.reapchain_testnet.chainName}
              </button>
              <br />
              <button onClick={() => handleSwitch(networks.ethereum_mainnet)}>
                {networks.ethereum_mainnet.chainName}
              </button>
              <br />
              <button onClick={() => handleSwitch(networks.ethereum_sepolia)}>
                {networks.ethereum_sepolia.chainName}
              </button>
              <br />
            </div>
          </div>
          <div>
            <h3>
              Status -{" "}
              {error?.message ? "Error: " + error.message : connectionStatus}
            </h3>
            <h3>Address - {account ? account : "No Account Detected"}</h3>
            <h3>ChainId - {chain ? chain : "No Chain Connected"}</h3>
            <button onClick={handleToggleConnect} disabled={false}>
              {isActive ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
