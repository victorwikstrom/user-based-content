import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { theme as createTheme } from "./theme";

type Props = {
  children: React.ReactNode;
};

const AppTheme: React.FC<Props> = ({ children }) => {
  return <ThemeProvider theme={createTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
