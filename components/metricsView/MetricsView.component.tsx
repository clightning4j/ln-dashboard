import { GetInfoNode } from "../../model/GetInfoNode";
import Offline from "../genericView/Offline.component";
import React from "react";
import Grid from "@mui/material/Grid";
import SummaryChannels from "./cards/SummaryChannels.components";
import UpTimeNode from "./cards/UpTimeNode.component";
import ChannelsPayments from "./cards/ChannelsPayments.component";
import theme from "../../theme/DarkTheme";
import { MetricsOneOutput } from "../../model/Metrics";
import { Box } from "@mui/material";

type MetricsViewProps = {
  nodeInfo: GetInfoNode | null;
  metrics: MetricsOneOutput;
  show: (visible: boolean, message: string) => void;
};

export default function MetricsView({
  nodeInfo,
  metrics,
  show,
}: MetricsViewProps) {
  if (!nodeInfo) return <Offline />;
  return (
    <Box mt={theme.spacing(1)} mb={theme.spacing(2)}>
      <Grid
        container
        style={{ marginTop: "5em" }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} xl={12} sm={12}>
          <UpTimeNode nodeInfo={nodeInfo} show={show} metrics={metrics} />
        </Grid>
      </Grid>
    </Box>
    //       <Grid item xs={12} xl={12} sm={12}>
    //         <SummaryChannels
    //           nodeInfo={nodeInfo}
    //           metricsOne={metricsOne}
    //           show={show}
    //         />
    //       </Grid>

    //       <Grid item xs={12} xl={12} sm={12}>
    //         <UpTimeNode nodeInfo={nodeInfo} metricsOne={metricsOne} show={show} />
    //       </Grid>

    //       <Grid item xs={12} xl={12} sm={12}>
    //         <ChannelsPayments
    //           nodeInfo={nodeInfo}
    //           metricsOne={metricsOne}
    //           show={show}
    //         />
    //       </Grid>
  );
}
