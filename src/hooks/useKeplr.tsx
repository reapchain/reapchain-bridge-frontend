import { useState, useEffect } from "react";

export type KeplrWallet = {
  isActive: boolean;
  address: string;
  displayAddress: string;
};

const useKeplr = () => {
  const [keplr, setKeplr] = useState<KeplrWallet>({
    isActive: false,
    address: "",
    displayAddress: "",
  });

  return { keplr };
};
