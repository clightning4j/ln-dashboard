/**
 * Definition of the interface for the API client that will describe all the method
 * that a client need to be included inside this API.
 *
 * author: https://github.com/vincenzopalazzo
 */

import {
  GetInfoNode,
  ListFunds,
  ListNodes,
  ListOffers,
  OfferDecode,
} from "../model/CoreLN";
import { MetricsOneOutput } from "../model/Metrics";
import { OfferInfo } from "../model/Offer";

export default interface AppAPI {
  /**
   * Get all the information about the node by running the getinfo command.
   */
  getInfo(): Promise<GetInfoNode>;

  /**
   * Get all the information about the node by running the listfunds command.
   */
  listFunds(): Promise<ListFunds>;

  /**
   * Get all the information about the metrics of the node if exist otherwise undefined
   */
  getMetricsOneOutput(
    network: string,
    nodeId: string
  ): Promise<MetricsOneOutput | undefined>;

  /**
   * Get info if the node is up or down
   */
  ping(node_id: string): Promise<boolean>;

  getOfferInfo(): Promise<OfferInfo>;

  /**
   * Get list of offers
   */
  listOffers(withInfo: boolean): Promise<ListOffers>;

  listNodes(node_id: string | null): Promise<ListNodes>;

  decode(invoice: string): Promise<OfferDecode>;

  connect(): Promise<void>;

  close(): Promise<void>;
}
