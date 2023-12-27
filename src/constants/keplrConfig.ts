import { reapchainConfig } from "constants/chainConfig";

export const reapchainKeplrConfig = {
  rpc: reapchainConfig.rpcEndpoint,
  rpcConfig: undefined,
  rest: reapchainConfig.restEndpoint,
  restConfig: undefined,
  chainId: reapchainConfig.cosmosChainId,
  chainName: reapchainConfig.chainName,
  stakeCurrency: {
    coinDenom: "reap",
    coinMinimalDenom: "areap",
    coinDecimals: 18,
    coinGeckoId: "reap",
  },
  walletUrl: reapchainConfig.walletUrl,
  walletUrlForStaking: reapchainConfig.walletUrlForStaking,
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
      gasPriceStep: {
        low: 120000000,
        average: 125000000,
        high: 130000000,
      },
    },
  ],
  features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
  beta: true,
};

// export const devChainConfig = {
//   rpc: "http://43.201.57.7:27000",
//   rpcConfig: undefined,
//   rest: "http://43.201.57.7:1317",
//   restConfig: undefined,
//   chainId: "mercury_2023-1",
//   chainName: "Reapchain TestNet",
//   stakeCurrency: {
//     coinDenom: "reap",
//     coinMinimalDenom: "areap",
//     coinDecimals: 18,
//     coinGeckoId: "reap",
//   },
//   walletUrl: "https://test-dashboard.reapchain.org/validators",
//   walletUrlForStaking: "https://test-dashboard.reapchain.org/validators",
//   bip44: {
//     coinType: 60,
//   },
//   bech32Config: {
//     bech32PrefixAccAddr: "reap",
//     bech32PrefixAccPub: "reappub",
//     bech32PrefixValAddr: "reapvaloper",
//     bech32PrefixValPub: "reapvaloperpub",
//     bech32PrefixConsAddr: "reapvalcons",
//     bech32PrefixConsPub: "reapvalconspub",
//   },
//   currencies: [
//     {
//       coinDenom: "REAP",
//       coinMinimalDenom: "areap",
//       coinDecimals: 18,
//     },
//   ],
//   feeCurrencies: [
//     {
//       coinDenom: "REAP",
//       coinMinimalDenom: "areap",
//       coinDecimals: 18,
//     },
//   ],
//   gasPriceStep: {
//     low: 120000000,
//     average: 125000000,
//     high: 130000000,
//   },
//   features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
//   beta: true,
// };

// export const mainChainConfig = {
//   rpc: "https://rpc.reapchain.org",
//   rpcConfig: undefined,
//   rest: "https://lcd.reapchain.org",
//   restConfig: undefined,
//   chainId: "reapchain_221230-1",
//   chainName: "Reapchain MainNet",
//   stakeCurrency: {
//     coinDenom: "reap",
//     coinMinimalDenom: "areap",
//     coinDecimals: 18,
//     coinGeckoId: "reap",
//   },
//   walletUrl: "https://dashboard.reapchain.org/validators",
//   walletUrlForStaking: "https://dashboard.reapchain.org/validators",
//   bip44: {
//     coinType: 60,
//   },
//   bech32Config: {
//     bech32PrefixAccAddr: "reap",
//     bech32PrefixAccPub: "reappub",
//     bech32PrefixValAddr: "reapvaloper",
//     bech32PrefixValPub: "reapvaloperpub",
//     bech32PrefixConsAddr: "reapvalcons",
//     bech32PrefixConsPub: "reapvalconspub",
//   },
//   currencies: [
//     {
//       coinDenom: "REAP",
//       coinMinimalDenom: "areap",
//       coinDecimals: 18,
//     },
//   ],
//   feeCurrencies: [
//     {
//       coinDenom: "REAP",
//       coinMinimalDenom: "areap",
//       coinDecimals: 18,
//     },
//   ],
//   gasPriceStep: {
//     low: 120000000,
//     average: 125000000,
//     high: 130000000,
//   },
//   features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
//   beta: true,
// };
