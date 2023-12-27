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
  chainId: 221230,
  chainIdHex: "0x3602E",
  chainName: "Reapchain Mainnet",
  cosmosChainId: "reapchain_221230-1",
  restEndpoint: "https://lcd.reapchain.org",
  rpcEndpoint: "https://rpc.reapchain.org",
  ethEndpoint: "https://eth.reapchain.org",
  explorerUrl: "https://dashboard.reapchain.org",
  walletUrl: "https://dashboard.reapchain.org/validators",
  walletUrlForStaking: "https://dashboard.reapchain.org/validators",
};

export const ethereumConfig: EthereumConfig = {
  chainIdHex: "0x1",
  chainName: "Ethereum Mainnet",
  rpcEndpoint:
    "https://eth-mainnet.g.alchemy.com/v2/DSY-jTsvVAugxdLRg-AR1GJDAFAJeUyA",
  explorerUrl: "https://etherscan.io",
  restEndpoint: "",
  token: {
    name: "cREAP",
    symbol: "cREAP",
    decimals: 18,
    contractAddress: "",
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};
