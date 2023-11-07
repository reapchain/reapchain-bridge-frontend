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

// export const hexToBech32 = (hex: string) => {
//   return converter("reap").toBech32(hex);
// };

// export const bech32ToHex = (bech32: string) => {
//   return converter("eth").toBech32(bech32);
// };

// export const makeChecksummedHexEncoder = () => {
//   return (data: any) => toChecksumAddress(data.toString("hex"), null);
// };

// export const makeChecksummedHexDecoder = () => {
//   return (data: any) => {
//     const stripped = stripHexPrefix(data);
//     if (
//       !isValidChecksumAddress(data, null) &&
//       stripped !== stripped.toLowerCase() &&
//       stripped !== stripped.toUpperCase()
//     ) {
//       throw Error("Invalid address checksum");
//     }
//     return Buffer.from(stripHexPrefix(data), "hex");
//   };
// };

// const hexChecksumChain = (name: string) => ({
//   decoder: makeChecksummedHexDecoder(),
//   encoder: makeChecksummedHexEncoder(),
//   name,
// });

// export const ETH = hexChecksumChain("ETH");

// function makeBech32Encoder(prefix: string) {
//   return (data: any) => encode(prefix, toWords(data));
// }

// function makeBech32Decoder(currentPrefix: string) {
//   return (data: any) => {
//     const { prefix, words } = decode(data);
//     if (prefix !== currentPrefix) {
//       throw Error("Unrecognised address format");
//     }
//     return Buffer.from(fromWords(words));
//   };
// }

// const bech32Chain = (name: string, prefix: string) => ({
//   decoder: makeBech32Decoder(prefix),
//   encoder: makeBech32Encoder(prefix),
//   name,
// });

// export const REAP = bech32Chain("REAP", "reap");

// export const ethToReap = (ethAddress: string) => {
//   let data = ETH.decoder(ethAddress);
//   return REAP.encoder(data);
// };

// export const reapToEth = (evmosAddress: string) => {
//   let data = REAP.decoder(evmosAddress);
//   return ETH.encoder(data);
// };
