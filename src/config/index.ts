import localConf from "./local";
import prodConf from "./prod";
import mumbaiConf from "./mumbai";
import ethIcon from "../assets/tokens/eth.svg";
import { ethers } from "ethers";

export interface ITokenBalanceItem  {
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
  logoURI?: string;
}

export const assetsList: ITokenBalanceItem[] = [
  {
    contractAddress: ethers.ZeroAddress,
    decimals: 18,
    name: "MATIC",
    symbol: "MATIC",
  },
  {
    contractAddress: "0x145eadd18a6adea9857804369732bc57f2b57820",
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
  },
];

export default {
  walletName: "Clutch Wallet",
  coinGeckoURL: "https://api.coingecko.com/api/v3",
  // ...localConf,
  // ...prodConf,
  ...mumbaiConf
};
