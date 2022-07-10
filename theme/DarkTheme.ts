import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

const oceanic: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      common: {
        white: "#009688",
      },
      primary: {
        main: "#009688",
        light: "#009688",
        dark: "#009688",
      },
      secondary: {
        main: "#32424A",
      },
      background: {
        default: "#263238",
        paper: "#263238",
      },
      text: {
        primary: "#eeffff",
        secondary: "#607D8B",
        disabled: "#607D8B",
      },
      error: {
        main: "#ff0039",
      },
      warning: {
        main: "#ff7518",
      },
      info: {
        main: "#2f363d",
      },
      success: {
        main: "#85e89d",
      },
      divider: "#009688",
    },
  })
);

export default oceanic;
