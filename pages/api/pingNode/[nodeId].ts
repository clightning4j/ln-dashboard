import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {nodeId} = req.query
        let ping = await (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/network/ping/${nodeId}`)).data;
        res.status(200).json({result: ping})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error});
    }
}