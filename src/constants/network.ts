import { Chain } from "types/chain";

type NetworkList = {
  reapchain_mainnet: Chain;
  reapchain_testnet: Chain;
  ethereum_mainnet: Chain;
  ethereum_sepolia: Chain;
};

export const networks: NetworkList = {
  reapchain_mainnet: {
    chainId: "0x3602E",
    chainName: "Reapchain Mainnet",
    rpcUrls: ["https://eth.reapchain.org"],
    blockExplorerUrls: ["https://dashboard.reapchain.org"],
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
    explorerUrl: "https://test-dashboard.reapchain.org",
    cosmosChainId: "reapchain_221230-1",
  },
  // reapchain_testnet: {
  //   chainId: "0x7e7",
  //   chainName: "Reapchain Bridge Testnet",
  //   rpcUrls: ["http://43.201.57.7:27400"],
  //   blockExplorerUrls: ["https://test-dashboard.reapchain.org"],
  //   nativeCurrency: {
  //     name: "Reapchain",
  //     symbol: "REAP",
  //     decimals: 18,
  //   },
  //   icon: "reapchain",
  //   iconUrls: ["https://test-dashboard.reapchain.org/reapchain_bg_logo.png"],
  //   tokens: [
  //     {
  //       id: 1,
  //       name: "Reapchain Test Coin",
  //       symbol: "REAP",
  //       decimals: 18,
  //       contractAddress: "",
  //       contractOwner: "",
  //       icon: "reapchain",
  //     },
  //     {
  //       id: 2,
  //       name: "Reapchain Test Token",
  //       symbol: "tREAP",
  //       decimals: 18,
  //       contractAddress: "",
  //       contractOwner: "",
  //       icon: "reapchain",
  //     },
  //   ],
  //   wallet: "Keplr",
  //   explorerUrl: "https://test-dashboard.reapchain.org",
  // },
  reapchain_testnet: {
    chainId: "0x3602F",
    chainName: "Reapchain Testnet",
    rpcUrls: ["https://test-eth.reapchain.org"],
    blockExplorerUrls: ["https://test-dashboard.reapchain.org"],
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
        name: "REAP",
        symbol: "REAP",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "reapchain",
      },
      {
        id: 2,
        name: "Reapchain Test Token",
        symbol: "tREAP",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "reapchain",
      },
    ],
    wallet: "Keplr",
    explorerUrl: "https://test-dashboard.reapchain.org",
    cosmosChainId: "reapchain_221231-1",
  },
  ethereum_mainnet: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    icon: "ethereum",
    tokens: [
      {
        id: 1,
        name: "Ethereum Coin",
        symbol: "ETH",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "ethereum",
      },
      {
        id: 2,
        name: "Ethereum Token",
        symbol: "reapETH",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "ethereum",
      },
    ],
    wallet: "MetaMask",
    explorerUrl: "https://etherscan.io",
  },
  ethereum_sepolia: {
    chainId: "0xAA36A7",
    chainName: "Ethereum Sepolia Testnet",
    rpcUrls: ["https://test-eth-rpc.reapchain.org"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    nativeCurrency: {
      name: "Sepolia",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    icon: "ethereum",
    tokens: [
      {
        id: 1,
        name: "cREAP",
        symbol: "cREAP",
        decimals: 18,
        contractAddress: "0x89b7284C67B30e8E85A930B8A07c4943286D0D1d",
        contractOwner: "",
        icon: "ethereum",
      },
    ],
    wallet: "MetaMask",
    explorerUrl: "https://sepolia.etherscan.io",
  },
};

export const defaultReapchainNetwork = networks.reapchain_testnet;
export const defaultEthereumNetwork = networks.ethereum_sepolia;
