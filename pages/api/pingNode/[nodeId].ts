import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../../api/APIProvider";

interface Query {
  nodeId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { nodeId } = req.query as unknown as Query;
    let ping = await APIProvider.api().ping(nodeId);
    res.status(200).json({ result: ping });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
