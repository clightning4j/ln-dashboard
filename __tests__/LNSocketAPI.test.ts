import LNSocketAPI from "../api/LNSocketAPI"

test('Configure lnsocket', async () => {
    let nodeID = ""
    let client = new LNSocketAPI( /*node id*/ nodeID, /*address*/"", /*rune*/"")
    client.connect();
    let getInfo = await client.getInfo();
    expect(getInfo["id"]).toBe(nodeID);
});