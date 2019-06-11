import React, { Component } from 'react';
import './_index.scss';
import PropTypes from 'prop-types';
//import Utils from '../_shared/_utils';
//import createHistory from 'history/createBrowserHistory'
//const history = createHistory()

class NavSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      resourceData: [],
      isOpen: false,
      forceOpen: false,
      offset: 0,
      perPage: 10,
      defaultVal: '',
    }
    this.onSearch = this.onSearch.bind(this);
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    inputProps: PropTypes.object,
  };
  onSearch() {   
    this.props.history.push( '/global-search' );
  }
  render() {
    return (
      <div className="search-bar">
        <div className="search-container">
            <input className="search" type="search" placeholder="Search" onClick={this.onSearch}/>
            <span className="searchbox-icon"><i className="ion-ios-search" ></i></span>
        </div>
      </div>
    );
  }
}
export default NavSearch;
