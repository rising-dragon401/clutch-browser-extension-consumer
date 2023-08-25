import useWalletContext from "@src/context/hooks/useWalletContext";
import config from "@src/config";
import api from "@src/lib/api";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

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

  const getPrefund = async (
    value: string,
    to: string,
    from: string,
    sendType: string
  ) => {
    const preFund = await api.transaction.prefund({
      value,
      to,
      from,
      send_type: sendType,
    });

    const requiredEth = BigNumber(
      preFund.data.payload.Success.missfund
    ).shiftedBy(-18);

    if (sendType === "send_eth") {
      return {
        requiredAmount: requiredEth.toFixed(),
      };
    } else {
      // erc20
      const erc20Price = 1853;
      return {
        requiredAmount: requiredEth
          .times(erc20Price)
          .times(config.maxCostMultiplier)
          .div(100)
          .toFixed(),
      };
    }
  };

  const getFeeCost = async (userOp: any, payToken: string) => {
    // set 1559 fee
    // const { maxFeePerGas, maxPriorityFeePerGas } = await getGasPrice();
    // userOp.maxFeePerGas = maxFeePerGas;
    // userOp.maxPriorityFeePerGas = maxPriorityFeePerGas;
    // if (payToken && payToken !== ethers.ZeroAddress) {
    //   userOp.paymasterAndData = addPaymasterAndData(
    //     payToken,
    //     chainConfig.contracts.paymaster
    //   );
    // }
    // // get gas limit
    // const gasLimit = await soulWallet.estimateUserOperationGas(userOp);
    // if (gasLimit.isErr()) {
    //   throw new Error(gasLimit.ERR.message);
    // }
    // return {
    //   userOp,
    //   maxFeePerGas,
    //   maxPriorityFeePerGas,
    // };
  };

  return {
    getGasPrice,
    getFeeCost,
    getPrefund,
  };
}
