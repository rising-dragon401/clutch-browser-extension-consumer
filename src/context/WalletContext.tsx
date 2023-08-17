import React, { createContext, useState, useEffect, createRef } from "react";
import { ethers } from "ethers";
import config from "../config";
import api from "../lib/api";
import coingecko from "@src/lib/coingecko";

const ethProvider = new ethers.JsonRpcProvider(config.rpcProvider);
interface IWalletContext {
  ethProvider: ethers.JsonRpcProvider;
  account: string;
  walletType: string;
  walletAddress: string;
  ethBalance: string;
  ethPrice: string;
  isRequesting: boolean;
  getWalletAddressByEmail: (email: string) => Promise<any>;
  getEthBalance: (addr: string) => Promise<string>;
  createWalletByEmail: (email: string, code: string) => Promise<any>;
  verifyEmail: (email: string) => Promise<any>;
  getPrice: (coinId: string) => Promise<any>;
}

export const WalletContext = createContext<IWalletContext>({
  ethProvider,
  account: "",
  walletAddress: "",
  walletType: "",
  ethBalance: "",
  ethPrice:"",
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
  getPrice: async(coinId: string) => {
    return "";
  }
});

export const WalletContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("0.0");
  const [ethPrice, setEthPrice] = useState<string>("0.0");
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
      if(ret.status == "success") {
        setWalletAddress(ret.payload.Success.contract_wallet_addr);
        setWalletType("eoa");
        return ret;
      } else {
        return ret;
      }
    } catch (e) {
      console.log("error ", e);      
    } finally {
      setIsRequesting(false);
    }
  };

  const getPrice = async (coinId: string) => {
    try{
      let ret = await coingecko.coingecko.getPrice(coinId, "usd");
      console.log("get price == ", ret.data["matic-network"].usd);
      setEthPrice(ret.data["matic-network"].usd);
    }catch (e) {
      setEthPrice("0.0");
    }finally {

    }    
  }

  useEffect(() => {
    const interval = setInterval(
      (function getInfoInterval(): any {
        console.log("get info called");
        getEthBalance();
        getPrice("matic-network");
        return getInfoInterval;
      })(),
      10000
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
        ethPrice,
        isRequesting,
        getWalletAddressByEmail,
        createWalletByEmail,
        getEthBalance,
        verifyEmail,
        getPrice
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextConsumer = WalletContext.Consumer;
