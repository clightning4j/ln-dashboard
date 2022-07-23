import "../styles/globals.css";
import type { AppProps } from "next/app";
import "reflect-metadata";
import { StyledEngineProvider, ThemeProvider } from "@mui/system";
import theme from "../theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import { Helmet } from "react-helmet";
import BasicAppBar from "../components/appbar/BasicAppBar.component";

function MyApp({ Component, pageProps }: AppProps) {
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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="theme.palette.background.default" />
          <title>Home</title>
          <link rel="canonical" href="https://bruce.bublina.eu.org/" />
        </Helmet>
        <BasicAppBar ready={true} child={<Component {...pageProps} />} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default MyApp;
