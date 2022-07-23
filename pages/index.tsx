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
//import MetricsView from '../components/metricsView/MetricsView.component';

type AppState = {
  page: JSX.Element;
  pageName: string;
  offline: boolean;
  showMessage: boolean;
  messageToShow: string;
};

type AppProps = {
  infoNode: GetInfoNode | null;
  // metricsSupport: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let infoNode = null;
  // let metricsSupport = false;
  try {
    infoNode = await APIProvider.api().getInfo();
  } catch (e) {
    console.error(e);
  }
  /*
  FIXME: this api are outdated!
  try {
    // Check if the endpoint expose the metrics api, if not the node doesn't support the metrics view
    (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/plugin/diagnostic?metrics_id=1`)).data;
    metricsSupport = true;
  } catch (e) {
    console.info('Metrics View disable because we got an error!');
    console.debug(`Error message ${e}`);
  }
   */
  return {
    props: {
      infoNode: infoNode,
      // metricsSupport: metricsSupport,
    },
  };
};

//FIXME: move it in a view utils
export enum ViewName {
  HOME = "home",
  DONATION = "donation",
  // METRICS = 'metrics',
}

class Home extends Component<AppProps, AppState> {
  state: AppState = {
    page: (
      <HomeView
        show={(visible, message) => console.debug(visible)}
        nodeInfo={this.props.infoNode}
      />
    ),
    pageName: "home",
    offline: false,
    showMessage: false,
    messageToShow: "",
  };

  changePage = (value: String) => {
    let page: JSX.Element;
    let pageName: string;
    console.debug("Value is: ", value);
    switch (value) {
      case ViewName.DONATION:
        page = (
          <DonationView
            show={this.setShowMessage}
            nodeInfo={this.props.infoNode}
          />
        );
        pageName = ViewName.DONATION;
        break;
      case ViewName.HOME:
        page = (
          <HomeView show={this.setShowMessage} nodeInfo={this.props.infoNode} />
        );
        pageName = ViewName.HOME;
        break;
      // case ViewName.METRICS:
      //   page = <MetricsView show={this.setShowMessage} nodeInfo={this.props.infoNode} />;
      //   pageName = ViewName.METRICS;
      //   break;
      default:
        throw new Error("Error page not exist");
    }
    this.setState((_) => ({
      page: page,
      pageName: pageName,
    }));
  };

  loadDom = (): void => {
    new Promise<void>((resolve) => setTimeout(() => resolve(), 9000)).then(
      () => {
        // In case of error we can remove the loading view
        if (this.props.infoNode === null)
          this.setState((_) => ({ offline: true })); // showing the app
      }
    );
  };

  setShowMessage = (show: boolean, message: string) => {
    this.setState((_) => ({ showMessage: show, messageToShow: message }));
    console.debug(`Show message is: ${show} with message: ${message}`);
  };

  componentDidMount() {
    console.debug(`Base url is ${process.env.NEXT_PUBLIC_REST_URL}`);
    this.loadDom();
    this.changePage(this.state.pageName);
  }

  render() {
    let view = this.state.offline ? <Offline /> : <Loading />;
    if (this.props.infoNode !== null) {
      let mappingView = new Map([
        [ViewName.HOME, true],
        [ViewName.DONATION, true],
        // [ViewName.METRICS, this.props.metricsSupport],
      ]);
      view = (
        <BasicAppBar
          child={this.state.page}
          network={this.props.infoNode.network}
          mappingButton={mappingView}
          value={this.state.pageName}
          changeValue={this.changePage}
        />
      );
    }
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Helmet>
            <meta charSet="utf-8" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta
              name="theme-color"
              content="theme.palette.background.default"
            />
            <title>Home</title>
            <link rel="canonical" href="https://bruce.bublina.eu.org/" />
          </Helmet>
          {view}
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            color={theme.palette.error.main}
            open={this.state.showMessage}
            onClose={() =>
              this.setState((_) => ({ showMessage: false, messageToShow: "" }))
            }
            message={this.state.messageToShow}
            action={
              <IconButton
                onClick={() =>
                  this.setState((_) => ({
                    showMessage: false,
                    messageToShow: "",
                  }))
                }
                size="large"
              >
                <Close color="secondary" />
              </IconButton>
            }
          />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default Home;
