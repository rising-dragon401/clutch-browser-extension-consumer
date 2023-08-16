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
  isRequesting: boolean;
  getWalletAddressByEmail: (email: string) => Promise<any>;
  getEthBalance: (addr: string) => Promise<string>;
  createWalletByEmail: (email: string, code: string) => Promise<any>;
  verifyEmail: (email: string) => Promise<any>;
}

export const WalletContext = createContext<IWalletContext>({
  ethProvider,
  account: "",
  walletAddress: "",
  walletType: "",
  ethBalance: "",
  isRequesting: false,
  getWalletAddressByEmail: async (email: string) => {
    return "";
  },
  getEthBalance: async (addr: string) => {
    return "";
  },
  createWalletByEmail: async (email: string, code: string) => {
    return "";
  },
  verifyEmail: async (email: string) => {
    return "";
  },
});

export const WalletContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("0.0");
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const getEthBalance = async (addr: string = "") => {
    if (addr == "" && walletAddress == "") return;
    let address = addr;
    if (address == "") {
      address = walletAddress;
    }

    try {
      // setIsRequesting(true);
      const res = await ethProvider.getBalance(address);
      setEthBalance(ethers.formatEther(res));
      return ethers.formatEther(res);
    } catch (e) {
      console.log("error: ", e);
    } finally {
      // setIsRequesting(false);
    }
  };

  const getWalletAddressByEmail = async (email: string) => {
    setIsRequesting(true);
    try {
      let ret: any = await api.account.getAccountFromEmail(email);
      setIsRequesting(true);
      if (ret.status == "Success") {
        setWalletAddress(ret.payload.Success.wallet_address);
      }
      return ret.payload.Success;
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setIsRequesting(false);
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      setIsRequesting(true);
      let ret: any = await api.account.verify_email({ email });
      return ret.payload.Success;
    } catch (e) {
      console.log("error ", e);
    } finally {
      setIsRequesting(false);
    }
  };

  const createWalletByEmail = async (email: string, code: string) => {
    try {
      setIsRequesting(true);
      let ret: any = await api.account.create({ email, code });
      setWalletAddress(ret.payload.Success.contract_wallet_addr);
      setWalletType("eoa");
      return ret.payload.Success;
    } catch (e) {
      console.log("error ", e);
    } finally {
      setIsRequesting(false);
    }
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
        isRequesting,
        getWalletAddressByEmail,
        createWalletByEmail,
        getEthBalance,
        verifyEmail,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextConsumer = WalletContext.Consumer;
