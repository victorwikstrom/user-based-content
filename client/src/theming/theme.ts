import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#8C52FF",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: "Open Sans",
      body1: {
        fontWeight: 400,
      },
    },
  })
);
