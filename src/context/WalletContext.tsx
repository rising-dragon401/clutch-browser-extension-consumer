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
  getWalletAddressByEmail: (email: string) => Promise<any>;
  getEthBalance: (addr: string) => Promise<string>;
  createWalletByEmail: (email: string) => Promise<any>;
}

export const WalletContext = createContext<IWalletContext>({
  eth,
  account: "",
  walletAddress: "",
  walletType: "",
  getWalletAddressByEmail: async (email: string) => {
    return "";
  },
  getEthBalance: async (addr: string) => {
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

  const getEthBalance = async (addr: string = null) => {
    let address = addr;
    if (address == null) {
      address = walletAddress;
    }
    const res = await eth.getBalance(address);
    console.log("balance", ethers.formatEther(res));
    return ethers.formatEther(res);
  };

  const getWalletAddressByEmail = async (email: string) => {
    let ret: any = await api.account.getAccountFromEmail(email);
    if (ret.status == "Success") {
      setWalletAddress(ret.payload.Success.wallet_address);
    }
    return ret.payload.Success;
  };

  const createWalletByEmail = async (email: string) => {
    let ret: any = await api.account.create({ email });
    setWalletAddress(ret.payload.Success.contract_wallet_addr);
    setWalletType("eoa");
    return ret.payload.Success;
  };

  return (
    <WalletContext.Provider
      value={{
        eth,
        account,
        walletType,
        walletAddress,
        getWalletAddressByEmail,
        createWalletByEmail,
        getEthBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextConsumer = WalletContext.Consumer;
