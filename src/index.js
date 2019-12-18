import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AuthProvider from "./lib/AuthProvider";

import { Provider } from "react-redux"
import { createStore }from "redux"
import CommentReducer from "./reducers/chat-comment"
import ChatForm from "./components/chat/ChatForm/ChatForm"

const store = createStore(
  CommentReducer
)

ReactDOM.render(
  <Provider store={store}>
  <AuthProvider>
    <App />
  </AuthProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
