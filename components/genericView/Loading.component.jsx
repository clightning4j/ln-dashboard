import React from "react";

import { Grid } from "@mui/material";
import ReactLoading from "react-loading";

export default function Loading({ size = 75 }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <ReactLoading type="bars" />
      </Grid>
    </Grid>
  );
}
