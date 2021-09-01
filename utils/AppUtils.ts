import axios from "axios";
import {MetricsOne} from "../model/Metrics";
import {Datum} from "@nivo/line";
import {CalendarDatum} from "@nivo/calendar/dist/types/types";
import dayjs from 'dayjs';

export class LineChartItem implements Datum {
    [key: string]: any;

    public x: string
    public y: number

    constructor(key: string, val: number) {
        this.x = key;
        this.y = val;
    }
}

export class CalendarChartItem implements CalendarDatum {
    day: string;
    value: number;

    constructor(day: string, value: number) {
        this.day = day;
        this.value = value;
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
    } catch (e) {
        console.error(e);
        show(true, "Error with message: e");
    }
}

export function metricsOneToTotChannelsByDay(metricsOne: MetricsOne): Array<LineChartItem> {
    let chartItems = []
    metricsOne.up_time.forEach((item, _) => {
        chartItems.push(new LineChartItem(new Date(item.timestamp * 1000).toLocaleDateString(), item.channels["tot_channels"]));
    });
    return chartItems
}

/**
 * TODO: docs it
 * @param metricsOne
 */
export function metricsOneToContributionNode(metricsOne: MetricsOne): Array<CalendarChartItem> {
    let chartItems = []
    let sumContrByDay = new Map<string, number>();
    metricsOne.up_time.forEach(contribution => {
        //There are difference timestamp with the same day.
        if (contribution.timestamp !== 0) {
            let date = dayjs.unix(contribution.timestamp);
            let key: string = date.format('YYYY-MM-DD');
            console.debug(`The date string is ${key}`);
            if (sumContrByDay.has(key))
                sumContrByDay.set(key, sumContrByDay.get(key) + 1);
            else {
                //TODO: JS init a number with 0? if yes we can avoid this if else
                sumContrByDay.set(key, 1);
            }
        }
    });
    sumContrByDay.forEach((value, key) => chartItems.push(new CalendarChartItem(key, value)));
    return chartItems
}
