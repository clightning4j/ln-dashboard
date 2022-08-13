import { container } from "tsyringe";
import { GetInfoNode } from "./CoreLN";
import APIProvider from "../api/APIProvider";

class ModelContaint {
  static GET_INFO: string = "getinfo";
}

export default class ModelProvider {
  public static async getNodeInfo(): Promise<GetInfoNode> {
    if (container.isRegistered(ModelContaint.GET_INFO)) {
      return container.resolve(ModelContaint.GET_INFO);
    } else {
      let nodeInfo = await APIProvider.api().getInfo();
      this.setNodeInfo(nodeInfo);
      return container.resolve(ModelContaint.GET_INFO);
    }
  }

  public static setNodeInfo(nodeInfo: GetInfoNode) {
    console.log(`Setting node info ${JSON.stringify(nodeInfo)}`);
    container.register(ModelContaint.GET_INFO, { useValue: nodeInfo });
  }
}
