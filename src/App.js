import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Home from "../src/views/Home"
import Profile from "../src/views/Profile"
import Painting from "./views/Painting.js"
import Paintings from "./views/Paintings.js"
import PaintingsAdd from "../src/views/PaintingsAdd"
// import Chat from "../src/views/Chat"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/painting/:paintingId" component={Painting}></Route>
          <Route exact path="/paintings" component={Paintings}></Route>
          <Route exact path="/paintings/add" component={PaintingsAdd}></Route>
          {/* <Route exact path="/chat" component={Chat}></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
