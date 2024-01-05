import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { BridgeABI, ERC20ABI } from "contracts/abi";
import {
  ERC20ContractAddress,
  BridgeContractAddress,
  ApproveAmount,
} from "constants/contractConfig";

export const useApprove = (address: string, provider: any) => {
  const [isApprove, setIsApprove] = useState(false);

  useEffect(() => {});

  return isApprove;
};
