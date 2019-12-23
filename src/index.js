import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import AuthProvider from "./lib/AuthProvider";
import CommentReducer from "./reducers/chat-comment";

const store = createStore(CommentReducer);

ReactDOM.render(
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
