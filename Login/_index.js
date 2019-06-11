import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import './_index.scss';
import Header from '../_global/Header';
import LoginForm from './loginForm';

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pass: '',
      error: '',
    }
  }

  render() {
    const { userName, pass, error } = this.state;
    return (
      <div className="dc-app" lang="EN">
        <Header history={this.props.history}/>

        <div className="inner-layout">
          <div className="container">
            <div className="col-sm-6 login-logo">
              <img src="/src/images/eye.png" alt="logo" title="logo"/>
            </div>
            <div className="col-sm-6">
              <div className="form-login">
                <LoginForm history={this.props.history}/>
              </div>
            </div>   
          </div>
          {/*<div className="inner-layout">
            <div className="container">
              <LoginForm history={this.props.history}/>
            </div>
          </div>*/}
      </div>
    </div>  
    );
  }
}
export default Login;