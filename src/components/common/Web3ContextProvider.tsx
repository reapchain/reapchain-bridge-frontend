import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { message } from "antd";
import {
  JsonRpcProvider,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { getDefaultNetwork, getEthereumChainObject } from "utils/util";
import { useAsync } from "react-use";
import { Chain, EthereumChain } from "types/chain";
import { useWeb3React } from "@web3-react/core";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "utils/localStorage";
import { localStorageKey } from "constants/storage";

interface Web3ContextProps {
  provider: JsonRpcProvider | undefined;
  signer: JsonRpcSigner | undefined;
  network: string | undefined;
  address: string;
  rpcUrl: string;
  chainId: number;
  chain: Chain | undefined;
  connecting: boolean;
  isActive: boolean;
  isActivating: boolean;
  connectWeb3: (
    providerName: string,
    catchMethmod?: () => void
  ) => Promise<void>;
  disconnectWeb3: () => Promise<void>;
  connectWeb3Signer: (chain: Chain) => Promise<void>;
}

export const Web3Context = createContext<Web3ContextProps>({
  provider: undefined,
  signer: undefined,
  network: undefined,
  address: "",
  rpcUrl: "",
  chainId: 0,
  chain: undefined,
  connecting: false,
  isActive: false,
  isActivating: false,
  connectWeb3: async () => {},
  disconnectWeb3: async () => {},
  connectWeb3Signer: async () => {},
});

interface Web3ContextProviderProps {
  children: ReactElement;
}

const Web3ContextProvider: React.FC<Web3ContextProviderProps> = ({
  children,
}) => {
  const defaultNetwork = getDefaultNetwork();
  const { connector, hooks } = useWeb3React();

  // const [provider, setProvider] = useState<JsonRpcProvider>();
  // const [signer, setSigner] = useState<JsonRpcSigner>();
  const [network, setNetwork] = useState(defaultNetwork.chainName);
  // const [address, setAddress] = useState("");
  const [rpcUrl, setRpcUrl] = useState(defaultNetwork.rpcUrls[0]);
  // const [chainId, setChainId] = useState(0);
  const [connectName, setConnectName] = useState("injected");
  const [connecting, setConnecting] = useState(false);
  const [web3Connection, setWeb3Connection] = useState<any>();

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
  const chainId = useSelectedChainId(connector) || 0;
  const chain = undefined;
  const provider = useSelectedProvider(connector);
  const signer = useSelectedProvider(connector)?.getSigner();

  const address = useSelectedAccount(connector) || "";

  const [error, setError] = useState<Error | undefined>(undefined);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  const [messageApi, contextHolder] = message.useMessage();

  useAsync(async () => {
    if (!web3Connection) {
      return;
    }
    web3Connection.on("accountsChanged", () => {
      console.log("accountsChanged");
      window.location.reload();
    });
    web3Connection.on("chainChanged", () => {
      console.log("chainChanged");
      window.location.reload();
    });
    web3Connection.on("disconnect", () => {
      console.log("disconnect");
      window.location.reload();
    });
  }, [web3Connection]);

  const connectWeb3 = useCallback(
    async (providerName: string, catchMethmod?: () => void) => {
      setError(undefined);

      setConnecting(true);
      setConnectName("injected");
      // connect to wallet......

      setConnectionStatus("Connecting..");

      try {
        await connector.activate(1);

        // switch
      } catch (error: any) {
        console.log(error);
        messageApi.error(error.message || "error");
      }

      setLocalStorageItem(localStorageKey.KEY_PROVIDER_TYPE, "injected");
    },
    []
  );

  const disconnectWeb3 = useCallback(async () => {
    setError(undefined);
    setConnecting(false);
    setConnectName("");
    removeLocalStorageItem(localStorageKey.KEY_PROVIDER_TYPE);

    messageApi.warning("Disconnected");

    await connector.resetState();
  }, []);

  useEffect(() => {
    if (getLocalStorageItem("provider") === "injected") {
      connectWeb3("injected");
    }
  }, []);

  const connectWeb3Signer = useCallback(async (chain: Chain) => {
    try {
      if (!connector.provider) {
        messageApi.info("Please install and run MetaMask");

        await connectWeb3("injected");

        if (!isActive) {
          return;
        }
        // window.open(metamaskDownloadLink, "_blank");
      }

      if (!connector.provider) {
        return;
      }

      await connector.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chain.chainId }],
      });

      messageApi.success("Connected");
    } catch (switchError: any) {
      console.log("switchError : ", switchError, chain);

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
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        network,
        address,
        rpcUrl,
        chainId,
        chain,
        connecting,
        isActive,
        isActivating,
        connectWeb3,
        disconnectWeb3,
        connectWeb3Signer,
      }}
    >
      {children}
      {contextHolder}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;

export const useWeb3Context: () => Web3ContextProps = () =>
  useContext(Web3Context);
