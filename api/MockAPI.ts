import { GetInfoNode, ListFunds } from "../model/CoreLN";
import { MetricsOne } from "../model/Metrics";
import { Offer } from "../model/Offer";
import AppAPI from "./AppAPI";

/**
 * Mock API implementation
 */
class MockAPI implements AppAPI {
  getInfo(): GetInfoNode {
    return {
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
    };
  }

  listFunds(): ListFunds {
    return {
      outputs: [],
      channels: [],
    };
  }

  offer(): Offer {
    return {
      changes: {},
      decoded: {
        amount_msat: "100msat",
        created_at: 1656566837,
        description: "Offer by rusty's node",
        features: "02000000024100",
        min_final_cltv_expiry: 18,
        node_id:
          "4b9a1fa8e006f1e3937f65f66c408e6da8e1ca728ea43222a7381df1cc449605",
        offer_id:
          "28522b52ac39fa518ce3a5b3e4a9a96372487e78ba5eb1540ec4d9f02ca82718",
        payer_info: "98b6d8e08b9b3ab7a82408b59dd9238e",
        payer_key:
          "7e1714e279c4c4d05fd3c1f20bbe9b6d5cf6d47f8e9f7054fc5f476391c6c78f",
        payment_hash:
          "16084e0e47f38e77d43cfce6fa6a5881aa7ffb07060c5684406502092c76ab9b",
        relative_expiry: 7200,
        signature:
          "017da6e672bbff9166d6bd15eea692e46b7cbee7b4814ab11d2ac0a8b948a6f94336e8c29d066b98ef2eab3e1f98a3d696deea4b0ae97e76cddd22e0cbf3e4fb",
        timestamp: 1656566837,
        type: "bolt12 invoice",
        valid: true,
      },
      invoice:
        "lni1qsszs53t22krn7j33n36tvly4x5kxujg0eut5h432s8vfk0s9j5zwxqgq9jq5920venx2u3qvfujqun4wd68jfmnyphx7er9psrsyqqqqqpyzqq7yp9e58aguqr0rcun0ajlvmzq3ek63cw2w282gv3z5uupmuwvgjtq2f3q0ct3fcnecnzdqh7nc8eqh05md4w0d4rl360hq48utark8ywxc78jsprzh56r223qzcyyurj87w8804pulnn056jcsx48l7c8qcx9dpzqv5pqjtrk4wdjuqgjxggf3dkcuz9ekw4h4qjq3dvamy3cauzqq976denjh0lezekkh527af5ju34he0h8kjq54vga9tq23w2g5mu5xdhgc2wsv6ucauh2k0slnz3ad9k7af9s46t7wmxa6ghqe0e7f7c",
    };
  }

  getMetricOne(network: string, nodeId: string): MetricsOne | undefined {
    throw new Error("Method not implemented.");
  }
}
