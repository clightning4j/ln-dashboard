import { Component } from "react";
import { GetServerSideProps } from "next";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import HomeView from "../components/home/Home.component";
import DonationView from "./donation";
import BasicAppBar from "../components/appbar/BasicAppBar.component";
import { Helmet } from "react-helmet";
import theme from "../theme/DarkTheme";
import { GetInfoNode } from "../model/GetInfoNode";
import Loading from "../components/genericView/Loading.component";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import Offline from "../components/genericView/Offline.component";
import { StyledEngineProvider } from "@mui/material/styles";
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
