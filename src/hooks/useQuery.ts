import useWalletContext from "@src/context/hooks/useWalletContext";
import config from "@src/config";
import { ethers } from "ethers";

export default function useQuery() {
  const { ethProvider, chainId } = useWalletContext();

  const getGasPrice = async () => {
    // if it's in the fixed price list, set fixed
    if (chainId === 421613 || chainId === 42161) {
      return {
        maxFeePerGas: `0x${ethers
          .parseUnits(config.defaultMaxFee, "gwei")
          .toString(16)}`,
        maxPriorityFeePerGas: `0x${ethers
          .parseUnits(config.defaultMaxPriorityFee, "gwei")
          .toString(16)}`,
      };
    }

    const feeData = await ethProvider.getFeeData();
    if (config.support1559) {
      return {
        maxFeePerGas: `0x${feeData.maxFeePerGas?.toString(16)}`,
        maxPriorityFeePerGas: `0x${feeData.maxPriorityFeePerGas?.toString(16)}`,
      };
    } else {
      return {
        maxFeePerGas: `0x${feeData.gasPrice?.toString(16)}`,
        maxPriorityFeePerGas: `0x${feeData.gasPrice?.toString(16)}`,
      };
    }
  };
}
