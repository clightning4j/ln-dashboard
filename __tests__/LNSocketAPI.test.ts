import LNSocketAPI from "../api/LNSocketAPI";

test("Configure lnsocket", async () => {
  let nodeID =
    "03b39d1ddf13ce486de74e9e44e0538f960401a9ec75534ba9cfe4100d65426880";
  let client = new LNSocketAPI(
    /*node id*/ nodeID,
    /*address*/ "127.0.0.1:19735",
    /*rune*/ "PdQYLhm7IZkORiBWmXymbXIAu0uLgpP46PP5q2LEsx49MiZtZXRob2RebGlzdHxtZXRob2ReZ2V0fG1ldGhvZD1zdW1tYXJ5Jm1ldGhvZC9nZXRzaGFyZWRzZWNyZXQmbWV0aG9kL2xpc3RkYXRhc3RvcmU="
  );
  await client.connect();
  let getInfo = await client.getInfo();
  console.log(getInfo);
  expect(getInfo["id"]).toBe(nodeID);
});
