import { NextApiRequest, NextApiResponse } from "next";
import AppAPI from "../../api/AppAPI";
import MockAPI from "../../api/MockAPI";

let api: AppAPI = new MockAPI()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let resp = api.getOfferInfo();
    console.debug(resp);
    res.status(200).json({ offer: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
