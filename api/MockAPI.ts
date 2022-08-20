import {
  GetInfoNode,
  ListFunds,
  ListNodes,
  ListOffers,
  OfferDecode,
} from "../model/CoreLN";
import { MetricsOneOutput } from "../model/Metrics";
import { OfferInfo } from "../model/Offer";
import AppAPI from "./AppAPI";
import { singleton } from "tsyringe";

/**
 * Mock API implementation
 */
@singleton()
export default class MockAPI implements AppAPI {
  ping(node_id: string): Promise<boolean> {
    return Promise.resolve(false);
  }
  decode(invoice: string): Promise<OfferDecode> {
    throw new Error("Method not implemented.");
  }
  listNodes(): Promise<ListNodes> {
    return Promise.resolve({ nodes: [] });
  }
  listOffers(withInfo: boolean = false): Promise<ListOffers> {
    return Promise.resolve({ offers: [] });
  }
  connect(): Promise<void> {
    return Promise.resolve();
  }

  close(): Promise<void> {
    return Promise.resolve();
  }

  getInfo(): Promise<GetInfoNode> {
    return Promise.resolve({
      id: "",
      alias: "String",
      color: "",
      num_peers: 0,
      num_pending_channels: 0,
      num_active_channels: 0,
      num_inactive_channels: 0,
      address: [
        {
          address: "127.0.0.1",
          port: 9888,
          type: "fake",
        },
      ],
      binding: [],
      version: "fake",
      blockheight: 0,
      network: "fake",
      msatoshi_fees_collected: 0,
      fees_collected_msat: "",
      lightning_dir: "",
    });
  }

  getOfferInfo(): Promise<OfferInfo> {
    return Promise.resolve({
      offer_id:
        "28522b52ac39fa518ce3a5b3e4a9a96372487e78ba5eb1540ec4d9f02ca82718",
      active: true,
      single_use: false,
      bolt12:
        "lno1pg257enxv4ezqcneype82um50ynhxgrwdajx283qfwdpl28qqmc78ymlvhmxcsywdk5wrjnj36jryg488qwlrnzyjczlqs85ck65ycmkdk92smwt9zuewdzfe7v4aavvaz5kgv9mkk63v3s0ge0f099kssh3yc95qztx504hu92hnx8ctzhtt08pgk0texz0509tk",
      bolt12_unsingned:
        "lno1pg257enxv4ezqcneype82um50ynhxgrwdajx283qfwdpl28qqmc78ymlvhmxcsywdk5wrjnj36jryg488qwlrnzyjczs ",
      used: false,
      created: false,
    });
  }

  listFunds(): Promise<ListFunds> {
    return Promise.resolve({
      outputs: [],
      channels: [],
    });
  }

  getMetricsOneOutput(
    network: string,
    nodeId: string
  ): Promise<MetricsOneOutput | undefined> {
    throw new Error("Method not implemented.");
  }
}
