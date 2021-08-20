import axios from "axios";

export default async function handler(req, res) {
            try {
                let funds = await (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/utility/listfounds`)).data;
                let nodes = (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/network/listnodes`)).data;
                let resp = []
                nodes.nodes.forEach((node) => {
                    let channel = funds.channels.filter(channel => node["nodeId"] === channel["peerId"]);
                    if (channel.length > 0) {
                        channel = channel[0];  // For sure there peer is the same here
                        channel.nodeInfo = node;
                        resp.push(channel);
                    }
                });
                console.debug(resp);
                res.status(200).json({channels: resp})
            } catch (error) {
                console.error(error)
                res.status(500).json({error: error});
            }
}
