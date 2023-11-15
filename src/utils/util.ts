import reapchainIcon from "assets/images/reapchain.png";
import ethereumIcon from "assets/images/ethereum.png";
import { networks } from "constants/network";
import { Chain } from "types/chain";
import { fromHex, toBech32, fromBech32, toHex } from "@cosmjs/encoding";

export const getIconSource = (logo: string) => {
  if (logo === "reapchain") {
    return reapchainIcon;
  } else if (logo === "ethereum") {
    return ethereumIcon;
  } else {
    return reapchainIcon;
  }
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

export const convertToBech32 = (hexAddress: string, prefix: string) => {
  if (hexAddress.substring(0, 2) !== "0x" || hexAddress.length !== 42) {
    return "";
  }

  return toBech32(prefix, fromHex(hexAddress.substring(2)));
};

export const convertToHex = (bech32Address: string) => {
  if (bech32Address.substring(0, 4) !== "reap" || bech32Address.length !== 43) {
    return "";
  }

  const address = fromBech32(bech32Address);

  return `0x${toHex(address.data).toUpperCase()}`;
};

export const compareHexAddress = (hexAddress1: string, hexAddress2: string) => {
  if (hexAddress1.substring(0, 2) !== "0x" || hexAddress1.length !== 42) {
    return false;
  }

  if (hexAddress2.substring(0, 2) !== "0x" || hexAddress2.length !== 42) {
    return false;
  }

  return (
    hexAddress1.substring(2).toUpperCase() ===
    hexAddress2.substring(2).toUpperCase()
  );
};
