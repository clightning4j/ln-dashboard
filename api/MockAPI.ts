import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import AppAPI from "./AppAPI";

/**
 * Mock API implementation
 */
class MockAPI implements AppAPI {
  listOffers(): Promise<any[]> {
    return Promise.resolve([]);
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

  listFunds(): Promise<ListFunds> {
    return Promise.resolve({
      outputs: [],
      channels: [],
    });
  }

  getMetricOne(
    network: string,
    nodeId: string
  ): Promise<MetricsOne | undefined> {
    throw new Error("Method not implemented.");
  }
}
