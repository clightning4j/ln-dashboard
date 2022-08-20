import React from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import styles from "../../../styles/SummaryChannels.module.css";
import { GetInfoNode } from "../../../model/GetInfoNode";
import Timelapse from "@mui/icons-material/Timelapse";
import { MetricsOneOutput } from "../../../model/Metrics";
import { ResponsivePie } from "@nivo/pie";

type ForwardsRatingProps = {
  nodeInfo: GetInfoNode;
  metrics: MetricsOneOutput;
};

export default function ForwardsRatingNode({
  nodeInfo,
  metrics,
}: ForwardsRatingProps) {
  const dataOneDay = [
    {
      id: "success",
      label: "success",
      value: metrics.forwards_rating.one_day.success,
      color: "hsl(146, 55%, 54%)",
    },
    {
      id: "failure",
      label: "failure",
      value: metrics.forwards_rating.one_day.failure,
      color: "hsl(0, 100%, 50%)",
    },
    {
      id: "internal_failure",
      label: "internal_failure",
      value: metrics.forwards_rating.one_day.internal_failure,
      color: "hsl(340, 70%, 50%)",
    },
  ];

  const hello: any = [];

  const dataTenDays = [
    {
      id: "success",
      label: "success",
      value: metrics.forwards_rating.ten_days.success,
      color: "hsl(146, 55%, 54%)",
    },
    {
      id: "failure",
      label: "failure",
      value: metrics.forwards_rating.ten_days.failure,
      color: "hsl(0, 100%, 50%)",
    },
    {
      id: "internal_failure",
      label: "internal_failure",
      value: metrics.forwards_rating.ten_days.internal_failure,
      color: "hsl(340, 70%, 50%)",
    },
  ];

  const dataThirtyDays = [
    {
      id: "success",
      label: "success",
      value: metrics.forwards_rating.thirty_days.success,
      color: "hsl(146, 55%, 54%)",
    },
    {
      id: "failure",
      label: "failure",
      value: metrics.forwards_rating.thirty_days.failure,
      color: "hsl(0, 100%, 50%)",
    },
    {
      id: "internal_failure",
      label: "internal_failure",
      value: metrics.forwards_rating.thirty_days.internal_failure,
      color: "hsl(340, 70%, 50%)",
    },
  ];

  const dataSixMonths = [
    {
      id: "success",
      label: "success",
      value: metrics.forwards_rating.six_months.success,
      color: "hsl(146, 55%, 54%)",
    },
    {
      id: "failure",
      label: "failure",
      value: metrics.forwards_rating.six_months.failure,
      color: "hsl(0, 100%, 50%)",
    },
    {
      id: "internal_failure",
      label: "internal_failure",
      value: metrics.forwards_rating.six_months.internal_failure,
      color: "hsl(340, 70%, 50%)",
    },
  ];

  const colors: any = {
    success: "#32A966",
    failure: "#FD706B",
    internal_failure: "#FFB347",
  };
  const getColor = function (bar: any) {
    return colors[bar.id];
  };

  return (
    <Card className={styles.cardContainer}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <Timelapse />
          </Avatar>
        }
        title={`Node ${nodeInfo.alias} forwards rating`.toUpperCase()}
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
          <Grid item xs={12} xl={6} sm={6}>
            <div className={styles.containerPie}>
              <h4 className={styles.pieText}>One Day</h4>
              <ResponsivePie
                colors={getColor}
                theme={{
                  textColor: "#fff",
                  labels: {
                    text: {
                      fill: "#fff",
                    },
                  },
                  tooltip: {
                    container: {
                      background: "#fff",
                      color: "#333",
                      fontSize: 10,
                    },
                  },
                }}
                data={dataOneDay}
                margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                enableArcLinkLabels={false}
                arcLabelsTextColor="#000000"
                arcLabelsSkipAngle={10}
                // legends={[
                //     {
                //         anchor: 'bottom',
                //         direction: 'row',
                //         justify: false,
                //         translateX: 0,
                //         translateY: 56,
                //         itemsSpacing: 0,
                //         itemWidth: 100,
                //         itemHeight: 18,
                //         itemTextColor: '#fff',
                //         itemDirection: 'left-to-right',
                //         itemOpacity: 1,
                //         symbolSize: 18,
                //         symbolShape: 'circle',
                //         // effects: [
                //         //     {
                //         //         on: 'hover',
                //         //         style: {
                //         //             itemTextColor: '#000'
                //         //         }
                //         //     }
                //         // ]
                //     }
                // ]}
              />
            </div>
          </Grid>
          <Grid item xs={12} xl={6} sm={6}>
            <div className={styles.containerPie}>
              <h4 className={styles.pieText}>Ten Days</h4>
              <ResponsivePie
                colors={getColor}
                theme={{
                  textColor: "#fff",
                  labels: {
                    text: {
                      fill: "#fff",
                    },
                  },
                  tooltip: {
                    container: {
                      background: "#fff",
                      color: "#333",
                      fontSize: 10,
                    },
                  },
                }}
                data={dataTenDays}
                margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                enableArcLinkLabels={false}
                arcLabelsTextColor="#000000"
                arcLabelsSkipAngle={10}
              />
            </div>
          </Grid>
          <Grid item xs={12} xl={6} sm={6}>
            <div className={styles.containerPie}>
              <h4 className={styles.pieTextBottom}>Thirty Days</h4>
              <ResponsivePie
                colors={getColor}
                theme={{
                  textColor: "#fff",
                  labels: {
                    text: {
                      fill: "#fff",
                    },
                  },
                  tooltip: {
                    container: {
                      background: "#fff",
                      color: "#333",
                      fontSize: 10,
                    },
                  },
                }}
                data={dataThirtyDays}
                margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                enableArcLinkLabels={false}
                arcLabelsTextColor="#000000"
                arcLabelsSkipAngle={10}
              />
            </div>
          </Grid>
          <Grid item xs={12} xl={6} sm={6}>
            <div className={styles.containerPie}>
              <h4 className={styles.pieTextBottom}>Six Months</h4>
              <ResponsivePie
                data={dataSixMonths}
                colors={getColor}
                theme={{
                  textColor: "#fff",
                  labels: {
                    text: {
                      fill: "#fff",
                    },
                  },
                  tooltip: {
                    container: {
                      background: "#fff",
                      color: "#333",
                      fontSize: 10,
                    },
                  },
                }}
                margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                enableArcLinkLabels={false}
                arcLabelsTextColor="#000000"
                arcLabelsSkipAngle={10}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
