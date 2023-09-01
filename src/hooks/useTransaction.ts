import React from "react";
import { ethers } from "ethers";
import BN from "bignumber.js";
import Erc20ABI from "@src/abi/ERC20.json";
export default function useTransaction() {
  const sendEth = (to: string, amount: string): any => {
    const amountInWei = new BN(amount).shiftedBy(18).toString(16);
    const tx = {
      to,
      value: amountInWei,
      data: "0x",
    };
    return tx;
  };

  const sendErc20 = (
    tokenAddress: string,
    to: string,
    amount: string,
    decimals: number
  ): any => {
    const amountInWei = new BN(amount).shiftedBy(decimals).toString(16);
    const erc20Interface = new ethers.Interface(Erc20ABI);
    const callData = erc20Interface.encodeFunctionData("transfer", [
      to,
      amountInWei,
    ]);
    const tx = {
      to: tokenAddress,
      data: callData,
    };

    return tx;
  };

  return {
    sendEth,
    sendErc20
  }
}
