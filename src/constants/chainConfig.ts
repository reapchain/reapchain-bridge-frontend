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

export const ethereumConfig: EthereumConfig = {
  chainIdHex: "0xAA36A7",
  chainName: "Sepolia TestNet",
  rpcEndpoint:
    "https://eth-sepolia.g.alchemy.com/v2/cwmORjO96-FP_fHlH1V-27qRBObpFnaU",
  explorerUrl: "https://sepolia.etherscan.io",
  restEndpoint: "https://test-lcd.reapchain.org",

  token: {
    name: "cREAP",
    symbol: "cREAP",
    decimals: 18,
    contractAddress: "",
  },
  nativeCurrency: {
    name: "Sepolia",
    symbol: "SepoliaETH",
    decimals: 18,
  },
};
