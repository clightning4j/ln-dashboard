import {
  GetInfoNode,
  ListFunds,
  ListNodes,
  ListOffers,
  OfferDecode,
} from "../model/CoreLN";
import { MetricsOneOutput } from "../model/Metrics";
import AppAPI from "./AppAPI";
import { OfferInfo } from "../model/Offer";
import { singleton, inject } from "tsyringe";
import axios from "axios";
/**
 * API implementation that use the Rest Protocol and the plugin jrest
 * to communicate with the APP.
 *
 * TODO: feel the method call with all the API that are inside the pages module
 * and feel use this class to call the method inside the pages modules.
 */
@singleton()
export default class JRestAPI implements AppAPI {
  private url: string;

  constructor(@inject("url") url: string) {
    this.url = url;
  }
  async ping(node_id: string): Promise<boolean> {
    try {
      const _ = await axios(`/api/pingNode/${node_id}`);
      return Promise.resolve(true);
    } catch (e) {
      console.error(e);
      return Promise.resolve(false);
    }
  }
  decode(invoice: string): Promise<OfferDecode> {
    throw new Error("Method not implemented.");
  }

  async listNodes(node_id: string | null): Promise<ListNodes> {
    let nodes = (
      await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/network/listnodes`)
    ).data;
    return nodes;
  }

  getInfo(): Promise<GetInfoNode> {
    throw new Error("Method not implemented.");
  }
  listFunds(): Promise<ListFunds> {
    throw new Error("Method not implemented.");
  }
  getMetricsOneOutput(
    network: string,
    nodeId: string
  ): Promise<MetricsOneOutput | undefined> {
    throw new Error("Method not implemented.");
  }
  getOfferInfo(): Promise<OfferInfo> {
    throw new Error("Method not implemented.");
  }
  listOffers(withInfo: boolean = false): Promise<ListOffers> {
    throw new Error("Method not implemented.");
  }
  connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
