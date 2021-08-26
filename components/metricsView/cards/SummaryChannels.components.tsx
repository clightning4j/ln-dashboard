import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {GetInfoNode} from "../../../model/GetInfoNode";
import Grid from "@material-ui/core/Grid";
import {ResponsiveLine} from '@nivo/line'
import {metricsOneToTotChannelsByDay} from "../../../utils/AppUtils";
import {MetricsOne} from "../../../model/Metrics";
import makeTheme from '../../../theme/ChartTheme'
import theme from '../../../theme/DarkTheme'

import styles from '../../../styles/SummaryChannels.module.css'

type SummaryChannelsProps = {
    nodeInfo: GetInfoNode
    metricsOne: MetricsOne
    show: (show: boolean, message: string) => void
}

export default function SummaryChannels({nodeInfo, metricsOne, show}: SummaryChannelsProps): JSX.Element {
    let {color} = metricsOne
    color = `#${color}`

    let lineChartData: Array<Object> = []
    //TODO make this operation from a server side
    lineChartData.push({
        id: metricsOne.metric_name,
        color: color,
        data: metricsOneToTotChannelsByDay(metricsOne)
    });

    return <Card>
        <CardContent>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Typography style={{color: color}} gutterBottom>
                    {nodeInfo.alias}
                </Typography>
                <div className={styles.container}>
                    <ResponsiveLine
                        data={lineChartData}
                        pointSize={10}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        curve="natural"
                        colors={color}
                        enableArea={true}
                        pointColor={{theme:  'grid.line.stroke' }}
                        pointBorderWidth={2}
                        pointBorderColor={{from: 'serieColor'}}
                        pointLabelYOffset={-12}
                        theme={makeTheme(color, theme.palette.text.primary)}
                        useMesh={true}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Day',
                            legendOffset: 36,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Channels by days',
                            legendOffset: -40,
                            legendPosition: 'middle',
                            color: color
                        }}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: true,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: color,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: color,
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </Grid>
        </CardContent>
    </Card>
}