import React, { Component } from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Signup from './auth/Signup';
import Features from './Features';
import RequireAuth from './auth/RequireAuth';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/features" component={RequireAuth(Features)} />
      </div>
    );
  }
}

export default App;
