import { createTheme } from "@material-ui/core";

const oceanic = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#009688",
        },
        secondary: {
            main: "#32424A",
        },
        background: {
            default: "#263238",
            paper: "#263238",
        },
        text: {
            primary: "#607D8B",
            secondary: "#607D8B",
            disabled: "#607D8B",
            hint: "#607D8B",
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
        snackbar: {
            backgroundColor: "lightgreen",
            color: "#607D8B",
        },
    },
});

export default oceanic;
