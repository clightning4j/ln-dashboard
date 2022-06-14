import React, { ReactElement } from 'react';
import { GetInfoNode } from '../../../model/GetInfoNode';
import { MetricsOne } from '../../../model/Metrics';
import { Card, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TodayRounded from '@mui/icons-material/TodayRounded';
import CardHeader from '@mui/material/CardHeader';
import { RadarProps, ResponsiveRadar as Radar } from '@nivo/radar';
import CardContent from '@mui/material/CardContent';
import makeTheme from '../../../theme/ChartTheme';
import theme from '../../../theme/DarkTheme';
import styles from '../../../styles/SummaryChannels.module.css';
import { metricsOneToPaymentsContributionByChannels } from '../../../utils/AppUtils';

interface ResponsiveRadarProps extends RadarProps {
  motionConfig?: string;
}
function ResponsiveRadar(props: ResponsiveRadarProps) {
  return <Radar {...props} />;
}

type ChannelsPaymentsProps = {
  nodeInfo: GetInfoNode;
  metricsOne: MetricsOne;
  show: (show: boolean, message: string) => void;
};

export default function ChannelsPayments({ nodeInfo, metricsOne, show }: ChannelsPaymentsProps): ReactElement {
  let { color } = metricsOne;
  color = `#${color}`;
  let { data, labels } = metricsOneToPaymentsContributionByChannels(metricsOne);

  console.info(JSON.stringify(data));
  console.info(JSON.stringify(labels));

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe'>
            <TodayRounded />
          </Avatar>
        }
        title={`Forwards Payments by each channels`.toUpperCase()}
      />
      <CardContent>
        <Grid container direction='row' justifyContent='center' alignItems='center'>
          <Grid item xs={12} xl={12} sm={12}>
            <div className={styles.container}>
              <ResponsiveRadar
                data={data}
                keys={labels}
                indexBy='node'
                maxValue='auto'
                curve='linearClosed'
                borderWidth={2}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                gridLevels={6}
                gridShape='circular'
                gridLabelOffset={36}
                enableDots={true}
                dotSize={10}
                colors={{ scheme: 'red_yellow_green' }}
                dotColor={{ from: 'color', modifiers: [] }}
                dotBorderWidth={2}
                dotBorderColor={{ from: 'color' }}
                enableDotLabel={true}
                dotLabel='value'
                dotLabelYOffset={-12}
                fillOpacity={0.25}
                blendMode='multiply'
                animate={true}
                motionConfig='wobbly'
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
                          itemTextColor: color,
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
