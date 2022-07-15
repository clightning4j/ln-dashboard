import LNSocketAPI from "../api/LNSocketAPI";
import RpcClient from "@core-ln/core";
import { GetInfoNode } from "../model/GetInfoNode";

type Rune = {
  rune: string;
};

test("Configure lnsocket", async function () {
  let rpcClient = new RpcClient(process.env.CLN_UNIX!);
  let getInfoRpc = await rpcClient.call<GetInfoNode>("getinfo", {});
  let nodeID = getInfoRpc.id;
  let runeRPC: any = await rpcClient.call<Rune>("commando-rune", {
    restrictions: "readonly",
  });
  console.log(`Node id ${nodeID} + Rune ${runeRPC.rune}`);
  let client = new LNSocketAPI(
    "http://localhost:9002",
    /*node id*/ nodeID.toString(),
    /*address*/ "127.0.0.1:19735",
    /*rune*/ runeRPC.rune
  );
  console.debug(`Node id ${nodeID} + Rune ${runeRPC.rune}`);
  await client.connect();
  try {
    let getInfo = await client.getInfo();
    console.log(`GetInfo ${getInfo}`);
    expect(getInfo["id"]).toBe(nodeID);
    client.close();
  } catch (e) {
    console.error(`Exception received ${e}`);
    fail(`Exception received ${e}`);
  }
});
