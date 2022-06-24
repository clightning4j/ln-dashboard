import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let funds = await (
      await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/utility/listfounds`)
    ).data;
    let nodes = (
      await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/network/listnodes`)
    ).data;
    let resp: Array<any> = [];
    nodes.nodes.forEach((node: any) => {
      let channel = funds.channels.filter(
        (channel: any) => node["nodeId"] === channel["peerId"]
      );
      if (channel.length > 0) {
        channel = channel[0]; // For sure there peer is the same here
        channel.nodeInfo = node;
        resp.push(channel);
      }
    });
    console.debug(resp);
    res.status(200).json({ channels: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
