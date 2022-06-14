import React from "react"
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction, Box,
    Container,
    IconButton,
    Toolbar
} from "@mui/material"
import {Menu, Home, PieChart} from "@mui/icons-material"
import theme from '../../theme/DarkTheme'
import Loading from "../genericView/Loading.component"
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {ViewName} from "../../pages";

const colorByNetwork = {
    "bitcoin": "f2a900",
    "testnet": "4d4d4e",
    "liquid": "009688",
    "litecoin": "",
}

class BasicAppBar extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            ready: false,
        }
        this.loadDom = this.loadDom.bind(this);
    }

    componentDidMount() {
        this.loadDom()
    }

    loadDom() {
        new Promise((resolve) => setTimeout(() => resolve(), 1000))
            .then(() => {
                // In case of error we can remove the loading view
                if (!this.state.ready)
                    this.setState({ready: true}); // showing the app
            });
    }

    render() {
        const {child, value, mappingButton, network, changeValue} = this.props
        console.log(mappingButton);
        return (
            <Container maxWidth="xl">
                <AppBar position="sticky" style={{
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Toolbar>
                        <Grid justifyContent="space-between"
                              alignItems="center"
                              container
                        >
                            <Grid item>
                                <IconButton
                                    onClick={() => console.log("Click on menu icon")}
                                    disabled={true}
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    size="large">
                                    <Menu/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Chip
                                    label={network}
                                    style={{
                                        background: "#" + colorByNetwork[network],
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box m={theme.spacing(1)} mb={theme.spacing(2)}>
                    {this.state.ready ? child : <Loading/>}
                </Box>
                <AppBar position="fixed" className="navigation-style"
                        style={{
                            backgroundColor: theme.palette.background.paper,
                            top: "auto", bottom: 0
                        }}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            this.setState({ready: false});
                            changeValue(newValue)
                            this.loadDom()
                        }}
                    >
                        <BottomNavigationAction label="Home" value={ViewName.HOME} disabled={mappingButton[ViewName.HOME] === false} icon={<Home/>}/>
                        <BottomNavigationAction label="Metrics" value={ViewName.METRICS} disabled={mappingButton[ViewName.METRICS] === false} icon={<PieChart/>}/>
                    </BottomNavigation>
                </AppBar>
            </Container>
        );
    }
}

export default BasicAppBar;
