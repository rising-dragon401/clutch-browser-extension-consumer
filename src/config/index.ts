import localConf from "./local";
import prodConf from "./prod";
import mumbaiConf from "./mumbai";
import ethIcon from "../assets/tokens/eth.svg";

export const assetsList = [
  {
    symbol: "ETH",
    icon: ethIcon,
  },
];

export default {
  walletName: "Clutch Wallet",
  coinGeckoURL: "https://api.coingecko.com/api/v3",
  // ...localConf,
  // ...prodConf,
  ...mumbaiConf
};
