import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import routes from './_routes';
import {Provider} from 'react-redux';
import { store } from './Redux/store';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
      <Router>
          {routes}
      </Router>
  </Provider>,
  document.getElementById( 'root' )
);
