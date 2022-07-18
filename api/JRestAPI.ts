import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import AppAPI from "./AppAPI";
import { OfferInfo } from "../model/Offer";

/**
 * API implementation that use the Rest Protocol and the plugin jrest
 * to communicate with the APP.
 *
 * TODO: feel the method call with all the API that are inside the pages module
 * and feel use this class to call the method inside the pages modules.
 */
export default class JRestAPI implements AppAPI {
  getInfo(): Promise<GetInfoNode> {
    throw new Error("Method not implemented.");
  }
  listFunds(): Promise<ListFunds> {
    throw new Error("Method not implemented.");
  }
  getMetricOne(
    network: string,
    nodeId: string
  ): Promise<MetricsOne | undefined> {
    throw new Error("Method not implemented.");
  }
  getOfferInfo(): Promise<OfferInfo> {
    throw new Error("Method not implemented.");
  }
  listOffers(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  connect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
