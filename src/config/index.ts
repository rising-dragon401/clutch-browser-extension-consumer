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
    contractAddress: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
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
