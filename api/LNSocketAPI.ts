import AppAPI from "./AppAPI";
import {
  GetInfoNode,
  ListFunds,
  ListNodes,
  ListOffers,
  OfferDecode,
} from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import axios from "axios";
import { OfferInfo } from "../model/Offer";
import { inject, singleton } from "tsyringe";

/**
 * Experimental feature.
 *
 * Implementing the API with the LNSocketAPI to use a native connection to call directly
 * the node API without use of any additional services.
 */
@singleton()
export default class LNSocketAPI implements AppAPI {
  private address: string;
  private nodeID: string;
  private rune: string;
  private lambda: string;

  constructor(
    @inject("lambda") lambda: string,
    @inject("nodeID") nodeId: string,
    @inject("address") adderss: string,
    @inject("rune") rune: string
  ) {
    this.nodeID = nodeId;
    this.address = adderss;
    this.rune = rune;
    this.lambda = lambda;
  }

  async ping(node_id: string): Promise<boolean> {
    return await this.call("ping", { id: node_id });
  }

  async decode(invoice: string): Promise<OfferDecode> {
    return await this.call("decode", { string: invoice });
  }

  private async call<ReturnType>(
    method: string,
    params: object
  ): Promise<ReturnType> {
    console.log(`Running request ${method}`);
    let lambdaRequest = {
      method: method,
      params: params,
      node_id: this.nodeID,
      host: this.address,
      rune: this.rune,
    };
    let result = (
      await axios.post(`${this.lambda}/lnsocket`, lambdaRequest, {
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
    ).data;
    if (result["errors"] != undefined) {
      throw new Error(result["errors"]);
    }
    return result["result"];
  }

  async listNodes(node_id: string | null): Promise<ListNodes> {
    return await this.call("listnodes", { id: node_id });
  }

  async close(): Promise<void> {}

  async listOffers(withInfo: boolean = false): Promise<ListOffers> {
    let offers = await this.call<ListOffers>("listoffers", {});
    if (withInfo) {
      for await (const offer of offers.offers) {
        offer.info = await this.decode(offer.bolt12);
      }
    }
    console.log(JSON.stringify(offers));
    return offers;
  }

  async getOfferInfo(): Promise<OfferInfo> {
    return await this.call("getofferinfo", {});
  }

  async connect(): Promise<void> {}

  async getInfo(): Promise<GetInfoNode> {
    return await this.call<GetInfoNode>("getinfo", {});
  }

  async listFunds(): Promise<ListFunds> {
    return await this.call("listfunds", {});
  }

  async getMetricOne(
    network: string,
    nodeId: string
  ): Promise<MetricsOne | undefined> {
    throw new Error("Method not implemented.");
  }
}
