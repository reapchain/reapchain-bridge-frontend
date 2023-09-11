export interface EthereumChain {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  iconUrls?: string[];
}

export interface Token {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  contractAddress: string;
  contractOwner: string;
}

export interface Chain extends EthereumChain {
  displayName?: string;
  icon: string;
  tokens: Token[];
}

export type SelectedChain = {
  name: string;
};

export type ProviderName = "injected" | undefined;
