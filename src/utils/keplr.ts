import { localStorageKey } from "constants/storage";
import { Chain } from "types/chain";
import { setItem } from "utils/localStorage";

type InitKeplrResponse = {
  isError: boolean;
  message?: string;
  account?: any;
};

export const initKeplr = async (
  chainConfig: any
): Promise<InitKeplrResponse> => {
  if (!window.getOfflineSigner || !window.keplr) {
    return {
      isError: true,
      message: "Please install keplr extension",
    };
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain(chainConfig);
        return {
          isError: false,
        };
      } catch (error) {
        console.log(error);
        return {
          isError: true,
          message: "Failed to suggest the chain",
        };
      }
    } else {
      return {
        isError: true,
        message: "Please use the recent version of keplr extension",
      };
    }
  }
};

export const connectKeplrWallet = async (chain: Chain) => {
  const chainConfig = getKeplrChainConfig(chain);

  const response = await initKeplr(chainConfig);
  if (response.isError) {
    return response;
  }

  if (!window.getOfflineSignerOnlyAmino || !window.keplr) {
    const error = "Please install Keplr extension";
    console.error(error);
    return null;
  }

  await window.keplr.enable(chainConfig.chainId);

  const offlineSigner = window.getOfflineSignerOnlyAmino(chainConfig.chainId);
  const accounts = await offlineSigner.getAccounts();

  if (accounts.length > 0) {
    const keyInfo = await window.keplr.getKey(chainConfig.chainId);
    setItem(localStorageKey.KEY_KEPLR_ACTIVE, "active");
    if (keyInfo) {
      return {
        isError: false,
        message: "",
        account: keyInfo,
      };
    }
  }

  return null;
};

export const getAccounts = async (chain: Chain) => {
  try {
    if (!window.getOfflineSigner || !window.keplr) {
      return null;
    }

    const chainConfig = getKeplrChainConfig(chain);

    await window.keplr.enable(chainConfig.chainId);
    const offlineSigner = window.getOfflineSigner(chainConfig.chainId);
    const accounts = await offlineSigner.getAccounts();

    return {
      address: accounts[0].address,
      algo: accounts[0].algo,
      pubkey: {
        "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        key: Buffer.from(accounts[0].pubkey).toString("base64") || "",
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const testChainConfig = {
  rpc: "https://test-rpc.reapchain.org",
  rpcConfig: undefined,
  rest: "https://test-lcd.reapchain.org",
  restConfig: undefined,
  chainId: "reapchain_221231-1",
  chainName: "Reapchain TestNet",
  stakeCurrency: {
    coinDenom: "reap",
    coinMinimalDenom: "areap",
    coinDecimals: 18,
    coinGeckoId: "reap",
  },
  walletUrl: "https://test-dashboard.reapchain.org/validators",
  walletUrlForStaking: "https://test-dashboard.reapchain.org/validators",
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "reap",
    bech32PrefixAccPub: "reappub",
    bech32PrefixValAddr: "reapvaloper",
    bech32PrefixValPub: "reapvaloperpub",
    bech32PrefixConsAddr: "reapvalcons",
    bech32PrefixConsPub: "reapvalconspub",
  },
  currencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  gasPriceStep: {
    low: 120000000,
    average: 125000000,
    high: 130000000,
  },
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  beta: true,
};

const devChainConfig = {
  rpc: "http://43.201.57.7:27000",
  rpcConfig: undefined,
  rest: "http://43.201.57.7:1317",
  restConfig: undefined,
  chainId: "mercury_2023-1",
  chainName: "Reapchain TestNet",
  stakeCurrency: {
    coinDenom: "reap",
    coinMinimalDenom: "areap",
    coinDecimals: 18,
    coinGeckoId: "reap",
  },
  walletUrl: "https://test-dashboard.reapchain.org/validators",
  walletUrlForStaking: "https://test-dashboard.reapchain.org/validators",
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "reap",
    bech32PrefixAccPub: "reappub",
    bech32PrefixValAddr: "reapvaloper",
    bech32PrefixValPub: "reapvaloperpub",
    bech32PrefixConsAddr: "reapvalcons",
    bech32PrefixConsPub: "reapvalconspub",
  },
  currencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  gasPriceStep: {
    low: 120000000,
    average: 125000000,
    high: 130000000,
  },
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  beta: true,
};

const mainChainConfig = {
  rpc: "https://rpc.reapchain.org",
  rpcConfig: undefined,
  rest: "https://lcd.reapchain.org",
  restConfig: undefined,
  chainId: "reapchain_221230-1",
  chainName: "Reapchain MainNet",
  stakeCurrency: {
    coinDenom: "reap",
    coinMinimalDenom: "areap",
    coinDecimals: 18,
    coinGeckoId: "reap",
  },
  walletUrl: "https://dashboard.reapchain.org/validators",
  walletUrlForStaking: "https://dashboard.reapchain.org/validators",
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: "reap",
    bech32PrefixAccPub: "reappub",
    bech32PrefixValAddr: "reapvaloper",
    bech32PrefixValPub: "reapvaloperpub",
    bech32PrefixConsAddr: "reapvalcons",
    bech32PrefixConsPub: "reapvalconspub",
  },
  currencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "REAP",
      coinMinimalDenom: "areap",
      coinDecimals: 18,
    },
  ],
  gasPriceStep: {
    low: 120000000,
    average: 125000000,
    high: 130000000,
  },
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  beta: true,
};

export const getKeplrChainConfig = (chain: Chain) => {
  if (chain.chainId === "0x3602E") {
    return mainChainConfig;
  } else if (chain.chainId === "0x3602F") {
    return testChainConfig;
  } else if (chain.chainId === "0x7e7") {
    return devChainConfig;
  } else {
    return devChainConfig;
    // throw new Error("Not supported chain.");
  }
};
