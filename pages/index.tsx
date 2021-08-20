import React from 'react'
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
    infoNode: GetInfoNode | null
    offline: boolean
    showMessage: boolean
    messageToShow: string
}

class Home extends React.Component<any, AppState>  {
    state: AppState = {
        page: <HomeView show={this.setShowMessage} nodeInfo={null}/>,
        pageName: "home",
        infoNode: null,
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
                page = <HomeView show={this.setShowMessage} nodeInfo={this.state.infoNode}/>
                pageName = "home"
                break
            case "metrics":
                page = <HomeView show={this.setShowMessage}  nodeInfo={this.state.infoNode}/>
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

    setShowMessage = (show: boolean, message: string) => this.setState((_) => ({showMessage: show, messageToShow: message}))

    componentDidMount() {
        console.debug("Base url is: ", process.env.NEXT_PUBLIC_REST_URL)
        axios.get(`${process.env.NEXT_PUBLIC_REST_URL}/utility/getinfo`).then(response => {
            this.setState((_) => ({infoNode: response.data}));
            this.changePage(this.state.pageName)
        }).catch(error => {
            console.error(error);
            this.setState((_) => ({offline: true}))
        });
    }

    render() {
        let view =  this.state.offline ? <Offline /> : <Loading />
        if (this.state.infoNode !== null) {
            view = <BasicAppBar nameNode={this.state.infoNode.alias} child={this.state.page} value={this.state.pageName} changeValue={this.changePage}/>
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
