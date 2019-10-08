import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cesium from "./component/cesium";
import { createBrowserHistory } from "history";
import "cesium/Widgets/widgets.css";

ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Cesium} />
  </Switch>
</BrowserRouter>, document.getElementById("root"));
