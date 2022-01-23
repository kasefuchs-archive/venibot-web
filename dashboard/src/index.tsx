import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./_app";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
