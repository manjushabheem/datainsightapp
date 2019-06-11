import React, { Component } from 'react';
import './_index.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavSearch from './NavSearch';

class Navigation extends Component {
  constructor() {
    super();
    this.onSearch = this.onSearch.bind( this );
    this.onChange = this.onChange.bind( this );
  }

  state = {
    searchField: '',
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  onSearch( event ) {
    event.preventDefault();
    this.setState( { searchField: '' } );
    this.state.searchField && this.props.history.push( `/search-request/${this.state.searchField}` );
  }

  onChange( event ) {
    this.setState( { searchField: event.target.value } );
  }

  render() {
    // const { searchField } = this.state;
    // const regex = new RegExp( `^${searchField}` );
    // const items = resourceData.filter( ( item ) => searchField && regex.test( item.label ) );
    return (
      <div className="header2">
        <div className="container">
          <ul className="data-req">
            <li>
              <Link className="homeText" to={'/'}>My Inbox</Link>
            </li>
            <li>
              <Link className="homeText" to={'/new-request'}>
                <i className="ion-ios-plus-outline"></i>
                <span>New Request</span>
              </Link>
            </li>
          </ul>
          <NavSearch history={this.props.history}/>
        </div>
      </div>
    );
  }s
}

export default Navigation;
