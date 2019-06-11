import React, { Component } from 'react';
import './_index.scss';
import RequestList from './RequestList.js';
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
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

class Data extends Component {

  constructor() {
    super();
    this. state = {
      fields: [],
      filter: 'all',
      modalHeader: 'summary',
      activeClasses: [ false, false, false, false, false, false ],
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      isOpen: false,  
    }
    this.onCloseMsg = this.onCloseMsg.bind( this );
    this.rotateCard = this.rotateCard.bind( this );
    this.handleApply = this.handleApply.bind( this );
  }
  static propTypes = {
    isSearch: PropTypes.bool,
    createResponse: PropTypes.object,
    data:PropTypes.object,
    clearCreateSuccess: PropTypes.func,
    isDataRequestFetching: PropTypes.bool,
    isFetch: PropTypes.bool,
    totalResults: PropTypes.number,
    onSelectDataState: PropTypes.func,
    searchKey: PropTypes.string,
    history: PropTypes.object.isRequired,
    details:PropTypes.object,    
  }
  openDataModal = () => {
    this.setState( { requestDataModalOpen: true, dataModaldetails:'test' } )
  }
  closeDataModal = () => {
    this.setState( { requestDataModalOpen: false } )
  }
  openDataInsertModal = () => {
    this.setState( { dataInsertOpen: true, insertModaldetails: 'test' } )
  }
  closeDataInsertModal = () => {
    this.setState( { dataInsertOpen: false } )
    console.log(this.props);
  }
  toggleFavorite = ( ) => {
    this.setState( {favorite: !this.state.favorite} )
  }
  onStatusTabChange = ( tab ) => {
    this.setState( {modalHeader: tab} );
  }
  onTabStatus( event ) {
    let classID = $( event.target ).attr( 'data-class' );
    this.setState( { filter: classID } );
    this.props.onSelectDataState( classID );
  }
  onCloseMsg(){
    this.props.clearCreateSuccess();
  }
rotateCard( index ){
  const activeClasses = [ ...this.state.activeClasses.slice( 0, index ), !this.state.activeClasses[ index ], ...this.state.activeClasses.slice( index + 1 ) ];
  this.setState( {activeClasses} );
}
handleApply(event, picker) {
  this.setState({
    startDate: picker.startDate,
    endDate: picker.endDate,
  });
}
  render() {
    let {data} = this.props; 
    const { activeClasses } = this.state;
    let start = this.state.startDate.format('YYYY-MM-DD');
    let end = this.state.endDate.format('YYYY-MM-DD');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    const pdata = {
      labels: [ 'FileUpload', 'File', 'PLX' ],
      datasets: [ {
        label: 'Source System',
        data: [ 300, 50, 100 ],
        backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        ],
      } ],
    };
    const bdata = {
      labels: [ 'FileUpload', 'File', 'PLX', 'GCore', 'HFM' ],
      datasets: [
        {
          label: 'Source System',
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderWidth: 1,          
          hoverBorderColor:[
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          data: [ 165, 559, 180, 381, 56 ],
        },
      ],
    };
    return (
      <div className="container-fluid">
        <div className="data-requset">
          <Modal
            open={this.state.requestDataModalOpen || false}
            onClose={this.closeDataModal}
            little
            classNames={ { overlay: 'data-modal-overlay', modal: 'detail-modal' } }>
            <DataCatalogModal dataModaldetails={this.state.dataModaldetails} />
          </Modal>
          <Modal
            open={this.state.dataInsertOpen || false}
            onClose={this.closeDataInsertModal}
            little
            classNames={ { overlay: 'datainsert-modal-overlay', modal: 'datainsert-modal' } }>
            <DataRequestInsertModal insertModaldetails={this.state.insertModaldetails} closeInsertModal={this.closeDataInsertModal} history={this.props.history}/>
          </Modal>
          {/*<h2>My Request </h2>*/} 
          <div className="pull-right"> <a href="#" id="add" className="plus"><i className="icon ion-gear-b"></i></a></div>                   
          <div className="pull-right"> <a href="#" id="add" className="plus"><i className="icon ion-funnel"></i></a></div>
          <div className="pull-right"> <a href="#" id="add" className="plus" onClick={this.openDataInsertModal.bind( this ) }><i className="icon ion-plus-circled"></i></a></div>
        </div>  
        <div className="container">      
        <div className="visual-section">
          <div className="col-sm-6 pichart">
          <Pie
              data={pdata}
              width={400}
              height={250}
              options={{
                  maintainAspectRatio: false,
              }}
          />
          </div> 
          <div className="col-sm-6 columnchart">
          <Bar
              data={bdata}
              width={400}
              height={250}
              options={{
                  maintainAspectRatio: false,
              }}
          />
          </div>  
        </div>
        <div className="datalist">          
            <RequestList dataprops={data && data.hits.length > 0 ? data.hits : ''} />
        </div>  
        {/*<div className="google-grid">
          <div className="containerinner">
            <ul className="grid-listing">        
              {data && data.hits.length > 0 ? data.hits.map(hits => {
                //console.log('hits',hits)
                  return (<RequestList key={hits._id} reqid={hits._id} dataprops={hits._source.catalogItem} fileTypeprops={hits._source.catalogItem.destination.file_type}/> )
              }) : <div className="nofound"> No data found </div>}            
            </ul>
          </div>
          </div>*/}
      </div>
      </div>
    );
  }
}
export default Data;
