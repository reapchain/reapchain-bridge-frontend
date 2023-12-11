import { ethereumConfig, reapchainConfig } from "constants/chainConfig";
import { ERC20ContractAddress } from "constants/contractConfig";
import { Chain } from "types/chain";

export const reapchainNetworkConfig: Chain = {
  chainId: reapchainConfig.chainIdHex,
  chainName: reapchainConfig.chainName,
  rpcUrls: [reapchainConfig.ethEndpoint],
  blockExplorerUrls: [reapchainConfig.explorerUrl],
  nativeCurrency: {
    name: "Reapchain",
    symbol: "REAP",
    decimals: 18,
  },
  icon: "reapchain",
  iconUrls: ["https://test-dashboard.reapchain.org/reapchain_bg_logo.png"],
  tokens: [
    {
      id: 1,
      name: "Reapchain Coin",
      symbol: "REAP",
      decimals: 18,
      contractAddress: "",
      contractOwner: "",
      icon: "reapchain",
    },
    {
      id: 2,
      name: "Reapchain Token",
      symbol: "tREAP",
      decimals: 18,
      contractAddress: "",
      contractOwner: "",
      icon: "reapchain",
    },
  ],
  wallet: "Keplr",
  explorerUrl: reapchainConfig.explorerUrl,
  cosmosChainId: reapchainConfig.cosmosChainId,
  restEndpoint: reapchainConfig.restEndpoint,
};

export const ethereumNetworkConfig: Chain = {
  chainId: ethereumConfig.chainIdHex,
  chainName: ethereumConfig.chainName,
  rpcUrls: [ethereumConfig.rpcEndpoint],
  blockExplorerUrls: [ethereumConfig.explorerUrl],
  nativeCurrency: ethereumConfig.nativeCurrency,
  icon: "ethereum",
  tokens: [
    {
      id: 1,
      name: ethereumConfig.token.name,
      symbol: ethereumConfig.token.symbol,
      decimals: ethereumConfig.token.decimals,
      contractAddress: ERC20ContractAddress,
      contractOwner: "",
      icon: "reapchain_classic",
    },
  ],
  wallet: "MetaMask",
  explorerUrl: ethereumConfig.explorerUrl,
  restEndpoint: ethereumConfig.restEndpoint,
};
