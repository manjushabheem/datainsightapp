
   import React, { Component } from 'react';
//    import axios from 'axios';
   import { Panel, Form, FormGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap'
   class Noteparagraphs extends Component {

         state ={
             id:'',
             para:[ {id:1, title:'', text:''},{id:2, title:'', text:''},{id:3, title:'', text:''} ],
         }
        //  componentWillMount() {
        //      var id = this.props.match.params.id;
        //      this.setState({id:id});
        //      axios.get(`http://35.190.187.2:9090/api/notebook/` + id).then(res => {
        //     if (res.status === 200) {
        //         var paragraphs = res.data.body.paragraphs;
        //         this.setState({para : paragraphs})
        //         console.log(this.state.para);
        //     }
        // });
        //  }
       render() {
        // const id = this.props.match.params.id;
        //      this.setState({id:id});
        // const para = this.state.para.map( (para) => {
        //     // let  onItemClick = this.openNote.bind(this,files.id);
        //     return (
        //         <Panel key={para.id}>
        //         <Panel.Title>
            
        //                 <div>
        //                 {para.title}
        //                 </div>
                    
        //             <div className='pull-right' style={{ padding: '5px' }}>
        //                 <ButtonToolbar>
        //                     <Button bsStyle='info' style={{ paddingRight: '10px' }}>Run</Button>

        //                     <Button bsStyle='info'>Clear</Button>
        //                 </ButtonToolbar>
        //             </div>
        //         </Panel.Title>
        //         <Panel.Body>
                    
        //             <Form>
        //                 <FormGroup controlId='formControlsTextarea'>
        //                     <FormControl componentClass='textarea' placeholder='textarea' value={para.text}/>
        //                 </FormGroup>
        //             </Form>
        //         </Panel.Body>
        //     </Panel>

            
           
        //     );
        //   });
           return (
               <div className='container-fluid'>
                {/* {para} */}
                   <Panel>
                        <Panel.Title>

                            <div className='pull-right' style={{ padding: '5px' }}>
                                <ButtonToolbar>
                                    <Button bsStyle='info' style={{ paddingRight: '10px' }}>Run</Button>

                                    <Button bsStyle='info'>Clear</Button>
                                </ButtonToolbar>
                            </div>
                        </Panel.Title>
                        <Panel.Body>
                            {/* <div>
                                <h3>{this.state.id}</h3>
                            </div> */}
                            <Form>
                                <FormGroup controlId='formControlsTextarea'>
                                    <FormControl componentClass='textarea' placeholder='textarea' />
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>

                    <Button className='btn btn-primary pull-right' >Add Paragraph</Button>
               </div>
   
           );
       }
   }
   
   export default Noteparagraphs;
   