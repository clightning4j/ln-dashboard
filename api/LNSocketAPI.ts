import AppAPI from "./AppAPI";
import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
// @ts-ignore
import LNSocket from "lnsocket";

/**
 * Experimental feature.
 *
 * Implementing the API with the LNSocketAPI to use a native connection to call directly
 * the node API without use of any additional services.
 */
export default class LNSocketAPI implements AppAPI {
  private client: LNSocket;
  private address: string;
  private nodeID: string;
  private rune: string;

  constructor(nodeId: string, adderss: string, rune: string) {
    this.nodeID = nodeId;
    this.address = adderss;
    this.rune = rune;
  }

  async listOffers(): Promise<any[]> {
    return await this.client.rpc({ method: "listoffers", rune: this.rune })
    }

  async connect() {
    this.client = await LNSocket();
    this.client.genkey()
    await this.client.connect_and_init(this.nodeID, this.address);
  }

  async getInfo(): Promise<GetInfoNode> {
    return  await this.client.rpc({ method: "getinfo", rune: this.rune })
  }

  async listFunds(): Promise<ListFunds> {
    return await this.client.rpc({ method: "listfunds", rune: this.rune })
  }

  async  getMetricOne(network: string, nodeId: string): Promise<MetricsOne | undefined> {
    throw new Error("Method not implemented.");
  }
}
