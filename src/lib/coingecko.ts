import axios from "axios";
import config from "../config";

const axio = axios.create({
    baseURL: config.coinGeckoURL,
  });

const coingecko = {
    getPrice: (srcCoinId: string, destCoinId: string) => axio.get(`/simple/price?ids=${srcCoinId}&vs_currencies=${destCoinId}`),
  };
  
  export default {
    coingecko,
  };