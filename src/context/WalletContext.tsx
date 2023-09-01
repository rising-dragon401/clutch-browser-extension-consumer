import React, { createContext, useState, useEffect, createRef } from "react";
import { ethers } from "ethers";
import config from "../config";
import api from "../lib/api";
import coingecko from "@src/lib/coingecko";
import ERC20Token from "@src/abi/ERC20.json";

const ethProvider = new ethers.JsonRpcProvider(config.rpcProvider);
interface IWalletContext {
  ethProvider: ethers.JsonRpcProvider;
  chainId: number;
  account: string;
  walletType: string;
  walletAddress: string;
  ethBalance: string;
  ethPrice: string;
  isRequesting: boolean;
  usdcBalance: string;
  getWalletAddressByEmail: (email: string) => Promise<any>;
  getEthBalance: (addr: string) => Promise<string>;
  createWalletByEmail: (email: string, code: string, payTokens: string[]) => Promise<any>;
  verifyEmail: (email: string) => Promise<any>;
  getPrice: (coinId: string) => Promise<any>;
}

export const WalletContext = createContext<IWalletContext>({
  ethProvider,
  chainId: 0,
  account: "",
  walletAddress: "",
  walletType: "",
  ethBalance: "",
  ethPrice: "",
  isRequesting: false,
  usdcBalance:"",
  getWalletAddressByEmail: async (email: string) => {
    return "";
  },
  getEthBalance: async (addr: string) => {
    return "";
  },
  createWalletByEmail: async (email: string, code: string, payTokens: string[]) => {
    return "";
  },
  verifyEmail: async (email: string) => {
    return "";
  },
  getPrice: async (coinId: string) => {
    return "";
  },
});

export const WalletContextProvider = ({ children }: any) => {
  const [chainNum, setChainId] = useState<number>(0);
  const [account, setAccount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletType, setWalletType] = useState<string>("");
  const [ethBalance, setEthBalance] = useState<string>("0.0");
  const [ethPrice, setEthPrice] = useState<string>("1903.55");
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [usdcBalance, setUSDCBalance] = useState<string>("0.0");
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

  const getUSDCBalance = async (addr: string = "") => {
    if (addr == "" && walletAddress == "") return;
    let address = addr;
    if (address == "") {
      address = walletAddress;
    }

    try {
      const usdcContract = new ethers.Contract(
        "0x145eadd18a6adea9857804369732bc57f2b57820",
        ERC20Token,
        ethProvider
      );
      const usdcAmount = await usdcContract.balanceOf(walletAddress);
      setUSDCBalance(ethers.formatUnits(usdcAmount, 6));
      return ethers.formatUnits(usdcAmount, 6);
    } catch (e) {
      console.log("error: ", e);
    } finally {
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

  const createWalletByEmail = async (email: string, code: string, payTokens: string[]) => {
    try {
      setIsRequesting(true);      
      let ret: any = await api.account.create({ email, code, paymaster_tokens: payTokens });
      if (ret.status == "success") {
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
    try {
      let ret = await coingecko.coingecko.getPrice(coinId, "usd");      
      setEthPrice(ret.data["matic-network"].usd);
    } catch (e) {
      setEthPrice("0.0");
    } finally {
    }
  };

  useEffect(() => {
    const interval = setInterval(
      (function getInfoInterval(): any {        
        getEthBalance();
        getUSDCBalance();
        // getPrice("matic-network");        
        return getInfoInterval;
      })(),
      10000
    );

      (async function getBlockchainInfo(): Promise<any> {
        const {chainId} = await ethProvider.getNetwork();
        // const feeData = await ethProvider.getFeeData();
        // console.log("fee Data =========== ", feeData);
        setChainId(Number(chainId));
      })();
    return () => clearInterval(interval);
  }, [walletAddress]);
  return (
    <WalletContext.Provider
      value={{
        ethProvider,
        chainId: chainNum,
        account,
        walletType,
        walletAddress,
        ethBalance,
        ethPrice,
        isRequesting,
        usdcBalance,
        getWalletAddressByEmail,
        createWalletByEmail,
        getEthBalance,
        verifyEmail,
        getPrice,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const WalletContextConsumer = WalletContext.Consumer;
