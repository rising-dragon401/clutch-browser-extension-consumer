import axios from "axios";
import { SERVER_BASE_URL } from "../constant";

export async function createWallet(email: string): Promise<string | null> {
  try {
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
    if (ret.status == 200) {
      console.log(ret.data.payload, "===================");
      return ret.data.payload.Success.jwt;
    } else {
      return null;
    }
  } catch (e: any) {
    console.log("err", e);
  }
  return null;
}
