import React from 'react'
import {MetricsOne} from "../../../model/Metrics";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {ResponsiveCalendar} from '@nivo/calendar'
import {metricsOneToContributionNode} from "../../../utils/AppUtils";
import styles from "../../../styles/SummaryChannels.module.css";
import {GetInfoNode} from "../../../model/GetInfoNode";
import TodayRounded from "@material-ui/icons/TodayRounded"
import {makeStyles} from "@material-ui/styles";

type UpTimeProps = {
    nodeInfo: GetInfoNode
    metricsOne: MetricsOne
    show: (show: boolean, message: string) => void
}


export default function UpTimeNode({nodeInfo, metricsOne, show}: UpTimeProps): JSX.Element {
    let {color} = metricsOne
    color = `#${color}`
    let data = metricsOneToContributionNode(metricsOne);
    return <Card>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    <TodayRounded/>
                </Avatar>
            }
            title={`Node ${nodeInfo.alias} daily contribution`.toUpperCase()}
        />
        <CardContent>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Grid item xs={12}>
                    <div className={styles.container}>
                        <ResponsiveCalendar
                            data={data}
                            from={data[0].day}
                            to={data[data.length - 1].day}
                            emptyColor="#eeffff"
                            colors={['#ff5370', '#f07178', '#c3e88d', color]}
                            margin={{top: 0, right: 40, bottom: 0, left: 40}}
                            yearSpacing={40}
                            maxValue={44}
                            monthBorderColor={color}
                            dayBorderWidth={2}
                            dayBorderColor={color}
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'row',
                                    translateY: 36,
                                    itemCount: 4,
                                    itemWidth: 42,
                                    itemHeight: 36,
                                    itemsSpacing: 14,
                                    itemDirection: 'right-to-left'
                                }
                            ]}
                        />
                    </div>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}