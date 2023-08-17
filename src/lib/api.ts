import axios from "axios";
import config from "../config";
import KeyStore from "./keystore";
// import { toast } from "material-react-toastify";

const keyStore = KeyStore.getInstance();

const axio = axios.create({
  baseURL: config.serverURL,
});

axio.interceptors.request.use(async (config: any) => {
  config.headers.authorization = `bearer ${await keyStore.getJWT()}`;
  return config;
});

axio.interceptors.response.use((res: any): any => {
  console.log("res", res);
  if (res.status !== 200) {
    console.error(res.statusText);
    alert(res.statusText);
  }
  return res.data;
});

const account = {
  create: (params: any) => axio.post("/accounts", params),
  verify_email: (params: any) => axio.post("/email/verify", params),
  getAccountFromEmail: (email: string) => axio.get(`/accounts/${email}`),
};

const transaction = {
  sendETH: (params: any) => axio.post("/transaction", params),
};
export default {
  account,
  transaction
};
