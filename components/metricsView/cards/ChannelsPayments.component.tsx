import React, {ReactElement} from "react";
import {GetInfoNode} from "../../../model/GetInfoNode";
import {MetricsOne} from "../../../model/Metrics";
import {Card} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import TodayRounded from "@material-ui/icons/TodayRounded";
import CardHeader from "@material-ui/core/CardHeader";
import {ResponsiveRadar} from '@nivo/radar'
import CardContent from "@material-ui/core/CardContent";
import makeTheme from "../../../theme/ChartTheme";
import theme from "../../../theme/DarkTheme";
import styles from "../../../styles/SummaryChannels.module.css";
import {metricsOneToContributionNode, metricsOneToPaymentsContributionByChannels} from "../../../utils/AppUtils";


type ChannelsPaymentsProps = {
    nodeInfo: GetInfoNode
    metricsOne: MetricsOne
    show: (show: boolean, message: string) => void
}

export default function ChannelsPayments({nodeInfo, metricsOne, show}: ChannelsPaymentsProps): ReactElement {
    let {color} = metricsOne
    color = `#${color}`
    let {data, labels} = metricsOneToPaymentsContributionByChannels(metricsOne)

    console.debug(JSON.stringify(data));
    return <Card>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    <TodayRounded/>
                </Avatar>
            }
            title={`Forwards Payments by each channels`.toUpperCase()}
        />
        <CardContent>
            <div className={styles.container}>
                <ResponsiveRadar
                    data={data}
                    keys={labels}
                    indexBy="node"
                    maxValue="auto"
                    curve="linearClosed"
                    borderWidth={2}
                    borderColor={{from: 'color'}}
                    gridLevels={6}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{theme: 'background'}}
                    dotBorderWidth={2}
                    dotBorderColor={{from: 'color'}}
                    enableDotLabel={true}
                    dotLabel="value"
                    dotLabelYOffset={-12}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                    motionConfig="wobbly"
                    isInteractive={true}
                    theme={makeTheme(color, theme.palette.text.primary)}
                    legends={[
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            translateX: -50,
                            translateY: -40,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemTextColor: color,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: color
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </CardContent>
    </Card>
}