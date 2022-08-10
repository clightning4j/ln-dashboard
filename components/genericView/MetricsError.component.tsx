import { Grid, Typography } from "@mui/material";
import { GetInfoNode } from "../../model/GetInfoNode";

type MetricsErrorProps = {
  nodeInfo: GetInfoNode | null;
};

export default function MetricsError({ nodeInfo }: MetricsErrorProps) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Typography variant="h6" style={{ flex: 1 }}>
          The metrics of the node &quot;{`${nodeInfo?.alias}`}&quot; cannot be
          displayed
        </Typography>
      </Grid>
    </Grid>
  );
}
