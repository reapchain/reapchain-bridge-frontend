import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {
    window: {
      ethereum: {
        enable: Function;
      };
    };
  }
}
