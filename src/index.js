/**
 * 本次培训react使用是基于16.8.0版本
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./app";
import Cesium from "./component/cesium";
import { createBrowserHistory } from "history";
import "cesium/Widgets/widgets.css";
import "antd/dist/antd.css";

const history = createBrowserHistory();
window.logger = {
  info: (v) => {
    console.log(v);
  }
};
window.goRoute = v => {
  history.push(v);
  history.go();
};

ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={Cesium} />
    <Route path='/app' component={App} />
  </Switch>
</BrowserRouter>, document.getElementById("root"));
