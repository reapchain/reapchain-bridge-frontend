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
    // chainId: "0x3602E",
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
  },
  reapchain_testnet: {
    // chainId: "0x3602F",
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
        name: "Reapchain Test Coin",
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
  },
  ethereum_sepolia: {
    chainId: "0xAA36A7",
    chainName: "Ethereum Sepolia Testnet",
    rpcUrls: ["https://sepolia.infura.io/v3/04d0b50dcb5a4f8185354eb0c1e60de6"],
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
        name: "Ethereum Sepolia Coin",
        symbol: "SepoliaETH",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "ethereum",
      },
      {
        id: 2,
        name: "Ethereum Sepolia Token",
        symbol: "reapETH",
        decimals: 18,
        contractAddress: "",
        contractOwner: "",
        icon: "ethereum",
      },
    ],
  },
};

/*
# market
REACT_APP_COIN_GECKO_URL = "https://api.coingecko.com"
REACT_APP_GATE_IO_URL = "https://data.gateapi.io"
*/