import React, {ReactNode} from 'react'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeView from '../components/home/Home.component';
import BasicAppBar from '../components/appbar/BasicAppBar.component';
import { Helmet } from "react-helmet";
import theme from "../theme/DarkTheme";

type AppState = {
    page: ReactNode
    pageName: String
}

class Home extends React.Component<any, AppState>  {
    state: AppState = {
        page: <HomeView />,
        pageName: "home",
    }

    changePage = (value: String) => {
        let page;
        let pageName;
        console.debug("Value is: ", value)
        switch (value) {
            case "home":
                page = <HomeView />
                pageName = "home"
                break
            default:
                throw new Error("Error page not exist")
        }
        this.setState({
            page: page,
            pageName: pageName,
        });
    }

    render() {
        return  (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>LN-Dashboard</title>
                    <link rel="canonical" href="https://bruce.bublina.eu.org/" />
                </Helmet>
                <BasicAppBar nameNode={"TODO"} child={this.state.page} value={this.state.pageName} changeValue={this.changePage}/>
            </ThemeProvider>
        );
    }
}
export default Home;
