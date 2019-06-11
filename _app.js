import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
//const queryString = require( 'query-string' );
import Utils from './_shared/_utils';
import Header from './_global/Header';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navigation from './Navigation/_index';
import Data from './DataRequest/_index';
import DataReport from './Report/_index';
import GlobalSearch from './Search/_index';

import Request from './Request/_index';
import DataProvision from './DataProvision/_index';
import Insights from './Insights/_index';
import Connections from './Connections/_index';
import Import from './Import/_index';
import DataProvisionD from './DataProvisionDummy/DataProvisionD';
import NoteHome from './Notebooks/NoteHome';
import Notebook from './Notebooks/Notebook';

//import { connect } from 'react-redux';
//import { setLoginDetails } from './Redux/Login';
//import appConfig from './appConfig';
import './_app.scss';

class App extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        setLoginDetails: PropTypes.func,
        location: PropTypes.object.isRequired,
    };

    onLogOut() {
        // This is implemented from _global/HeaderUser.js
        Utils.eraseLocalStorage('isLogin');
        Utils.eraseLocalStorage('ldapid');
        Utils.eraseLocalStorage('fullname');
        Utils.eraseLocalStorage('userrole');
        window.open(Utils.getApiBaseUrl() + '/logout', '_self');
        return null;
    }
    pagedef() {
        return (
            <div className="dc-app" lang="EN">
                <div className="appContainer">
                    <Header onLogOut={this.onLogOut} isLoggedIn={true} history={this.props.history} />
                    {/*<Navigation history={this.props.history} />*/}
                    <div className="mainFlex">
                        <Switch> 
                        <Route exact path="/" render={() => <Redirect to="/my-request" />} />
                        <Route exact path="/my-request" component={Data} />
                        <Route exact path="/workitems" component={DataReport} />
                        <Route exact path="/global-search" component={GlobalSearch} />
                        <Route exact path="/data-request" component={Request} />
                        <Route exact path="/data-provision" component={DataProvision} />
                        <Route exact path="/insights" component={Insights} />
                        <Route exact path="/connections" component={Connections} />
                        <Route exact path="/connections/:cid" component={Connections} />
                        <Route exact path="/import" component={Import} />
                        <Route exact path="/note" component={NoteHome} />
                        <Route exact path="/notebook" component={Notebook} />
                        <Route exact path="/notebook/:nid" component={Notebook} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }

    render() {
        return this.pagedef();
    }
}
export default App
