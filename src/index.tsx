import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppTheme from "./theming/AppTheme";
import Container from "./components/Container";
import Router from "./navigation/Router";

ReactDOM.render(
  <React.StrictMode>
    <AppTheme>
      <Container>
        <Router />
      </Container>
    </AppTheme>
  </React.StrictMode>,
  document.getElementById("root")
);
