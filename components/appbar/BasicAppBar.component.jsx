import React from "react"
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction, Box,
    Container,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core"
import {Menu, Home, PieChart} from "@material-ui/icons"
import theme from '../../theme/DarkTheme'
import Loading from "../genericView/Loading.component"

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
        const {child, value, nameNode, changeValue} = this.props
        return (
            <Container maxWidth="xl">
                <AppBar position="sticky" style={{
                    backgroundColor: theme.palette.background.paper
                }}>
                    <Toolbar>
                        <IconButton onClick={()=> console.log("Click on menu icon")} disabled={true} edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography color="textSecondary" variant="h6">
                            {nameNode}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {this.state.ready ? child : <Loading />}
                <Box mt={theme.spacing(2)} style={{alignItems: "center"}}>
                <AppBar position="fixed" className="navigation-style"
                        style={{ backgroundColor: theme.palette.background.paper}}>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            this.setState({ready: false});
                            changeValue(newValue)
                            this.loadDom()
                        }}
                    >
                        <BottomNavigationAction label="Home" value="home" icon={<Home/>} />
                        <BottomNavigationAction label="Metrics" value="metrics" icon={<PieChart/>} />
                    </BottomNavigation>
                </AppBar>
                </Box>
            </Container>
        )
    }
}

export default BasicAppBar;
