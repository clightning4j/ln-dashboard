import { GetServerSideProps } from "next";
import HomeView from "../components/home/Home.component";
import { GetInfoNode } from "../model/GetInfoNode";
import APIProvider from "../api/APIProvider";
import ModelProvider from "../model/ModelProvider";

type AppState = {
  pageName: string;
  offline: boolean;
  showMessage: boolean;
  messageToShow: string;
};

type AppProps = {
  nodeInfo: GetInfoNode | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let nodeInfo = null;
  try {
    nodeInfo = await ModelProvider.getNodeInfo();
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      nodeInfo: nodeInfo,
    },
  };
};

export default function Home({ nodeInfo }: AppProps) {
  return <HomeView nodeInfo={nodeInfo} show={() => 1} />;
}
