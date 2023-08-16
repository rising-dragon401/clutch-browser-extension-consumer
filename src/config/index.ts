import envConf from "./local";
import ethIcon from "../assets/tokens/eth.svg";

export const assetsList = [
  {
    symbol: "ETH",
    icon: ethIcon,
  },
];

export default {
  walletName: "Clutch Wallet",
  ...envConf,
};
