import React, { Component } from 'react';
import './_index.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-responsive-modal'
import DataCatalogModal from '../Modal/DataCatalogModal'
import AnalyticModal from '../Modal/AnalyticModal'
import DetailModal from '../Modal/DetailModal'
import '../Modal/DataModal.scss'
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap-daterangepicker/daterangepicker.css';
import appConfig from '../appConfig';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Dropdown, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Link from '../_shared/Link.js';

class RequestList extends Component {

  constructor() {
    super();
    this.state = {  
      isAction: false,   
    }
    this.isExpandableRow = this.isExpandableRow.bind( this );
    this.expandComponent = this.expandComponent.bind( this );
    this.expanddata = this.expanddata.bind( this );
    this.handleExpand = this.handleExpand.bind(this);
    this.dataActions = this.dataActions.bind(this);    
    this.expandedRows = {};    
    this.openAnalyticModal = this.openAnalyticModal.bind(this); 
    this.openDetailModal = this.openDetailModal.bind(this);   
  }
  static propTypes = { 
    dataprops: PropTypes.array,
  }
  openAnalyticModal = () => {
    this.setState({ requestAnalyticModalOpen: true, analyticModaldetails: this.props.dataprops })
  }
  closeAnalyticModal = () => {
    this.setState({ requestAnalyticModalOpen: false })
  } 

  openDetailModal = () => {
    this.setState({ openDetailModalOpen: true, detailModaldata: this.props.dataprops })
  }
  closeDetailModal = () => {
    this.setState({ openDetailModalOpen: false })
  } 

  

  isExpandableRow(row) {
    //console.log('row:', row)
    if (row.reqname !== '') { 
      return true;
    }
    return false;
  }

  expandComponent(row) {
    if (this.expandedRows[row.reqname]) {
      //console.log('row', row)
      return (
        <div className="expanddata">
          <ul className="detaillist">
            <li>
              <span className="detaillbl">Request ID</span>
              <span className="detailinfo">{row.requestId}</span>
            </li>
            <li>
              <span className="detaillbl">Create Date</span>
              <span className="detailinfo">{row.createdDate}Aug 18</span>
            </li>
            <li>
              <span className="detaillbl">Acquisition Source</span>
              <span className="detailinfo">{row.source}</span>
            </li>
            <li>
              <span className="detaillbl">Acquisition Method</span>
              <span className="detailinfo">{row.sourceType? row.sourceType : ' '}</span>
            </li>
            {row.file_type === 'pdf' ?
            <li>
              <span className="detaillbl">Number of Pages</span>
              <span className="detailinfo">{row.destinationFilePageCount}</span>
            </li>
            : ''}            
          </ul>
          <div className="requestdetail">
            <span onClick={this.openDetailModal}> Details </span>
          </div> 
        </div>
      )  
    }
    return <div> No data found </div>  
  }

  handleExpand(rowKey, isExpand) {   
    this.expandedRows[rowKey] = isExpand;
  }

  dataActions(cell, row, enumObject, rowIndex){ 
    return (
      <div className="row-action">
        <UncontrolledButtonDropdown>
          <DropdownToggle caret>
            <i className="icon ion-android-more-vertical"></i> 
          </DropdownToggle>         
          <DropdownMenu className="dropmenu">
            <DropdownItem tag={Link} href="https://console.cloud.google.com/bigquery?project=molten-seat-210601&authuser=2">Analyze</DropdownItem>         
            <DropdownItem tag={Link} href="https://datastudio.google.com/u/2/reporting/1us6rQ1gzcBZ4YIPbuy19gcMzEwnZD1sa/page/YGcX">Visualize</DropdownItem>
            <DropdownItem onClick={this.openAnalyticModal}>Run Analytics</DropdownItem>
            <DropdownItem>Download Data</DropdownItem>              
          </DropdownMenu>         
        </UncontrolledButtonDropdown>
      </div>       
    )   
  }
  expanddata(rowdata){
    //console.log('rowdata', rowdata);
    return (
      <BootstrapTable data={ rowdata }>
        <TableHeaderColumn dataField='requestId' isKey>Request ID</TableHeaderColumn>
        <TableHeaderColumn dataField='sourceLocation'>Source Location</TableHeaderColumn>
        <TableHeaderColumn dataField='dataTypes'>Data Types</TableHeaderColumn>
        <TableHeaderColumn dataField='destinationBaseUri'>File Base URI</TableHeaderColumn>
        <TableHeaderColumn dataField='destinationfile_type'>File Type</TableHeaderColumn>
        <TableHeaderColumn dataField='createdDate'>Created Date</TableHeaderColumn>        
      </BootstrapTable>
    )  
  }   

  render() {
    let { dataprops } = this.props;
    //console.log('dataprops', dataprops)
    let rerData = [];
    if ( dataprops && dataprops.length > 0 ) {
        rerData = dataprops.map(hits => {
          return {
            requestId: hits._source.catalogItem.requestEntryId,
            reqname : hits._source.catalogItem.name,            
            source : hits._source.catalogItem.source.lineOfService,
            sourceType : hits._source.catalogItem.source.sourceType,
            tags : hits._source.catalogItem.tags.join(', '),
            sourceLocation: hits._source.catalogItem.source.location,
            dataTypes: hits._source.catalogItem.dataTypes.join(', '),
            destinationBaseUri: hits._source.catalogItem.destination.baseUri,
            destinationfile_type: hits._source.catalogItem.destination.file_type, 
            //destinationfiles: hits._source.catalogItem.destination.files,
            createdDate: moment( hits._source.catalogItem.createdDate ).format( 'YYYY-MM-DD' ),
            //destinationFilePageCount: hits._source.catalogItem.destination.files && hits._source.catalogItem.destination.files[1].pdfParseData[0].length > 0 ? hits._source.catalogItem.destination.files[1].pdfParseData[0].pdfInfo.numPages : '',
          }        
      })
    }
    const options = {
      expandRowBgColor: '#efefef',
      expandBy: 'column',
      onExpand: this.handleExpand,
    };
  
    return (
      <div className="listing-data">
        <Modal
            open={this.state.requestAnalyticModalOpen || false}
            onClose={this.closeAnalyticModal}
            little
            classNames={ { overlay: 'analytic-modal-overlay', modal: 'data-analytic-modal' } }>
            <AnalyticModal analyticModaldetails={this.props.dataprops} />
        </Modal>
        <Modal
            open={this.state.openDetailModalOpen || false}
            onClose={this.closeDetailModal}
            little
            classNames={ { overlay: 'detail-modal-overlay', modal: 'data-detail-modal' } }>
            <DetailModal detailModaldata={this.props.dataprops} />
        </Modal>
        <BootstrapTable data={rerData}             
            hover 
            pagination
            options={ options }
            expandableRow={() => true}
            expandComponent={ this.expandComponent }
            search           
            >
            <TableHeaderColumn dataField='reqname' isKey>Name</TableHeaderColumn>
            <TableHeaderColumn dataField='source'>Source</TableHeaderColumn>
            <TableHeaderColumn dataField='sourceType'>Source Type</TableHeaderColumn>
            <TableHeaderColumn dataField='tags'>Tags</TableHeaderColumn>            
            <TableHeaderColumn dataField="action" dataFormat={this.dataActions} expandable={ false } width='90'>Action</TableHeaderColumn>            
          </BootstrapTable>
      </div>  
    );
  }
}
export default RequestList;
