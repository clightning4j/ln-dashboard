import { NextApiRequest, NextApiResponse } from "next";
import AppAPI from "../../api/AppAPI";
import MockAPI from "../../api/MockAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let api: AppAPI = new MockAPI();

    let resp = api.getOfferInfo();

    console.debug(api.getOfferInfo());
    res.status(200).json({ offer: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
