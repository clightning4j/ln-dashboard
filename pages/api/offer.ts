import { NextApiRequest, NextApiResponse } from "next";
import AppAPI from "../../api/AppAPI";
import MockAPI from "../../api/MockAPI";
import { container } from "tsyringe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let api: AppAPI = container.resolve(MockAPI);
  let resp = api.getOfferInfo();
  resp.then((value) => {
    console.debug(value);
    res.status(200).json({ offer: value });
  });
  resp.catch((error) => {
    console.error(error);
    res.status(500).json({ error: error });
  });
}
