import React, { Component } from 'react';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button,Col, ButtonToolbar, Modal } from 'react-bootstrap'
import axios from 'axios';
import { Redirect, Router } from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form'
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import renderField from '../CommonComponents/RenderField';
import renderSelect from '../CommonComponents/renderSelect';
import RenderFile from '../CommonComponents/RenderFile';
import RenderCheckbox from '../CommonComponents/RenderCheckbox';
import RenderTagInput from '../Modal/inputTags';


export default class ImportNote extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.createReqForm = this.createReqForm.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);
    
        this.state = {
          show: true,
          note : '',
          isFormStep: 'step1',
          isFormstep3: false,
          fileData: [],
          insertMsg: '',
          errMsg: '',
          disableBtn: true,
          formName: 'csv',
          tagData: [],
        };
      }
      static propTypes = {
        history: PropTypes.object.isRequired,
        input: PropTypes.object,
        // handleSubmit: PropTypes.func,
        // pristine: PropTypes.bool,
        // submitting: PropTypes.bool,
        // closeInsertModal: PropTypes.func,
    };

    //   handleUpload(){
      
    
    // }

    createReqForm(step) {
      let formType = 'csv';
      if (step === 'step1') {
          formType = 'csv';          
      } else if (step === 'step2') {
          formType = 'reconciliation';            
      } else if (step === 'step3') {
          formType = 'location_code';          
      }
      this.setState({
          isFormStep: step,
          formName: formType,
          fileData: [],
          fileUploadOne: '',
          fileUploadTwo: '',
          fileUploadThree: '',
      });      
  }

  onFileChange(name, file, filter) {

      if ( file === 'disable' ) {

          this.setState( {
              disableBtn: true,
              fileData: [],
          } )

      } else {

          if (filter === 'csv' ) {

              if (name === 'file_1') {
                  this.setState({
                      fileData: [
                          file,
                      ],
                      disableBtn: false,
                  })
              }
              
          } else {
              
              if (name === 'file_1') {
                  this.setState({
                      fileUploadOne: '',
                  });
                  this.setState({
                      fileUploadOne: file,
                      disableBtn: false,
                  });
              }
              if (name === 'file_2') {
                  this.setState({
                      fileUploadTwo: '',
                  });
                  this.setState({
                      fileUploadTwo: file,
                      disableBtn: false,
                  });
              }
              if (name === 'file_3') {
                  this.setState({
                      fileUploadThree: '',
                  });
                  this.setState({
                      fileUploadThree: file,
                      disableBtn: false,
                  });
              }
              
          }

      }
      
  }

  onTagSelect(inputValues) {
      this.setState({
          tagData: [ ...this.state.tagData, inputValues ],
      })
  }

    
    
    
    
    
    
    
    handleHide() {
        this.setState({ show: false });
      }

      handleSave(values) {
      //   console.log(this.state.note);
      //   axios.post(``, {'name': this.state.note})
      // .then(res => {
      //   console.log(res.data);
      let tagDataArray = [];
        tagDataArray.push(this.state.fileUploadOne);
        tagDataArray.push(this.state.fileUploadTwo);
        tagDataArray.push(this.state.fileUploadThree);

        let data = new FormData();
        data.append('login_user_name', Utils.getLocalStorage('fullname'))
        data.append('login_ldapid', Utils.getLocalStorage('ldapid'))
        data.append('req_name', values.req_name)
        if (values.req_source_type) {
            data.append('req_source_type', 'file')
        }
        if (values.req_type) {
            data.append('req_type', values.req_type)
        }       
        
        //data.append('req_tags', values.req_tag)
        data.append('form_name', this.state.formName)
        if (this.state.tagData && this.state.tagData.length > 0) {
            data.append('req_tags', this.state.tagData)
        }

        let file = [ 0, 1, 2 ];
        if (this.state.fileData && this.state.fileData.length > 0) {
            this.state.fileData.map(function (item, i) {
                console.log('item_if', item);
                data.append(file[i], item)
            })
        } else {
            tagDataArray.map(function (item, i) {
                console.log('item_else', item);
                data.append(file[i], item)
            })
        }

        this.setState({
            fileData: [],
        });
        //let insertValues = reqBody;
        fetch(`${Utils.getApiBaseUrl()}/newrequest`, {
            //Utils.getPostOptions( insertValues ),
            method: 'POST',
            body: data,       
        }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.isSuccess) {
                //console.log('data', data);
                this.setState({ insertMsg: 'New Request has been submitted' });
                
                this.props.history.push('/my-request')           
            } else {
                this.setState({ insertMsg: 'Upload Error. Please Try Again' });
            }
        });
        this.setState({ show: false });
        
        
      // })
      }

      handleChange(event){
        console.log(event.target.name, event.target.value);
        this.setState({note:event.target.value});
        
     
    }
    render()
    {
      const { isFormStep, insertMsg, tags, suggestions, disableBtn, tagData } = this.state;
      
        return (
          
                <div className="modal-container" style={{ height: 200 }}>
        {/* <Button
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.setState({ show: true })}
        >
          Launch contained modal
        </Button> */}
        
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
             Import CSV File 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
        <FormGroup controlId="formBasicText">
          
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter name of the file to upload"
            component={renderField}
            onChange ={this.handleChange}
            required
            name="req_name"/>
          <br/>
          <br/>
         <FormControl type="file" name="file_1" component={RenderFile} accept = ".csv" placeholder="Name" required filter="csv" /> 
        </FormGroup>
      </Form>
          </Modal.Body>
          <Modal.Footer>
              <ButtonToolbar>
          <Button bsStyle="primary" onClick ={this.handleSave}>Save Upload</Button>
            <Button onClick={this.handleHide}>Close</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
           
            </div>
        )
    }
}