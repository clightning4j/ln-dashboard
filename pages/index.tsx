import React from 'react'
import {GetServerSideProps} from 'next'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeView from '../components/home/Home.component';
import BasicAppBar from '../components/appbar/BasicAppBar.component';
import { Helmet } from "react-helmet";
import theme from "../theme/DarkTheme";
import {GetInfoNode} from "../model/GetInfoNode";
import axios from "axios";
import Loading from "../components/genericView/Loading.component";
import {JSX} from "@babel/types";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import Offline from "../components/genericView/Offline.component";

type AppState = {
    page: JSX.Element
    pageName: string
    offline: boolean
    showMessage: boolean
    messageToShow: string
}

type AppProps = {
    infoNode: GetInfoNode | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let infoNode = null;
    try {
        infoNode = (await axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/utility/getinfo`)).data;
    } catch (e) {
        console.error(e);
    }
    return {
        props: {
            infoNode: infoNode
        }
    }
}

class Home extends React.Component<AppProps, AppState>  {
    state: AppState = {
        page: <HomeView show={(visible, message) => console.debug(visible)} nodeInfo={this.props.infoNode}/>,
        pageName: "home",
        offline: false,
        showMessage: false,
        messageToShow: ""
    };

    changePage = (value: String) => {
        let page: JSX.Element;
        let pageName: string;
        console.debug("Value is: ", value)
        switch (value) {
            case "home":
                page = <HomeView show={this.setShowMessage} nodeInfo={this.props.infoNode}/>
                pageName = "home"
                break
            case "metrics":
                page = <HomeView show={this.setShowMessage}  nodeInfo={this.props.infoNode}/>
                pageName = "metrics"
                break
            default:
                throw new Error("Error page not exist")
        }
        this.setState((_) => ({
            page: page,
            pageName: pageName,
        }));
    }

    loadDom = (): void => {
        new Promise<void>((resolve) => setTimeout(() => resolve(), 9000))
            .then(() => {
                // In case of error we can remove the loading view
                if (this.props.infoNode === null)
                    this.setState({offline: true}); // showing the app
            });
    }

    setShowMessage = (show: boolean, message: string) => this.setState((_) => ({showMessage: show, messageToShow: message}))

    componentDidMount() {
        this.loadDom();
    }

    render() {
        let view =  this.state.offline ? <Offline /> : <Loading />
        if (this.props.infoNode !== null) {
            view = <BasicAppBar nameNode={this.props.infoNode.alias} child={this.state.page} value={this.state.pageName} changeValue={this.changePage}/>
        }
        return  (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Home</title>
                    <link rel="canonical" href="https://bruce.bublina.eu.org/" />
                </Helmet>
                {view}
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right"}}
                    color={theme.palette.error.main}
                    open={this.state.showMessage}
                    onClose={() => this.setState((_) => ({showMessage: false, messageToShow: ""}))}
                    message={this.state.messageToShow}
                    action={
                        <IconButton onClick={() => this.setState((_) => ({showMessage: false, messageToShow: ""}))}>
                            <Close color="secondary"/>
                        </IconButton>}
                />
            </ThemeProvider>
        );
    }
}
export default Home;
