const LNSocket = require("lnsocket");
const RpcClient = require("@core-ln/core");

async function go() {
  let nodeID =
    "03b39d1ddf13ce486de74e9e44e0538f960401a9ec75534ba9cfe4100d65426880";
  let runeRPC =
    "tOKm3RBlQDiXnHhv5ycFKHHtsld7p66H0uceXwVecAE9MTkmbWV0aG9kXmxpc3R8bWV0aG9kXmdldHxtZXRob2Q9c3VtbWFyeSZtZXRob2QvZ2V0c2hhcmVkc2VjcmV0Jm1ldGhvZC9saXN0ZGF0YXN0b3Jl";
  const ln = await LNSocket();

  ln.genkey();
  await ln.connect_and_init(nodeID, "127.0.0.1:19735");
  const res = await ln.rpc({ method: "getinfo", rune: runeRPC });

  ln.destroy();
  console.log(res);
  return res;
}

go();
