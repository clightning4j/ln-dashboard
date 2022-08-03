import React from "react";
import { useState } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Menu, Home, PieChart, Paid } from "@mui/icons-material";
import theme from "../../theme/DarkTheme";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Loading from "../genericView/Loading.component";
import NextProgress from "next-progress";

export class ViewName {
  static HOME = "home";
  static DONATION = "donation";
  static METRICS = "metrics";
}

type BasicAppBarProps = {
  ready: boolean;
  child: any;
};

function fromPathToValue(pathName: string): ViewName {
  switch (pathName) {
    case `/${ViewName.DONATION}`:
      return ViewName.DONATION;
    case `/${ViewName.METRICS}`:
      return ViewName.METRICS;
    default:
      return ViewName.HOME;
  }
}

export default function BasicAppBar({ ready, child }: BasicAppBarProps) {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <AppBar position="sticky">
        <Toolbar
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid justifyContent="space-between" alignItems="center" container>
            <Grid item>
              <IconButton
                onClick={() => console.log("Click on menu icon")}
                disabled={true}
                edge="start"
                color="inherit"
                aria-label="menu"
                size="large"
              >
                <Menu />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box m={theme.spacing(1)} mb={theme.spacing(2)}>
        <>
          <NextProgress
            color={theme.palette.primary.main}
            options={{ showSpinner: false }}
          />
          {ready === true ? child : <Loading />}
        </>
      </Box>
      <AppBar
        position="fixed"
        className="navigation-style"
        style={{
          backgroundColor: theme.palette.background.paper,
          top: "auto",
          bottom: 0,
        }}
      >
        <BottomNavigation
          value={fromPathToValue(router.pathname)}
          onChange={(event, newValue) => {
            event.preventDefault();
            router.push(newValue == ViewName.HOME ? "/" : `/${newValue}`);
          }}
        >
          <BottomNavigationAction
            label="Donation"
            value={ViewName.DONATION}
            disabled={false}
            icon={<Paid />}
          />
          <BottomNavigationAction
            label="Home"
            value={ViewName.HOME}
            disabled={false}
            icon={<Home />}
          />
          <BottomNavigationAction
            label="Metrics"
            value={ViewName.METRICS}
            disabled={false}
            icon={<PieChart />}
          />
        </BottomNavigation>
      </AppBar>
    </Container>
  );
}
