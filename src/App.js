import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./views/Home/Home";
import Login from "./views/Auth pages/Login/Login";
import Signup from "./views/Auth pages/Signup/Signup";
import Profile from "../src/views/Profile";
import Painting from "./views/Painting.js";
import PaintingsAdd from "./views/AddPaintings";
import Edit from "./views/Edit";
import Chat from "./views/Chat";

import AnonRoute from "./components/a_Route Components/AnonRoute";
// import PrivateRoute from './components/a_Route Components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <AnonRoute exact path="/login" component={Login}></AnonRoute>
          <AnonRoute exact path="/signup" component={Signup}></AnonRoute>
          <Route exact path="/profile" component={Profile}></Route>
          <Route
            exact
            path="/painting/edit/:paintingId"
            component={Edit}
          ></Route>
          <Route
            exact
            path="/painting/:paintingId"
            component={Painting}
          ></Route>
          <Route exact path="/paintings/add" component={PaintingsAdd}></Route>
          <Route exact path="/chat/:creatorId/:userId" component={Chat}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
