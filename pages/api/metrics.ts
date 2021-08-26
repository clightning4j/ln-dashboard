import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // How add dinamicaly the id of the metrics?
        let resp: Metrics = await (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/plugin/diagnostic?metrics_id=1`)).data;
        console.debug(resp);
        res.status(200).json(resp)
    } catch (error) {
        console.error(`Error from request ${error.toString()}`)
        res.status(500).json({error: error});
    }
}