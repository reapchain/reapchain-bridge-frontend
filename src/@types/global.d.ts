export {};

declare global {
  interface Window {
    window: {
      ethereum: {
        enable: Function;
      };
    };
  }
}
