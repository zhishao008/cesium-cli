import React, { Component } from 'react';
import './index.less';
import { Link,Route,Switch,Redirect } from "react-router-dom";
const Route1 = ()=> <div>I am router1</div>
const Route2 = ()=> <div>I am router2</div>
const Route3 = ()=> <div>I am router3</div>

class App extends Component {
  render() {
    return (
      <div className="App">
       <h2>二级路由</h2>
      <div>
        <div><Link to='/app/router1'>Route1</Link></div>
        <div><Link to='/app/router2'>Route2</Link></div>
        <div><Link to='/app/router3'>Route3</Link></div>
      </div>
      <hr />
      <div>
        <Switch>
          <Route exact path="/app/" render={() => <Redirect to="/app/router1"/>} />
          <Route path="/app/router1" component={Route1} />
          <Route path="/app/router2" component={Route2} />
          <Route path="/app/router3" component={Route3} />
        </Switch>
      </div>
      </div>
    );
  }
}

export default App;