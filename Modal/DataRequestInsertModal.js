import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DataRequestInsert from './dataRequestInsertForm';

class DataCatalogInsertModal extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      isTabDetail: true,
      isFormStep: '',
      isFormStep2: false,
    }
    this.createReqForm = this.createReqForm.bind(this)
    this.closeInsertModal = this.closeInsertModal.bind(this)    
  }  
  static propTypes = {
    history: PropTypes.object.isRequired,
    //details:PropTypes.object,
    //errModaldetails: PropTypes.srting,
    closeInsertModal:  PropTypes.func,
  }


  _setDetail = ( boolVal ) => {
    boolVal !== this.state.isTabDetail && this.setState( { isTabDetail: boolVal } )
    return
  }

  createReqForm( step ) {    
    this.setState( { isFormStep: step} );
  }

  closeInsertModal( step ) {    
    this.props.closeInsertModal();
  }

  render() {
    const { isFormStep } = this.state;  
    return (
      <div className="dcModal">
        <div className="row">
          <div className="column sm-100 md-100 modal-header">
            <div className="welcome-content layout-align-start-center layout-column">              
              <div className="welcome-landing-actions layout-align-center-center layout-column">               
                <DataRequestInsert closeInsertModal={this.closeInsertModal} history={this.props.history}/>              
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DataCatalogInsertModal;
