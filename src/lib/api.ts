import axios from "axios";
import config from "../config";
import KeyStore from "./keystore";
import { toast } from "material-react-toastify";

const keyStore = KeyStore.getInstance();

const axio = axios.create({
  baseURL: config.serverURL,
});

axio.interceptors.request.use(async (config: any) => {
  config.headers.authorization = `bearer ${await keyStore.getJWT()}`;
  return config;
});

axio.interceptors.response.use((res: any) => {
  if (res.data.code !== 200) {
    toast.error(res.data.msg);
  }
  return res.data;
});

const account = {
  create: (params: any) => axio.post("/accounts", params),
};

export default {
  account,
};
