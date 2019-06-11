import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import Utils from '../_shared/_utils';
import HeaderUser from './HeaderUser';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

class Header extends React.Component {
  state = {
  }
  render() {
    const user = {
        isLogin: Utils.getLocalStorage( 'isLogin' ),       
    }   
    
    return (
      <header>
          <div className="menu-header">
            <div className="wrapper">
              <div className="col-sm-2 home-dash">
                {/*<Link className="homeText" to={'/'}><img src={ require( '../images/logo.png' ) } alt="logo" title="logo" /></Link>*/}
                <span><h6>Data Insights</h6></span>
              </div>
              {user.isLogin ?
              <div className="col-md-5 upper-tabs">
                <nav className="site-nav">
                  <ul className="nav-tab-list">
                    <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/my-request'}>Dashboard</NavLink></li>
                    <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/workitems'}>Work Items</NavLink></li>
                    <li>
                      <NavLink className="nav-tab" activeClassName="menuactive" to={'#'}>Create</NavLink>
                      <ul className="subnav-tab-list">
                        {/* <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/data-request'}>Data Request</NavLink></li> 
                        <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/data-provision'}>Data Provision</NavLink></li>*/}
                        <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/import'}>Data Request</NavLink></li>
                        <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/dataprovd'}>Data Provision</NavLink></li>
                        <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/insights'}>Insights</NavLink></li>
                        <li><NavLink className="nav-tab" activeClassName="menuactive" to={'/connections'}>Connections</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </nav> 
              </div>
              : ''}
              <HeaderUser onLogOut={this.props.onLogOut} isLoggedIn={user.isLogin} history={this.props.history}/>
            </div>
          </div>
      </header>
    );
  }
}
Header.propTypes = {
    onLogOut: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object,
};
export default Header;
