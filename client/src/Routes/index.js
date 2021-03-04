// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
const Account = () => (
  <div>
    <h1>Account</h1>
  </div>
);
const Post = () => (
  <div>
    <h1>Post</h1>
  </div>
);
const PostEdit = () => (
  <div>
    <h1>PostEdit</h1>
  </div>
);

const Routes = () => (
  <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/login' component={Login} />
    <Route path='/account' component={Account} />
    <Route path='/:slug/edit' component={PostEdit} />
    <Route path='/:slug' component={Post} />
  </Switch>
);

export default Routes;
