import ethIcon from "../assets/tokens/eth.svg";

export default {
  serverURL: "http://localhost:5000",
  rpcProvider: "http://localhost:8545",
  paymasterTokens: [
    // "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747", //USDC
    // "0x3813e82e6f7098b9583FC0F33a962D02018B6803", //USDT
    "0x145eadd18a6adea9857804369732bc57f2b57820", //TestUSDC
  ],
  support1559: true,
  defaultMaxFee: "1700000000",
  defaultMaxPriorityFee: "1500000000",
  maxCostMultiplier: 271,
};