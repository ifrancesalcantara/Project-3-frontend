import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import BabelCore from "babel-core"

import App from "./App";
import AuthProvider from "./lib/AuthProvider";


ReactDOM.render(
      <AuthProvider>
        <App />
      </AuthProvider>,
  document.getElementById("root")
);