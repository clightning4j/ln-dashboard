import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {GetInfoNode} from "../../../model/GetInfoNode";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import FingerprintOutlined from "@material-ui/icons/FingerprintOutlined";
import {ResponsiveLine, Serie} from '@nivo/line'
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

    let lineChartData: Array<Serie> = []
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
                <Paper elevation={0}>
                    <CardContent>
                        <Typography style={{color: color}} gutterBottom>
                            {nodeInfo.alias}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`c-lightning: ${nodeInfo.version}`} secondary={metricsOne.timezone} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintOutlined />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={metricsOne.os_info.os} secondary={`${metricsOne.os_info.version} on ${metricsOne.os_info.architecture}`} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Paper>
                <div className={styles.container}>
                    <ResponsiveLine
                        data={lineChartData}
                        pointSize={10}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        curve="step"
                        colors={color}
                        pointBorderWidth={2}
                        enablePointLabel={true}
                        enableArea={true}
                        areaOpacity={0.4}
                        enableSlices={false}
                        crosshairType="cross"
                        pointColor={{ from: 'color', modifiers: [] }}
                        pointLabelYOffset={-12}
                        theme={makeTheme(color, theme.palette.text.primary)}
                        xScale={{ type: "point"}}
                        yScale={{
                            type: "linear",
                            min: 0,
                            stacked: false
                        }}
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
                        axisTop={null}
                        axisRight={null}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
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
                            }
                        ]}
                    />
                </div>
            </Grid>
        </CardContent>
    </Card>
}