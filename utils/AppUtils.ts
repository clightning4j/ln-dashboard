import axios from "axios";
import {MetricsOne} from "../model/Metrics";

export class LineChartItem {
    public x: string
    public y: number

    constructor(key: string, val: number) {
        this.x = key;
        this.y = val;
    }
}

/**
 * TODO docs it
 * @param url
 */
export const fetcher = (url: string) => fetch(url).then((res: Response) => res.json())
/**
 * TODO: docs it
 * @param nodeId
 * @param show
 */
export const pingNode = async (nodeId: string, show: (visible: boolean, message: string) => void) => {
    try {
        const _ = await axios(`/api/pingNode/${nodeId}`)
        show(true, "The node is up");
    }catch (e) {
        console.error(e);
        show(true, "Error with message: e");
    }
}

export function metricsOneToTotChannelsByDay(metricsOne: MetricsOne): Array<LineChartItem> {
    let chartItems = []
    metricsOne.up_time.forEach(item => {
        chartItems.push(new LineChartItem(new Date(item.timestamp * 1000).toDateString(), item.channels["tot_channels"]));
    });
    return chartItems
}
