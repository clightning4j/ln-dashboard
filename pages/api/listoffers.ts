import { NextApiRequest, NextApiResponse } from "next";
import AppAPI from "../../api/AppAPI";
import MockAPI from "../../api/MockAPI";
import { container } from "tsyringe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let api: AppAPI = container.resolve(MockAPI);
  try {
    let resp: Array<any> = [];
    resp = api.listOffers();
    console.debug(resp);
    res.status(200).json({ offer: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
