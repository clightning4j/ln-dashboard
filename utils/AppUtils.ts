import axios from "axios";
import { Datum } from "@nivo/line";
import { CalendarDatum } from "@nivo/calendar/dist/types/types";
import APIProvider from "../api/APIProvider";

export class LineChartItem implements Datum {
  [key: string]: any;

  public x: string;
  public y: number;

  constructor(key: string, val: number) {
    this.x = key;
    this.y = val;
  }
}

export class CalendarChartItem implements CalendarDatum {
  day: string;
  value: number;

  constructor(day: string, value: number) {
    this.day = day;
    this.value = value;
  }
}

/**
 * TODO docs it
 * @param url
 */
export const fetcher = (url: string) =>
  fetch(url).then((res: Response) => res.json());

/**
 * TODO docs it
 */

export function intoSatoshi(priceBitcoin: number, satoshi: number): number {
  let toBtc = satoshi / 100_000_000;
  let withPrice = priceBitcoin * toBtc;
  return Math.round((withPrice + Number.EPSILON) * 100) / 100;
}

/**
 * TODO: docs it
 * @param nodeId
 * @param show
 */
export const pingNode = async (
  nodeId: string,
  show: (visible: boolean, message: string) => void
) => {
  const response = await APIProvider.api().ping(nodeId);
  if (response) {
    show(true, "The node is up");
  } else {
    show(true, `The node is down`);
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
 * @param satoshi
 * @param show
 */
export const getPrices = async (
  ticker: string = "BTC-USD",
  show: (visible: boolean, message: string) => void
) => {
  try {
    return (await axios(`/api/prices/${ticker}`)).data;
  } catch (e) {
    show(true, `Error with message: ${e}`);
    console.error(e);
  }
};
