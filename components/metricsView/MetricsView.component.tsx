import {GetInfoNode} from "../../model/GetInfoNode";
import Offline from "../genericView/Offline.component";
import useSWR from "swr";
import {fetcher} from "../../utils/AppUtils";
import Loading from "../genericView/Loading.component";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SummaryChannels from "./cards/SummaryChannels.components";
import UpTimeNode from "./cards/UpTimeNode.component";

type MetricsViewProps = {
    nodeInfo: GetInfoNode | null
    show: (visible: boolean, message: string) => void
}

export default function MetricsView({nodeInfo, show}: MetricsViewProps): JSX.Element {
    if (!nodeInfo)
        return <Offline/>
    const {data, error} = useSWR('/api/metrics', fetcher)
    if (error) {
        //TODO adding an error view
        show(true, `Error: ${error.toString()}`);
        return <></>
    }
    if (!data)
        return <Loading/>
    let metricsOne: any = data.metrics["metric_one"]
    console.debug(`Metric one with the follow payload ${metricsOne.toString()}`);

    return <Grid
        container
        spacing={2}
        style={{marginTop: "5em"}}
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Grid item xs={12}>
            <SummaryChannels nodeInfo={nodeInfo} metricsOne={metricsOne} show={show}/>
        </Grid>

        <Grid item xs={12}>
            <UpTimeNode nodeInfo={nodeInfo} metricsOne={metricsOne} show={show}/>
        </Grid>
    </Grid>
}