/**
 * Definition of the interface for the API client that will describe all the method
 * that a client need to be included inside this API.
 *
 * author: https://github.com/vincenzopalazzo
 */

import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import { OfferInfo } from "../model/Offer";
import { ListOffers } from "../model/ListOffers";

export default interface AppAPI {
  /**
   * Get all the information about the node by running the getinfo command.
   */
  getInfo(): GetInfoNode;

  /**
   * Get all the information about the node by running the listfunds command.
   */
  listFunds(): ListFunds;

  /**
   * Get all the information about the offer by running the offer command.
   */
  listOffers(): ListOffers;

  /**
   * Get all the information about the offer by running the offer command.
   */
  getOfferInfo(): OfferInfo;

  /**
   * Get all the information about the metrics of the node if exist otherwise undefined
   */
  getMetricOne(network: string, nodeId: string): MetricsOne | undefined;
}
