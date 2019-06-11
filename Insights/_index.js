import React, { Component } from 'react';
import {DropdownButton,SplitButton,MenuItem,Glyphicon, Table, Form, Checkbox, Button, FormControl, Modal, ButtonToolbar, FormGroup, Breadcrumb} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router';
import ConnectionsList from '../Connections/_index';

export default class DataProvisionD extends Component{



    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleMenuItem = this.handleMenuItem.bind(this);
        this.handleHideMenu = this.handleHideMenu.bind(this);
    
        
        this.state = {
          show: false,
          showMenu : false,
        };
      }


      handleHideMenu(){
        this.setState({ showMenu: false }); 
      }
      handleSubmit() {
        this.setState({ show: true });
      }

      handleMenuItem()
        {
          this.setState({ showMenu: true });
        }
      

      handleHide() {
        this.setState({ show: false });
      }
      handleShow() {
        this.setState({ show: true });
      }
      handleSave() {
        this.setState({ show: false });
         
          }

    render(){
        return (
            <div>
                
           <Breadcrumb style ={{padding:'15px', float:'left', width:'100%'}}>
           
          
  <Breadcrumb.Item href="#">Create</Breadcrumb.Item>
  <Breadcrumb.Item href="#">
   Data Insights
  </Breadcrumb.Item>
  
</Breadcrumb>
<Table striped bordered condensed hover>
  <thead style={{backgroundColor:'black', color:'white', padding: '5px', marginBottom:'10px'}}>
 
    <tr>
      <th>Select</th>
      <th>Name</th>
      <th>Source</th>
      <th>SourceType</th>
      <th>Tags</th>
      <th>Datasets</th>
      <th>Create  +</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
          <Checkbox style={{width:'5px' ,height:'5px'}}>
          </Checkbox>
          </td>
      <td>Test UC 2</td>
      <td>Tax</td>
      <td>PLX</td>
      <td>test</td>
    
      <td><ButtonToolbar><Button bsStyle='success' onClick = {this.handleSubmit}>Submit</Button><Button bsStyle='success'>View</Button></ButtonToolbar></td>
     <td ><DropdownButton 
      title='Choose'
      id='dropdown-basic'>
       
     <MenuItem eventKey="1" onClick = {this.handleMenuItem}>Classification

     
  
     </MenuItem>
     
      <MenuItem eventKey="2" >Prediction</MenuItem>
      <MenuItem eventKey="3">Time Series</MenuItem>
       
       
       
       </DropdownButton></td>
    </tr>
    <tr>
      <td> <Checkbox style={{width:'5px' ,height:'5px'}}>
          </Checkbox></td>
      <td>IOC Mapping_114</td>
      <td>Tax</td>
      <td>File Upload</td>
      <td>Test,</td>
      <td><ButtonToolbar><Button bsStyle='success' onClick = {this.handleSubmit}>Submit</Button><Button bsStyle='success'>View</Button></ButtonToolbar></td>
      <td> <DropdownButton 
      title='Choose'
      id='dropdown-basic'>
       
       <MenuItem eventKey="1" onClick = {this.handleMenuItem}>Classification

     
  
</MenuItem>
     
      <MenuItem eventKey="2">Prediction</MenuItem>
      <MenuItem eventKey="3">Time Series</MenuItem>
       
       
       
       </DropdownButton></td>
    </tr>
    </tbody>
</Table>


  <div className="modal-container" style={{ height: 200 }}>
      

      <Modal
        show={this.state.show}
        onHide={this.handleHide}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
           Enter the Following Fields
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <FormGroup controlId="formBasicText">
        
        <FormControl
          type="text"
          value={this.state.value}
          name = "cname"
          placeholder="Enter Username"
          onChange ={this.handleChange}
       />
        <br/>
         <FormControl
          type="text"
          value={this.state.value}
          name = "method"
          placeholder="Method Name"
          onChange ={this.handleMethod}
        />
         <br/>
         <FormControl
          type="password"
          value={this.state.value}
          name = "hostname"
          placeholder="Enter Password"
          onChange ={this.handleHost}
        />
         
        
        
      </FormGroup>
    </Form>
        </Modal.Body>
        <Modal.Footer>
            <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
          <Button onClick={this.handleHide}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>




      
         
          </div>


          <div className="modal-container" style={{ height: 200 }}>
      

      <Modal
        show={this.state.showMenu}
        onHide={this.handleHideMenu}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
        Please Choose one of the following Classification Algorithms
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
      
       <DropdownButton title='SELECT' style={{ color: 'white', backgroundColor: 'grey'}}>
      <MenuItem eventKey="1" active>Customer Churn</MenuItem>
      <MenuItem eventKey="2">AXYZ</MenuItem>
      <MenuItem eventKey="3">ABC</MenuItem>
    </DropdownButton>
        <br/>
   

        </Modal.Body>
        <Modal.Footer>
            <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleHideMenu}>Save</Button>
          <Button onClick={this.handleHideMenu}>Close</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
         
          </div>
</div>
        )
    }
}
