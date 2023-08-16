import React, { createContext, useState, useEffect, createRef } from "react";
import { ethers } from "ethers";
import config from "../config";
import api from "../lib/api";

const ethProvider = new ethers.JsonRpcProvider(config.rpcProvider);
interface IWalletContext {
  ethProvider: ethers.JsonRpcProvider;
  account: string;
  walletType: string;
  walletAddress: string;
  ethBalance: string;
  getWalletAddressByEmail: (email: string) => Promise<any>;
  getEthBalance: (addr: string) => Promise<string>;
  createWalletByEmail: (email: string) => Promise<any>;
  verifyEmail: (email:string) => Promise<any>;
}

export const WalletContext = createContext<IWalletContext>({
  ethProvider,
  account: "",
  walletAddress: "",
  walletType: "",
  ethBalance: "",
  getWalletAddressByEmail: async (email: string) => {
    return "";
  },
  getEthBalance: async (addr: string) => {
    return "";
  },
  createWalletByEmail: async (email: string) => {
    return "";
  },
  verifyEmail: async (email: string) => {
    return "";
  }
});

export const WalletContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("0.0");
  const getEthBalance = async (addr: string = "") => {
    if (addr == "" && walletAddress == "") return;
    let address = addr;
    if (address == "") {
      address = walletAddress;
    }

    const res = await ethProvider.getBalance(address);
    setEthBalance(ethers.formatEther(res));
    return ethers.formatEther(res);
  };

  const getWalletAddressByEmail = async (email: string) => {
    let ret: any = await api.account.getAccountFromEmail(email);
    if (ret.status == "Success") {
      setWalletAddress(ret.payload.Success.wallet_address);
    }
    return ret.payload.Success;
  };

  const verifyEmail = async (email: string) => {
    let ret: any = await api.account.verify_email({ email });
    setWalletAddress(ret.payload.Success.contract_wallet_addr);
    setWalletType("eoa");
    return ret.payload.Success;
  };

  const createWalletByEmail = async (email: string) => {
    let ret: any = await api.account.create({ email });
    setWalletAddress(ret.payload.Success.contract_wallet_addr);
    setWalletType("eoa");
    return ret.payload.Success;
  };

  useEffect(() => {
    const interval = setInterval(
      (function getEthBalanceInterval(): any {
        console.log("get balance function called");
        getEthBalance();
        return getEthBalanceInterval;
      })(),
      8000
    );
    return () => clearInterval(interval);
  }, [walletAddress]);
  return (
    <WalletContext.Provider
      value={{
        ethProvider,
        account,
        walletType,
        walletAddress,
        ethBalance,
        getWalletAddressByEmail,
        createWalletByEmail,
        getEthBalance,
        verifyEmail
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextConsumer = WalletContext.Consumer;
