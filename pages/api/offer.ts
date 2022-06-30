import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let offer = await (
      await axios.get(`https://bootstrap.bolt12.org/fetchinvoice/lno1pg257enxv4ezqcneype82um50ynhxgrwdajx283qfwdpl28qqmc78ymlvhmxcsywdk5wrjnj36jryg488qwlrnzyjczs/100`)
    ).data;
    let resp = offer;
    console.debug(resp);
    res.status(200).json({ offer: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
