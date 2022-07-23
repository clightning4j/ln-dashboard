import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../api/APIProvider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let resp = await APIProvider.api().listOffers(true);
    res.status(200).json({ data: resp });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
