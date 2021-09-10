import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {GetInfoNode} from "../../../model/GetInfoNode";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import FingerprintOutlined from "@material-ui/icons/FingerprintOutlined";
import {ResponsiveLine, Serie} from '@nivo/line'
import {metricsOneToTotChannelsByDay} from "../../../utils/AppUtils";
import {MetricsOne} from "../../../model/Metrics";
import makeTheme from '../../../theme/ChartTheme'
import theme from '../../../theme/DarkTheme'
import TodayRounded from "@material-ui/icons/TodayRounded";
import CardHeader from "@material-ui/core/CardHeader";

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
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    <TodayRounded/>
                </Avatar>
            }
            titleTypographyProps={{color: color}}
            title={`Node ${nodeInfo.alias} General info`.toUpperCase()}
        />
        <CardContent>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                    <Grid item direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <List style={{display: 'flex', flexDirection: 'row', padding: 0}}>
                            <ListItem alignItems="center" style={{margin: 5}}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintOutlined/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={`c-lightning: ${nodeInfo.version}`}
                                              secondary={metricsOne.timezone}/>
                            </ListItem>
                            <ListItem alignItems="center" style={{margin: 5}}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FingerprintOutlined/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={metricsOne.os_info.os}
                                              secondary={`${metricsOne.os_info.version} on ${metricsOne.os_info.architecture}`}/>
                            </ListItem>
                        </List>
                    </Grid>
            </Grid>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                    <div className={styles.container}>
                        <ResponsiveLine
                            data={lineChartData}
                            pointSize={10}
                            margin={{top: 50, right: 110, bottom: 50, left: 60}}
                            curve="step"
                            colors={color}
                            pointBorderWidth={2}
                            enablePointLabel={true}
                            enableArea={true}
                            areaOpacity={0.4}
                            enableSlices={false}
                            crosshairType="cross"
                            pointColor={{from: 'color', modifiers: []}}
                            pointLabelYOffset={-12}
                            theme={makeTheme(color, theme.palette.text.primary)}
                            xScale={{type: "point"}}
                            yScale={{
                                type: "linear",
                                min: 0,
                                stacked: false
                            }}
                            useMesh={true}
                            axisBottom={{
                                orient: '',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 50,
                                legend: 'Day',
                                legendOffset: 36,
                                legendPosition: 'middle',
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 3,
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