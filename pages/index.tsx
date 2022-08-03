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
  infoNode: GetInfoNode | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let infoNode = null;
  try {
    // TODO: call also list nodes
    infoNode = await APIProvider.api().getInfo();
    ModelProvider.setNodeInfo(infoNode);
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      infoNode: infoNode,
    },
  };
};

export default function Home({ infoNode }: AppProps) {
  return <HomeView nodeInfo={infoNode} show={() => 1} />;
}
