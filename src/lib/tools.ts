import { nanoid } from "nanoid";
import browser from "webextension-polyfill";

export function notify(title: string, message: string) {
  const notifyId = Math.ceil(Math.random() * 1000).toString();

  browser.notifications.create(notifyId, {
    type: "basic",
    iconUrl: "../icon-48.png",
    title,
    message,
  });
}

export function copyText(value: string) {
  const copied = document.createElement("input");
  copied.setAttribute("value", value);
  document.body.appendChild(copied);
  copied.select();
  document.execCommand("copy");
  document.body.removeChild(copied);
}

/**
 * get local storage
 * @param key
 * @returns
 */
export async function getLocalStorage(key: string): Promise<any> {
  return new Promise((resolve, _) => {
    chrome.storage.local.get(key, function (result) {
      resolve(result[key]);
    });
  });
}

/**
 * set local storage
 * @param key
 * @param value
 * @returns
 */
export async function setLocalStorage(key: string, value: any) {
  return new Promise((resolve, _) => {
    chrome.storage.local.set({ [key]: value }, function () {
      resolve(true);
    });
  });
}

/**
 * remove local storage
 */

export async function removeLocalStorage(key: string) {
  return new Promise((resolve, _) => {
    chrome.storage.local.remove(key, function () {
      resolve(true);
    });
  });
}

/**
 * clear local storage
 */

export async function clearLocalStorage() {
  return new Promise((resolve, _) => {
    chrome.storage.local.clear(function () {
      resolve(true);
    });
  });
}

/**
 * get session storage
 * @param key
 * @returns
 */
export async function getSessionStorage(key: string): Promise<string> {
  // @ts-ignore
  return (await chrome.storage.session.get(key))[key];
}

/**
 * set session storage
 * @param key
 * @param value
 * @returns
 */
export async function setSessionStorage(
  key: string,
  value: any
): Promise<void> {
  // @ts-ignore
  return await chrome.storage.session.set({ [key]: value });
}

/**
 * remove session storage
 */

export async function removeSessionStorage(key: string): Promise<void> {
  // @ts-ignore
  return await chrome.storage.session.remove(key);
}

export async function getGuardianName(address: string): Promise<void> {
  let guardianNameMapping =
    (await getLocalStorage("guardianNameMapping")) || {};

  return guardianNameMapping[address];
}

export async function setGuardianName(
  address: string,
  name: string
): Promise<void> {
  let guardianNameMapping =
    (await getLocalStorage("guardianNameMapping")) || {};
  guardianNameMapping[address] = name;
  await setLocalStorage("guardianNameMapping", guardianNameMapping);
}

export const validateEmail = (email?: string) => {
  if (!email) return false;
  const emialRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emialRegex.test(String(email).toLowerCase());
};

export const getMessageType = (msg: string) => {
  if (msg.startsWith("0x") && msg.length === 66) {
      return "hash";
  } else {
      return "text";
  }
};

export const nextRandomId = () => {
  return nanoid();
};

export const formatIPFS = (url: string) => {
  if (url && url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  } else {
      return url;
  }
};