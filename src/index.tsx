import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppTheme from "./theming/AppTheme";

ReactDOM.render(
  <React.StrictMode>
    <AppTheme>
      <App />
    </AppTheme>
  </React.StrictMode>,
  document.getElementById("root")
);
