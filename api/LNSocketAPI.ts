import AppAPI from "./AppAPI";
import {
  GetInfoNode,
  ListFunds,
  ListNodes,
  ListOffers,
  OfferDecode,
} from "../model/CoreLN";
import axios from "axios";
import { OfferInfo } from "../model/Offer";
import { inject, singleton } from "tsyringe";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  DefaultOptions,
} from "@apollo/client";

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
  private ApolloClient: any;
  private gqlClient: any;

  constructor(
    @inject("lambda") lambda: string,
    @inject("nodeID") nodeId: string,
    @inject("address") adderss: string,
    @inject("rune") rune: string,
    @inject("lnmetrics_url") url: string
  ) {
    const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    };

    this.nodeID = nodeId;
    this.address = adderss;
    this.rune = rune;
    this.lambda = lambda;
    this.gqlClient = new ApolloClient({
      uri: url,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
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
    if (method == "ping") {
      return result;
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
    // console.log(JSON.stringify(offers));
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

  async ping(node_id: string): Promise<boolean> {
    try {
      let response: any = await this.call("ping", { id: node_id });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getMetricsOneOutput(
    network: string,
    nodeId: string
  ): Promise<any | undefined> {
    return this.gqlClient
      .query({
        query: gql`
      query {
        getMetricOneResult(network: "${network}",
        node_id: "${nodeId}") {
            version
            age
            last_update
            up_time {
              one_day
              ten_days
              thirty_days
              six_months
            }
          forwards_rating {
              one_day {
              success
              failure
              internal_failure
            }
              ten_days {
              success
              failure
              internal_failure
            }
              thirty_days{
              success
              failure
              internal_failure
            }
              six_months {
              success
              failure
              internal_failure
            }
          }
        channels_info {
          age
          channel_id
          alias
          direction
          fee {
            base
            per_msat
          }
          capacity
                  up_time {
              one_day
              ten_days
              thirty_days
              six_months
            }
          forwards_rating {
              one_day {
              success
              failure
              internal_failure
            }
              ten_days {
              success
              failure
              internal_failure
            }
              thirty_days{
              success
              failure
              internal_failure
            }
              six_months {
              success
              failure
              internal_failure
            }
          }
        }
        }
      }
      `,
      })
      .then((result: any) => {
        console.log(result.data.getMetricOneResult);
        return result.data.getMetricOneResult;
      });
  }
}
