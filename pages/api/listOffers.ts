import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../api/APIProvider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let resp = await APIProvider.api().listOffers();
    // FIXME: move this in antoher API by passing as parameter the listof offers
    for await (const offer of resp.offers) {
      offer.info = await APIProvider.api().decode(offer.bolt12);
    }
    console.debug(JSON.stringify(resp));
    res.status(200).json({ data: resp });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
