import React, { createContext, useState, useEffect, createRef } from "react";
import { ethers } from "ethers";
import config from "../config";
import api from "../lib/api";

const eth = new ethers.JsonRpcProvider(config.rpcProvider);
interface IWalletContext {
  eth: ethers.JsonRpcProvider;
  account: string;
  walletType: string;
  walletAddress: string;
  getWalletAddressByEmail: (email: string) => Promise<string>;
  getEthBalance: () => Promise<string>;
  createWalletByEmail: (email: string) => Promise<string>;
}

export const WalletContext = createContext<IWalletContext>({
  eth,
  account: "",
  walletAddress: "",
  walletType: "",
  getWalletAddressByEmail: async (email: string) => {
    return "";
  },
  getEthBalance: async () => {
    return "";
  },
  createWalletByEmail: async (email: string) => {
    return "";
  },
});

export const WalletContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("");

  const getEthBalance = async () => {
    const res = await eth.getBalance(walletAddress);
    return ethers.formatEther(res);
  };

  const getWalletAddressByEmail = async (email: string = "") => {};
};
