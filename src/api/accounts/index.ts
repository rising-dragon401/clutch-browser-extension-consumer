import axios from "axios";
import { SERVER_BASE_URL } from "../constant";

export async function createWallet(email: string): Promise<any> {
  let ret = await axios.post(
    SERVER_BASE_URL + "accounts",
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("ret", ret);
  return ret;
}
