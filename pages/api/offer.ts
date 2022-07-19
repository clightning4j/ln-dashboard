import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../api/APIProvider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // FIXME: why not use await?
  let resp = APIProvider.api().getOfferInfo();
  resp.then((value) => {
    console.debug(value);
    res.status(200).json({ offer: value });
  });
  resp.catch((error) => {
    console.error(error);
    res.status(500).json({ error: error });
  });
}
