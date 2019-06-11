import React, {Component} from 'react';
import {Button, Thumbnail,Image, Modal, ButtonToolbar, Form, FormControl, FormGroup, Col, View,Mask,Breadcrumb, Grid, Row} from 'react-bootstrap';
import workday from './Images/workday.png';
import mysqlnew from './Images/mysqlnew.png';
import couchnew from './Images/couchnew.png';
import hadoopn from './Images/hadoopn.png';
import sparkn from './Images/sparkn.jpg';
import powernew from './Images/powernew.jpg';
import axios from 'axios';


export default class ConnectionsList extends Component{

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleMethod = this.handleMethod.bind(this);
        this.handleHost = this.handleHost.bind(this);
        this.handlePort = this.handlePort.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleSave = this.handleSave.bind(this);
        
        this.state = {
          show: false,
          note :'',
          cname:'',
          method:'',
          hostname:'',
          port:'',
          username:'',
          password:'',        

        };
      }      
    
      handleHide() {
        this.setState({ show: false });
      }
      handleShow() {
        this.setState({ show: true });
      }
      
      handleSave() {
    //     console.log(this.state.note);
    //     axios.post(``, {'name': this.state.cname})
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ show: false });
        
    //   })
    this.setState({ show: false });
     
      }

      handleChange(event){
          console.log(event.target.name, event.target.value);
          this.setState({cname:event.target.value});
               
      }

      handleMethod(event){
          console.log(event.target.name, event.target.value);
          this.setState({method:event.target.value});
      }

      handleHost(event){
        console.log(event.target.name, event.target.value);
        this.setState({hostname:event.target.value});

      }

      handlePort(event){
        console.log(event.target.name, event.target.value);
        this.setState({port:event.target.value}); 
      }

      handleUserName(event){
        console.log(event.target.name, event.target.value);
        this.setState({username:event.target.value}); 
      }
      handlePassword(event){
        console.log(event.target.name, event.target.value);
        this.setState({password:event.target.value}); 
      }




    //   handleEmail( event ){
    //       this.setState( {cname: event.target.value} );
    //   }


    render(){
      console.log(this.props);
        return (
          
         <div >        
           <Breadcrumb style ={{padding:'15px', float:'left', width:'100%'}}>
           
          
  <Breadcrumb.Item href="#">Create</Breadcrumb.Item>
  <Breadcrumb.Item href="#">
    Connections
  </Breadcrumb.Item>
  
</Breadcrumb>
            <Grid>
              <Row>
          
             <Col xs={6} md={4}>
             
          {/* <Button bsStyle="link" className='pull-left' style={{marginTop: '40px', marginLeft:'40px'}} onClick={this.handleShow}> */}
         <Thumbnail src = {mysqlnew} >
         <h3>MySQL</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         
         </Col>
        
         <Col xs={6} md={4}>
         {/* <Button bsStyle="link" className='pull-right' style={{marginTop: '40px'}} onClick={this.handleShow}>
         <Image src = {workday} style ={{width:'70%',height:'208px'}}/>
         </Button> */}

         <Thumbnail src = {workday} >
         <h3>Workday</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         </Col>
      
             <Col xs={6} md={4}>
          {/* <Button bsStyle="link" className='pull-left' style={{marginTop: '40px', marginLeft:'20px'}} onClick={this.handleShow}>
         <Image src = {couch} style ={{width:'65%' ,height:'208px'}}/>
         </Button> */}

         <Thumbnail src = {couchnew} >
         <h3>Couchbase</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         </Col>
         </Row>
         </Grid>
         <Grid>
              <Row>
         <Col xs={6} md={4}>
         {/* <Button bsStyle="link" className='pull-left' style={{marginTop: '40px', margingRight:'100%'}} onClick={this.handleShow}>
         <Image src = {hadoopb} style ={{width:'75%',height:'208px'}}/>
         </Button> */}

         <Thumbnail src = {hadoopn} >
         <h3>Apache Hadoop</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         </Col>
         <Col xs={6} md={4}>
         {/* <Button bsStyle="link" className='pull-right' style={{marginTop: '40px'}} onClick={this.handleShow}>
         <Image src = {spark} style ={{width:'70%',height:'208px'}}/>
         </Button> */}
         <Thumbnail src = {sparkn} >
         <h3>Apache Spark</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         </Col>
         <Col xs={6} md={4}>
         {/* <Button bsStyle="link" className='pull-left' style={{marginTop: '40px'}} onClick={this.handleShow}>
         <Image src = {power} style ={{width:'55%',height:'208px'}}/>
         </Button> */}
         <Thumbnail src = {powernew} >
         <h3>Power BI</h3>
         <p>
         <Button bsStyle="primary" block onClick={this.handleShow}>Create</Button>
         {/* </Button> */}
         </p>
         </Thumbnail>
         </Col>
        </Row>
        </Grid>


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
          placeholder="Enter name of the Connection"
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
          type="text"
          value={this.state.value}
          name = "hostname"
          placeholder="HostName"
          onChange ={this.handleHost}
        />
         <br/>
         <FormControl
          type="text"
          value={this.state.value}
          name = "port"
          placeholder="Enter Port"
          onChange ={this.handlePort}
        />
        <br/>
         <FormControl
          type="text"
          value={this.state.value}
          name = "username"
          placeholder="Enter Username"
          onChange ={this.handleUserName}
        />
        <br/>
         <FormControl
          type="password"
          value={this.state.value}
          name = "password"
          placeholder="Enter Password"
          onChange ={this.handlePassword}
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

         </div> 
        )
    }
}
