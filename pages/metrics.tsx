import { GetServerSideProps } from "next";
import MetricsView from "../components/metricsView/MetricsView.component";
import { GetInfoNode } from "../model/GetInfoNode";
import APIProvider from "../api/APIProvider";
import ModelProvider from "../model/ModelProvider";
import { MetricsOneOutput } from "../model/Metrics";
import MetricsError from "../components/genericView/MetricsError.component";

type MetricsViewProps = {
  nodeInfo: GetInfoNode | null;
  metrics: MetricsOneOutput;
  error: any | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let getMetricsOneOutput = null;
  let nodeInfo = null;
  try {
    nodeInfo = await ModelProvider.getNodeInfo();
    getMetricsOneOutput = await APIProvider.api().getMetricsOneOutput(
      nodeInfo.network,
      nodeInfo.id
    );
  } catch (e) {
    console.error(e);
    return {
      props: {
        nodeInfo: nodeInfo,
        metrics: getMetricsOneOutput,
        error: JSON.parse(JSON.stringify(e)),
      },
    };
  }
  return {
    props: {
      nodeInfo: nodeInfo,
      metrics: getMetricsOneOutput,
      error: null,
    },
  };
};

export default function MetricsPage({
  nodeInfo,
  metrics,
  error,
}: MetricsViewProps) {
  if (error) {
    return <MetricsError nodeInfo={nodeInfo} />;
  }
  return <MetricsView nodeInfo={nodeInfo} metrics={metrics} />;
}
