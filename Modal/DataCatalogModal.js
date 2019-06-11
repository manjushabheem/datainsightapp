import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Table } from 'reactstrap';
import './DataModal.scss';


class DataCatalogModal extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isTabDetail: true,
      showTable: false,
      filterstatus: false,
      value: '',
      selectedText: 'State',
      generateDisable: false,
    }
    this.toggle = this.toggle.bind( this );
    this.select = this.select.bind( this ); 
    this.onClickShowTable = this.onClickShowTable.bind(this); 
  }

  static propTypes = {
    dataModaldetails: PropTypes.object,
    //errModaldetails: PropTypes.srting,
  }

  _setDetail = ( boolVal ) => {
    boolVal !== this.state.isTabDetail && this.setState( { isTabDetail: boolVal } )
    return
  }

  toggle() {
    this.setState( {
      filterstatus: !this.state.filterstatus,
    } );
  }

  select(event) {    
    this.setState( {
      filterstatus: !this.state.filterstatus,
      value: event.target.value,
      selectedText: event.target.innerText,
      generateDisable: true,
      showTable: false,
    } );
  }

  onClickShowTable( ) {
    this.setState( {
      showTable: true,
    } );
  }

  render() {
    const { dataModaldetails } = this.props
    const { value, selectedText, showTable, generateDisable } = this.state
    console.log('dataModaldetails', dataModaldetails)
    const products = [ {
      report_id: 'report_100',
      total_count: '1000',
      created_at: '2018-28-07 13:50 PST',
      Visualization: 'Details',
    }, {
      report_id: 'report_101',
      total_count: '700',
      created_at: '2018-28-06 8:53 PST',
      Visualization: 'Details',
    }, {
      report_id: 'report_102',
      total_count: '6500',
      created_at: '2018-10-07 16:00 PST',
      Visualization: 'Details',
    } ];
    const columns = [ {
      dataField: 'id',
      text: 'Report ID',
    }, {
      dataField: 'count',
      text: 'Total Count',
    }, {
      dataField: 'date',
      text: 'Created At',
    }, {
      dataField: 'visual',
      text: 'Visualization',
    } ];
    let tableHead = [];
    if ( columns && columns.length > 0 ) {
      tableHead = columns.map( ( item, i ) => (
        <th key={i} value={item.dataField}>{item.text}</th>
      ) )
    }

    let tableBody = [];
    if ( products && products.length > 0 ) {
      tableBody = products.map( ( item, i ) => (
        <tr key={i}>
          <td>{item.report_id}</td>
          <td>{item.total_count}</td>
          <td>{item.created_at}</td>
          <td>{item.Visualization}</td>
        </tr>
      ) )
    }

    //content show for the pdf start
    let pdfContextPara = [];
    
    if (dataModaldetails.destination.file_type === 'pdf') {
      
      if ( 
          dataModaldetails.destination.files[1].pdfParseData[0].pages !== '' &&
          dataModaldetails.destination.files[1].pdfParseData[0].pages.length > 0 ) {
        
          //const pdfContext = dataModaldetails.destination.files[1].pdfParseData[0].pages[0].content[0].str.length;
          const pdfPages = dataModaldetails.destination.files[1].pdfParseData[0].pages.length;
          
          let contentArray = [];
        for (let p = 0; p < pdfPages; p++) {
          const pdfContext = dataModaldetails.destination.files[1].pdfParseData[0].pages[p].content.length;
          for (let i = 0; i < pdfContext; i++) {
            contentArray.push(dataModaldetails.destination.files[1].pdfParseData[0].pages[p].content[i].str);
          }
        }

        pdfContextPara = contentArray.join(' ')

      } else {
        pdfContextPara = [ 'No Content' ];
      }
    }
    //content show for the pdf end
    //console.log('contentArray', pdfContextPara);
    
    return (
      <div className="dcModal">
        <div className="row">
          <div className="column sm-100 md-100 modal-header">
            <div className="welcome-content layout-align-start-center datadetail">
              <h3 className="title"> Request Name: {dataModaldetails.name} </h3>
              <div className="welcome-landing-actions layout-align-center-center">
                <div className="welcome-landing-subheading layout-align-start-center">
                  <div className="navigation-tabs">
                    <ul className="nav nav-tabs">
                      <li className="active"><a data-toggle="tab" href="#summary">Summary</a></li>
                      {(dataModaldetails.destination.file_type !== 'pdf') && 
                        <li><a data-toggle="tab" href="#menu1">Location Code</a></li>
                      }
                      {(dataModaldetails.destination.file_type === 'pdf') && 
                        <li><a data-toggle="tab" href="#menu2">Context</a></li>
                      }
                    </ul>
                    <div className="tab-content">
                      <div id="summary" className="tab-pane fade in active">
                        <ul className="detaillist">
                          <li>
                            <span className="detaillbl">Request ID</span>
                            <span className="detailinfo">{dataModaldetails.requestEntryId}</span>
                          </li>
                          <li>
                            <span className="detaillbl">Create Date</span>
                            <span className="detailinfo">Aug 18</span>
                          </li>
                          <li>
                            <span className="detaillbl">Acquisition Source</span>
                            <span className="detailinfo">{dataModaldetails.source.lineOfService}</span>
                          </li>
                          <li>
                            <span className="detaillbl">Acquisition Method</span>
                            <span className="detailinfo">{dataModaldetails.source.sourceType? dataModaldetails.source.sourceType : ' '}</span>
                          </li>
                          {dataModaldetails.destination.file_type === 'pdf' ?
                          <li>
                            <span className="detaillbl">Number of Pages</span>
                            <span className="detailinfo">{dataModaldetails.destination.files[1].pdfParseData[0].pdfInfo.numPages}</span>
                          </li>
                          : ''}
                        </ul>
                      </div>
                      <div id="menu1" className="tab-pane fade">
                        <div className="requestor_period-state">
                          <label>State: </label>
                          <Dropdown isOpen={this.state.filterstatus} toggle={this.toggle} >
                            <DropdownToggle caret>
                              {selectedText} <i className="ion-ios-arrow-down"></i>
                            </DropdownToggle>
                            <DropdownMenu name="state" className="dropmenu filtermenu" id="state">
                              <DropdownItem onClick={this.select} value="AL">Alabama</DropdownItem>
                              <DropdownItem onClick={this.select} value="AK">Alaska</DropdownItem>
                              <DropdownItem onClick={this.select} value="AZ">Arizona</DropdownItem>
                              <DropdownItem onClick={this.select} selected value="AR">Arkansas</DropdownItem>
                              <DropdownItem onClick={this.select} value="CA">California</DropdownItem>
                              <DropdownItem onClick={this.select} value="CO">Colorado</DropdownItem>
                              <DropdownItem onClick={this.select} value="CT">Connecticut</DropdownItem>
                              <DropdownItem onClick={this.select} value="DE">Delaware</DropdownItem>
                              <DropdownItem onClick={this.select} value="DC">District Of Columbia</DropdownItem>
                              <DropdownItem onClick={this.select} value="FL">Florida</DropdownItem>
                              <DropdownItem onClick={this.select} value="GA">Georgia</DropdownItem>
                              <DropdownItem onClick={this.select} value="HI">Hawaii</DropdownItem>
                              <DropdownItem onClick={this.select} value="ID">Idaho</DropdownItem>
                              <DropdownItem onClick={this.select} value="IL">Illinois</DropdownItem>
                              <DropdownItem onClick={this.select} value="IN">Indiana</DropdownItem>
                              <DropdownItem onClick={this.select} value="IA">Iowa</DropdownItem>
                              <DropdownItem onClick={this.select} value="KS">Kansas</DropdownItem>
                              <DropdownItem onClick={this.select} value="KY">Kentucky</DropdownItem>
                              <DropdownItem onClick={this.select} value="LA">Louisiana</DropdownItem>
                              <DropdownItem onClick={this.select} value="ME">Maine</DropdownItem>
                              <DropdownItem onClick={this.select} value="MD">Maryland</DropdownItem>
                              <DropdownItem onClick={this.select} value="MA">Massachusetts</DropdownItem>
                              <DropdownItem onClick={this.select} value="MI">Michigan</DropdownItem>
                              <DropdownItem onClick={this.select} value="MN">Minnesota</DropdownItem>
                              <DropdownItem onClick={this.select} value="MS">Mississippi</DropdownItem>
                              <DropdownItem onClick={this.select} value="MO">Missouri</DropdownItem>
                              <DropdownItem onClick={this.select} value="MT">Montana</DropdownItem>
                              <DropdownItem onClick={this.select} value="NE">Nebraska</DropdownItem>
                              <DropdownItem onClick={this.select} value="NV">Nevada</DropdownItem>
                              <DropdownItem onClick={this.select} value="NH">New Hampshire</DropdownItem>
                              <DropdownItem onClick={this.select} value="NJ">New Jersey</DropdownItem>
                              <DropdownItem onClick={this.select} value="NM">New Mexico</DropdownItem>
                              <DropdownItem onClick={this.select} value="NY">New York</DropdownItem>
                              <DropdownItem onClick={this.select} value="NC">North Carolina</DropdownItem>
                              <DropdownItem onClick={this.select} value="ND">North Dakota</DropdownItem>
                              <DropdownItem onClick={this.select} value="OH">Ohio</DropdownItem>
                              <DropdownItem onClick={this.select} value="OK">Oklahoma</DropdownItem>
                              <DropdownItem onClick={this.select} value="OR">Oregon</DropdownItem>
                              <DropdownItem onClick={this.select} value="PA">Pennsylvania</DropdownItem>
                              <DropdownItem onClick={this.select} value="RI">Rhode Island</DropdownItem>
                              <DropdownItem onClick={this.select} value="SC">South Carolina</DropdownItem>
                              <DropdownItem onClick={this.select} value="SD">South Dakota</DropdownItem>
                              <DropdownItem onClick={this.select} value="TN">Tennessee</DropdownItem>
                              <DropdownItem onClick={this.select} value="TX">Texas</DropdownItem>
                              <DropdownItem onClick={this.select} value="UT">Utah</DropdownItem>
                              <DropdownItem onClick={this.select} value="VT">Vermont</DropdownItem>
                              <DropdownItem onClick={this.select} value="VA">Virginia</DropdownItem>
                              <DropdownItem onClick={this.select} value="WA">Washington</DropdownItem>
                              <DropdownItem onClick={this.select} value="WV">West Virginia</DropdownItem>
                              <DropdownItem onClick={this.select} value="WI">Wisconsin</DropdownItem>
                              <DropdownItem onClick={this.select} value="WY">Wyoming</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                          {generateDisable && (
                            <div>
                              <Button
                               className="md-primary md-raised md-accent md-button"
                               outline 
                               color="primary" 
                               onClick={this.onClickShowTable} 
                               >
                               Generate Report
                               </Button>
                               {' '}
                            </div>
                          ) }
                        </div>
                        {showTable && (
                          <Table>
                            <thead>
                              <tr>{tableHead}</tr>
                            </thead>
                            <tbody>
                              {tableBody}
                            </tbody>
                          </Table>
                        ) }
                        {/* <button
                          className="md-primary md-raised md-accent md-button"
                          type="submit"
                        >  Submit
                    </button> */}
                      </div>
                      {(dataModaldetails.destination.file_type === 'pdf') && 
                      <div id="menu2" className="tab-pane fade">
                        <div className="requestor_period-state">
                          {pdfContextPara}
                        </div>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DataCatalogModal;
