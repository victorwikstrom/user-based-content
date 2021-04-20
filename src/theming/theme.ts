import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#EFCDB6",
      },
      secondary: {
        main: "#A3B199",
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: "Roboto",
      body1: {
        fontWeight: 400,
      },
    },
  })
);
