import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../api/APIProvider";
import { LNNode, Channel } from "../../model/CoreLN";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let funds = await APIProvider.api().listFunds();
    for await (const channel of funds.channels) {
      channel.node_info = (
        await APIProvider.api().listNodes(channel.peer_id)
      ).nodes[0];
    }
    funds.channels = funds.channels.filter(
      (channel) => channel.node_info != null
    );
    console.debug(funds.channels);
    res.status(200).json({ channels: funds.channels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
