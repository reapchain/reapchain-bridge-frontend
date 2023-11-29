import { reapchainKeplrConfig } from "constants/keplrConfig";
import { localStorageKey } from "constants/storage";
import { Chain } from "types/chain";
import { setItem } from "utils/localStorage";

type InitKeplrResponse = {
  isError: boolean;
  message?: string;
  account?: any;
};

export const initKeplr = async (): Promise<InitKeplrResponse> => {
  try {
    if (!window.getOfflineSigner || !window.keplr) {
      return {
        isError: true,
        message: "Please install keplr extension",
      };
    } else {
      if (window.keplr.experimentalSuggestChain) {
        await window.keplr.experimentalSuggestChain(reapchainKeplrConfig);
        return {
          isError: false,
        };
      } else {
        return {
          isError: true,
          message: "Please use the recent version of keplr extension",
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      isError: true,
      message: "Failed to suggest the chain",
    };
  }
};

export const connectKeplrWallet = async (chain?: Chain) => {
  try {
    const response = await initKeplr();
    if (response.isError) {
      return response;
    }

    if (!window.getOfflineSignerOnlyAmino || !window.keplr) {
      const error = "Please install Keplr extension";
      console.error(error);
      return null;
    }

    await window.keplr.enable(reapchainKeplrConfig.chainId);

    const offlineSigner = window.getOfflineSignerOnlyAmino(
      reapchainKeplrConfig.chainId
    );
    const accounts = await offlineSigner.getAccounts();

    if (accounts.length > 0) {
      const keyInfo = await window.keplr.getKey(reapchainKeplrConfig.chainId);
      setItem(localStorageKey.KEY_KEPLR_ACTIVE, "active");
      if (keyInfo) {
        return {
          isError: false,
          message: "",
          account: keyInfo,
        };
      }
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAccounts = async () => {
  try {
    if (!window.getOfflineSigner || !window.keplr) {
      return null;
    }

    await window.keplr.enable(reapchainKeplrConfig.chainId);
    const offlineSigner = window.getOfflineSigner(reapchainKeplrConfig.chainId);
    const accounts = await offlineSigner.getAccounts();

    return {
      address: accounts[0].address,
      algo: accounts[0].algo,
      pubkey: {
        "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        key: Buffer.from(accounts[0].pubkey).toString("base64") || "",
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
