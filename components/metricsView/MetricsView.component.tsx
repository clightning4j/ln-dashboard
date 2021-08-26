import {GetInfoNode} from "../../model/GetInfoNode";
import Offline from "../genericView/Offline.component";
import useSWR from "swr";
import {fetcher} from "../../utils/AppUtils";
import Loading from "../genericView/Loading.component";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SummaryChannels from "./cards/SummaryChannels.components";

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
        show(true, "Error: " + error)
        return <></>
    }
    if (!data)
        return <Loading/>
    let metricsOne: Object = data.metrics["metric_one"]
    console.debug(`Metric one with the follow payload ${metricsOne.toString()}`);

    return <Grid
        container
        style={{marginTop: "5em"}}
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Grid
            item
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box m={3}>
                <SummaryChannels nodeInfo={nodeInfo} metricsOne={metricsOne} show={show}/>
            </Box>
        </Grid>
    </Grid>
}