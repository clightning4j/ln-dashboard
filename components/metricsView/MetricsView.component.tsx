import { GetInfoNode } from "../../model/GetInfoNode";
import Offline from "../genericView/Offline.component";
import React from "react";
import Grid from "@mui/material/Grid";
import UpTimeNode from "./cards/UpTimeNode.component";
import ForwardsRatingNode from "./cards/ForwardsRatingNode.component";
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
        sx={{ flexGrow: 1 }}
        style={{ marginTop: "2em" }}
        direction="row"
        justifyContent="left"
        alignItems="left"
        spacing={2}
      >
        <Grid item xs={12} xl={6} sm={6}>
          <UpTimeNode nodeInfo={nodeInfo} show={show} metrics={metrics} />
        </Grid>
        <Grid item xs={12} xl={6} sm={6}>
          <ForwardsRatingNode
            nodeInfo={nodeInfo}
            show={show}
            metrics={metrics}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
