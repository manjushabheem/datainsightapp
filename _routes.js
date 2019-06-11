import React from 'react';
import {Switch, Route} from 'react-router';
import App from './_app';
import NotFound from './Pages/Notfound';
import Login from './Login/_index';

export default (
  <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={App} />
      <Route path="*" component={NotFound}/>
  </Switch>
);
