/**
 * Definition of the interface for the API client that will describe all the method
 * that a client need to be included inside this API.
 *
 * author: https://github.com/vincenzopalazzo
 */

import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";

export default interface AppAPI {
  /**
   * Get all the information about the node by running the getinfo command.
   */
  getInfo(): Promise<GetInfoNode>

  /**
   * Get all the information about the node by running the listfunds command.
   */
  listFunds(): Promise<ListFunds>;

  /**
   * Get all the information about the metrics of the node if exist otherwise undefined
   */
  getMetricOne(network: string, nodeId: string): Promise<MetricsOne | undefined>;

  /**
   * Get list of offers
   */
  listOffers(): Promise<Array<any>>;
}
