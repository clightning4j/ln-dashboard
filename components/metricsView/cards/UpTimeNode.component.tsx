import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import styles from "../../../styles/SummaryChannels.module.css";
import { GetInfoNode } from "../../../model/GetInfoNode";
import Timelapse from "@mui/icons-material/Timelapse";
import { ResponsiveLine, Serie } from "@nivo/line";
import { MetricsOneOutput } from "../../../model/Metrics";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type UpTimeProps = {
  nodeInfo: GetInfoNode;
  metrics: MetricsOneOutput;
};

export default function UpTimeNode({ nodeInfo, metrics }: UpTimeProps) {
  let lineChartData: Array<Serie> = [];

  lineChartData.push({
    id: "uptime_node",
    color: "hsl(174.4, 100%, 29.41%)",
    data: [
      {
        x: "Today",
        y: metrics.up_time.one_day,
      },
      {
        x: "Ten days",
        y: metrics.up_time.ten_days,
      },
      {
        x: "Thirty days",
        y: metrics.up_time.thirty_days,
      },
      {
        x: "Six months",
        y: metrics.up_time.six_months,
      },
    ],
  });

  let date = new Date(metrics.last_update * 1000);
  let time = new Date(metrics.last_update * 1000).toLocaleTimeString("en-US");
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <Timelapse />
          </Avatar>
        }
        title={`Node ${nodeInfo.alias} uptime`.toUpperCase()}
        action={
          <Box mt={1}>
            <Chip
              label={
                "Last Update: " + longEnUSFormatter.format(date) + ", " + time
              }
              style={{
                background: "#" + nodeInfo!.color,
              }}
            />
          </Box>
        }
      />
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="left"
          item
          xs={12}
          xl={12}
          sm={12}
          alignItems="left"
        >
          <div className={styles.container}>
            <ResponsiveLine
              theme={{
                textColor: "#fff",
                axis: {
                  domain: {
                    line: {
                      stroke: "#fff",
                      strokeWidth: 1.5,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#fff",
                      strokeWidth: 2,
                    },
                    text: {
                      fontSize: 12,
                      fill: "#fff",
                    },
                  },
                  legend: {
                    text: {
                      fontSize: 12,
                      fill: "#fff",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "transparent",
                  },
                },
                tooltip: {
                  container: {
                    background: "#fff",
                    color: "#333",
                    fontSize: 10,
                  },
                },
                crosshair: {
                  line: {
                    stroke: "#fff",
                  },
                },
              }}
              data={lineChartData}
              margin={{ top: 10, right: 120, bottom: 70, left: 120 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Days",
                legendOffset: 45,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "up_time",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              colors={{ scheme: "nivo" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
}
