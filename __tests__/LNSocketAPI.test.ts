import LNSocketAPI from "../api/LNSocketAPI";
import RpcClient from "@core-ln/core";

test("Configure lnsocket", async function () {
  try {
    let rpcClient = new RpcClient(process.env.CLN_UNIX!);
    let getInfoRpc = await rpcClient.call<Map<string, unknown>>("getinfo", {});
    let nodeID = getInfoRpc.get("id");
    let runeRPC: any = await rpcClient.call<Map<string, unknown>>(
      "commando-rune",
      { restrictions: "readonly" }
    );
    // @ts-nocheck
    let client = new LNSocketAPI(
      /*node id*/ nodeID as string,
      /*address*/ "127.0.0.1:19735",
      /*rune*/ runeRPC.get("rune") as string
    );
    await client.connect();
    let getInfo = await client.getInfo();
    console.log(getInfo);
    expect(getInfo["id"]).toBe(nodeID);
  } catch (e) {
    console.error(e);
  }
});
