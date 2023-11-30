export interface ReapchainConfig {
  chainId: number;
  chainIdHex: string;
  cosmosChainId: string;
  chainName: string;

  restEndpoint: string;
  rpcEndpoint: string;
  ethEndpoint: string;

  explorerUrl: string;
  walletUrl: string;
  walletUrlForStaking: string;
}

export interface EthereumTokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface EthereumConfig {
  chainIdHex: string;
  chainName: string;
  rpcEndpoint: string;
  explorerUrl: string;
  restEndpoint: string;

  token: EthereumTokenConfig;
  nativeCurrency: NativeCurrency;
}

// export const ERC20ContractAddress =
//   "0x89b7284C67B30e8E85A930B8A07c4943286D0D1d";

// export const BridgeContractAddress =
//   "0x3b2B5B6C4B72b84BAcaF50376e03E51e6103AAe3";

export const reapchainConfig: ReapchainConfig = {
  chainId: 221231,
  chainIdHex: "0x3602F",
  chainName: "Reapchain TestNet",
  cosmosChainId: "reapchain_221231-1",
  restEndpoint: "https://test-lcd.reapchain.org",
  rpcEndpoint: "https://test-rpc.reapchain.org",
  ethEndpoint: "https://test-eth.reapchain.org",
  explorerUrl: "https://test-dashboard.reapchain.org",
  walletUrl: "https://test-dashboard.reapchain.org/validators",
  walletUrlForStaking: "https://test-dashboard.reapchain.org/validators",
};

// for debug
// export const reapchainConfig: ReapchainConfig = {
//   chainId: 101010,
//   chainIdHex: "0x18A92",
//   chainName: "Reapchain Dev",
//   cosmosChainId: "dev_101010-1",
//   restEndpoint: "http://192.168.250.19:1317",
//   rpcEndpoint: "http://192.168.250.19:27000",
//   ethEndpoint: "http://192.168.250.19:27400",
//   explorerUrl: "https://test-dashboard.reapchain.org",
//   walletUrl: "https://test-dashboard.reapchain.org/validators",
//   walletUrlForStaking: "https://test-dashboard.reapchain.org/validators",
// };

export const ethereumConfig: EthereumConfig = {
  chainIdHex: "0xAA36A7",
  chainName: "Sepolia TestNet",
  // for testnet
  rpcEndpoint: "https://sepolia.infura.io/v3/04d0b50dcb5a4f8185354eb0c1e60de6",
  // for debug
  // rpcEndpoint: "https://sepolia.infura.io/v3/91032b3fbbf842e7b545289832cf07e0",
  explorerUrl: "https://sepolia.etherscan.io",
  restEndpoint: "https://test-lcd.reapchain.org",

  token: {
    name: "REAP Token",
    symbol: "REAPt",
    decimals: 18,
    contractAddress: "",
  },
  nativeCurrency: {
    name: "Sepolia",
    symbol: "SepoliaETH",
    decimals: 18,
  },
};
