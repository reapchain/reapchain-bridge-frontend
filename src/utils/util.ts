import reapchainIcon from "assets/images/reapchain.png";
import ethereumIcon from "assets/images/ethereum.png";
import { networks } from "constants/network";
import { Chain } from "types/chain";

export const getIconSource = (logo: string) => {
  if (logo === "reapchain") {
    return reapchainIcon;
  } else if (logo === "ethereum") {
    return ethereumIcon;
  } else {
    return reapchainIcon;
  }
};

export const getDefaultNetwork = () => {
  return networks.ethereum_mainnet;
};

export const displayShortHexAddress = (hexAddress: string) => {
  return hexAddress
    .substring(0, 6)
    .concat("...", hexAddress.substring(hexAddress.length - 4));
};

export const getEthereumChainObject = (chain: Chain) => {
  return {
    chainId: chain.chainId,
    chainName: chain.chainName,
    rpcUrls: chain.rpcUrls,
    blockExplorerUrls: chain.blockExplorerUrls,
    nativeCurrency: chain.nativeCurrency,
    iconUrls: chain.iconUrls,
  };
};
// export const getChainInfo = () => {};

// interface Window {
//   ethereum: any;
// }

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

// type Chain = {
//   chainId: string;
//   chainName: string;
//   nativeCurrency: {
//     name: string;
//     symbol: string;
//     decimals: number;
//   };
//   rpcUrls: string[];
//   blockExplorerUrls: string[];
// };

// export const setChain = async (chain: Chain) => {
//   let def = ["0x1", "0x3", "0x4", "0x5", "0x2a", "0x7e7"];
//   if (def.indexOf(chain.chainId) === -1) {
//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [chain],
//     });
//   } else {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [
//         {
//           chainId: chain.chainId,
//         },
//       ],
//     });
//   }
// };

// const setChain = async (chain: Chain) => {

// Vue.prototype.getWallet = async function (parent, accountChanged) {
//     let _client;

//     if (!window.ethereum) {
//       let rpc = {};
//       rpc[process.env.VUE_APP_MAIN_ID] = process.env.VUE_APP_MAIN_URL;
//       rpc[process.env.VUE_APP_SUB_ID] = process.env.VUE_APP_SUB_URL;
//       _client = new WalletConnectProvider({ rpc });

//       let wc_inited = sessionStorage.getItem("walletconnect");
//       if (wc_inited) {
//         await _client.enable();
//       } else {
//         if (_client.connected) {
//           await _client.connector.killSession();
//         }
//         await _client.enable();

//         sessionStorage.setItem("walletconnect", "1");
//       }

//       parent.web3 = new Web3(_client);
//     } else {
//       _client = window.ethereum;
//       await _client.enable();

//       parent.web3 = new Web3(window.web3.currentProvider);
//     }

//     accountChanged(_client);

//     return await parent.web3.eth.getAccounts();
//   };
