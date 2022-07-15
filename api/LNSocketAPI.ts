import AppAPI from "./AppAPI";
import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import axios from "axios";

/**
 * Experimental feature.
 *
 * Implementing the API with the LNSocketAPI to use a native connection to call directly
 * the node API without use of any additional services.
 */
export default class LNSocketAPI implements AppAPI {
  private address: string;
  private nodeID: string;
  private rune: string;
  private lambda: string;

  constructor(lambda: string, nodeId: string, adderss: string, rune: string) {
    this.nodeID = nodeId;
    this.address = adderss;
    this.rune = rune;
    this.lambda = lambda;
  }

  private async call<ReturnType>(
    method: string,
    params: object
  ): Promise<ReturnType> {
    console.log("Running request");
    let lambdaRequest = {
      method: method,
      params: params,
      node_id: this.nodeID,
      host: this.address,
      rune: this.rune,
    };
    return (
      await axios.post(`${this.lambda}/lnsocket`, lambdaRequest, {
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
    ).data["result"];
  }

  async close(): Promise<void> {}

  async listOffers(): Promise<any[]> {
    return await this.call("listoffers", {});
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
