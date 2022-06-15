import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { ticker } = req.query;
    let price = await (
      await axios.get(
        `https://api.blockchain.com/v3/exchange/tickers/${ticker}`
      )
    ).data;
    res.status(200).json({ price: price["last_trade_price"] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
