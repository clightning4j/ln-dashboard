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
    this.client = LNSocket();
    this.client.genkey();
    this.nodeID = nodeId;
    this.address = adderss;
    this.rune = rune;
  }

  async connect(runes: string) {
    await this.client.connect_and_init(this.nodeID, this.address);
  }

  getInfo(): GetInfoNode {
    throw new Error("Method not implemented.");
  }
  listFunds(): ListFunds {
    throw new Error("Method not implemented.");
  }
  getMetricOne(network: string, nodeId: string): MetricsOne | undefined {
    throw new Error("Method not implemented.");
  }
}
