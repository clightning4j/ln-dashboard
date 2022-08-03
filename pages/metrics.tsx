import { GetServerSideProps } from "next";
import MetricsView from "../components/metricsView/MetricsView.component";
import { GetInfoNode } from "../model/GetInfoNode";
import APIProvider from "../api/APIProvider";
import ModelProvider from "../model/ModelProvider";
import { MetricsOneOutput } from "../model/Metrics";

type MetricsViewProps = {
  nodeInfo: GetInfoNode | null;
  metrics: MetricsOneOutput;
  error: any | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let getMetricsOneOutput = null;
  let nodeInfo = ModelProvider.getNodeInfo();
  try {
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
        error: e,
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
    //TODO adding an error view
    return <></>;
  }
  return <MetricsView nodeInfo={nodeInfo} show={() => 1} metrics={metrics} />;
}
