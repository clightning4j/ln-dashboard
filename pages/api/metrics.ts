import { NextApiRequest, NextApiResponse } from "next";
import APIProvider from "../../api/APIProvider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // How add dinamicaly the id of the metrics?
    let getInfo = await APIProvider.api().getInfo();
    let resp = APIProvider.api().getMetricOne(
      getInfo.network.toString(),
      getInfo.id.toString()
    );
    console.debug(resp);
    res.status(200).json(resp);
  } catch (error: any) {
    console.error(`Error from request ${error.toString()}`);
    res.status(500).json({ error: error });
  }
}
