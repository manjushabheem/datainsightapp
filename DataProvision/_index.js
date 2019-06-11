import React, { Component } from 'react';
import './_index.scss';
import PropTypes from 'prop-types';
//import Utils from '../_shared/_utils';
import moment from 'moment';
//import createHistory from 'history/createBrowserHistory'
//const history = createHistory()
import {Bar, Pie, Doughnut } from 'react-chartjs-2';
import Modal from 'react-responsive-modal'
import DataCatalogModal from '../Modal/DataCatalogModal'
import DataRequestInsertModal from '../Modal/DataRequestInsertModal'
import '../Modal/DataModal.scss'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import RequestList from './RequestList.js';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

class DataProvision extends Component {

  constructor() {
    super();
    this. state = {     
    }  
  }
  static propTypes = {
    history: PropTypes.object.isRequired,   
  }
  render() { 
    return (
      <div className="container-fluid">
         <RequestList dataprops={data && data.hits.length > 0 ? data.hits : ''} />       
      </div>
    );
  }
}
export default DataProvision;
