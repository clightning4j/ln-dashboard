import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import styles from "../../../styles/SummaryChannels.module.css";
import { GetInfoNode } from "../../../model/GetInfoNode";
import Timelapse from "@mui/icons-material/Timelapse";
import { LineSvgProps, ResponsiveLine as Line, Serie } from "@nivo/line";
import { AxisProps } from "@nivo/axes";
import Loading from "../../genericView/Loading.component";
import { MetricsOneOutput } from "../../../model/Metrics";

type UpTimeProps = {
  nodeInfo: GetInfoNode;
  metrics: MetricsOneOutput;
  show: (show: boolean, message: string) => void;
};

interface AxisCustomizedProps extends AxisProps {
  orient?: string;
  color?: string;
}
interface ResponsiveLineProps extends LineSvgProps {
  axisBottom: AxisCustomizedProps;
  axisLeft: AxisCustomizedProps;
}
function ResponsiveLine(props: ResponsiveLineProps) {
  return <Line {...props} />;
}

export default function UpTimeNode({ nodeInfo, metrics, show }: UpTimeProps) {
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

  return (
    <Card className={styles.cardContainer}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <Timelapse />
          </Avatar>
        }
        title={`Node ${nodeInfo.alias} uptime`.toUpperCase()}
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
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Days",
                legendOffset: 45,
                legendPosition: "middle",
                color: "#fff",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "up_time",
                legendOffset: -40,
                legendPosition: "middle",
                color: "#fff",
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
