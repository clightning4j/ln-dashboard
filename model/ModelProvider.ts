import { container } from "tsyringe";
import { GetInfoNode } from "./CoreLN";

class ModelContaint {
  static GET_INFO: string = "getinfo";
}

export default class ModelProvider {
  public static getNodeInfo(): GetInfoNode {
    return container.resolve(ModelContaint.GET_INFO);
  }

  public static setNodeInfo(nodeInfo: GetInfoNode) {
    console.log(`Setting node info ${JSON.stringify(nodeInfo)}`);
    container.register(ModelContaint.GET_INFO, { useValue: nodeInfo });
  }
}
