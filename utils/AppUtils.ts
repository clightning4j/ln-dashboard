import axios from "axios";

/**
 * TODO docs it
 * @param url
 */
export const fetcher = (url: string) =>
  fetch(url).then((res: Response) => res.json());

/**
 * TODO docs it
 * @param bitcoin price
 * @param sats
 */

export function intoSatoshi(priceBitcoin: number, satoshi: number): number {
  let toBtc = satoshi / 100_000_000;
  let withPrice = priceBitcoin * toBtc;
  return Math.round((withPrice + Number.EPSILON) * 100) / 100;
}

/**
 * TODO: docs it
 * @param nodeId
 */
export const pingNode = async (nodeId: string) => {
  try {
    return (await axios(`/api/pingNode/${nodeId}`)).data.result;
  } catch (e) {
    console.error(e);
  }
};

/**
 * TODO: docs it
 * @param amount_msat
 */
export function check_amount_msat(param: any): string {
  // if it is a number we return the value by appending sats
  if (typeof param == "number") {
    return `${param.valueOf() / 1000} sats`;
  } else {
    if (!(typeof param == "string" && param.indexOf("msat") > -1)) {
      return `${param / 1000} sats`;
    }
    return `${parseInt(param) / 1000} sats`;
  }
}

/**
 * TODO: docs it
 * @param amount_msat
 */
export function convert(param: any): number {
  if (param instanceof Number) {
    let num: number = param.valueOf() / 1000;
    return num as number;
  }
  return parseInt(param) / 1000;
}

/**
 * TODO: docs it
 * @param ticker
 */
export const getPrices = async (ticker: string = "BTC-USD") => {
  try {
    return (await axios(`/api/prices/${ticker}`)).data;
  } catch (e) {
    console.error(e);
  }
};
