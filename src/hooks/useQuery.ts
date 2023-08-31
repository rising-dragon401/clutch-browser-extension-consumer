import React from "react";
import useWalletContext from "@src/context/hooks/useWalletContext";
import config from "@src/config";
import api from "@src/lib/api";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

export default function useQuery() {
  const { ethProvider } = useWalletContext();

  const getGasPrice = async () => {
    const { chainId } = await ethProvider.getNetwork();
    // if it's in the fixed price list, set fixed
    if (Number(chainId) === 421613 || Number(chainId) === 42161) {
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
    ethPrice: string,
    payToken: string,
  ) => {
    let prefund: any = null;
    if(payToken == ethers.ZeroAddress) {
      prefund = await api.transaction.prefund({
        value,
        to,
        from,
        send_type: "send_eth",
      });
    } else {
      prefund = await api.transaction.prefund({
        value,
        to,
        from,
        send_type: "send_erc20",
        pay_token:payToken
      });
    }

    const requiredEth = BigNumber(
      prefund.payload.Success.missfund
    ).shiftedBy(-18);
    
    if (payToken == ethers.ZeroAddress) {
      return {
        requiredAmount: requiredEth.toPrecision(5),
        requiredAsUSD: requiredEth.multipliedBy(ethPrice).toFixed()
      };
    } else {
      // erc20
      let required = requiredEth
      .multipliedBy(ethPrice)
      .times(config.maxCostMultiplier)
      .div(100);
      return {
        requiredAmount: required.toPrecision(5),
        requiredAsUSD: required.toFixed()
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
