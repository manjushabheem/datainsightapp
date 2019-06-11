import React, { Component } from 'react';
import { Nav, NavItem, Button, Modal, FormGroup, FormControl, Form, ButtonToolbar} from 'react-bootstrap';
import axios from 'axios';

class SideNav extends Component {
    constructor(props, context) {
        super(props, context);


        this.handleShow = this.handleShow.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }
    state = {
        folder: [],
        files: [ { name: 'Varun', id: 1 }, { name: 'Raj', id: 2 }, { name: 'Rahul', id: 3 } ],
        show: false,
        note: '',
    }
    handleHide() {
        this.setState({ show: false });
    }
    handleShow() {
        this.setState({ show: true });
    }
    handleSave() {
        console.log(this.state.note);
        // axios.post(`http://35.190.187.2:9090/api/notebook`, { "name": this.state.note })
        //     .then(res => {
        //         console.log(res.data);
        //         this.setState({ show: false });
        //         this.forceUpdate();
        //     })
        const id = this.state.files.length + 1;
        const file = {
            name: this.state.note,
            id: id,
        };
        const value = this.state.files.concat(file);
        this.setState({ files: value });
        this.setState({ show: false });
        //         this.forceUpdate();

    }

    handleChange(event) {
        console.log(event.target.name, event.target.value);
        this.setState({ note: event.target.value });

    }
  openNote(data,e) {
    // axios.get(`http://35.190.187.2:9090/api/notebook/`+data).then(res =>{
    //   if(res.status ===200){
    //     console.log(res);
    //   }
    // })
  }

//   componentWillMount() {
//     axios.get(`http://35.190.187.2:9090/api/notebook`)
//       .then(res => {
//         if (res.status === 200) {
//           var response = res.data.body;
//           var i;
//           for (i = 0; i <= response.length - 1; i++) {
//             if (response[i].name.includes("/")) {
//               let path = response[i].name;
//               if (path.startsWith("/")) {
//                 const pathnames = path.split("/");
//                 if (pathnames[2] !== "" && pathnames[2] !== undefined) {
//                   //   if (pathnames.length > 3) {
//                   //     if (this.state.folder.length > 0) {
//                   //       var j;
//                   //       let match;
//                   //       let index;
//                   //       for (j = 0; j <= this.state.folder.length - 1; j++) {
//                   //         if (pathnames[1] === this.state.folder[j].folderName){
//                   //             match = true;
//                   //             index = j;
//                   //             break;
//                   //         }
//                   //         else{
//                   //           match = false;
//                   //         }

//                   //       }
//                   //       if (match === true) {
//                   //         const file = {
//                   //           fileName: pathnames[2],
//                   //           id: response[i].id
//                   //         }
//                   //         this.state.folder[index].files.push(file);
//                   //       }
//                   //       else {
//                   //         const folder = {
//                   //           folderName: pathnames[1],
//                   //           files: [{
//                   //             fileName: pathnames[2],
//                   //             id: response[i].id
//                   //           }]
//                   //         }
//                   //         this.state.folder.push(folder);
//                   //       }
//                   //     }
//                   //   else {
//                   //     const folder = {
//                   //       folderName: pathnames[1],
//                   //       files: [{
//                   //         fileName: pathnames[2],
//                   //         id: response[i].id
//                   //       }]
//                   //     }
//                   //     this.state.folder.push(folder);
//                   //   }

//                   // }else{}
//                 } else {
//                   const file = {
//                     name: pathnames[1],
//                     id: response[i].id
//                   };
//                   const value = this.state.files.concat(file);
//                   this.setState({ files: value });
//                 }
//               }
//               else {
//                 const pathnames = path.split("/");
//                 if (pathnames[1] !== "" && pathnames[1] !== undefined) {

//                 } else {
//                   const file = {
//                     name: pathnames[0],
//                     id: response[i].id
//                   };
//                   const value = this.state.files.concat(file);
//                   this.setState({ files: value });
//                 }

//               }
//             }
//             else {
//               const value = this.state.files.concat(response[i]);
//               this.setState({ files: value });
//             }

//           }
//           console.log(this.state.folder);
//           console.log(this.state.files);
//         }
//         else {

//         }
//       })
//   }
  render() {
    const folders = this.state.files.map( (files) => {
      let onItemClick = this.openNote.bind(this,files.id);
      return (
        <NavItem key={files.id} href={'/notebook/'+files.id} onClick={onItemClick}>
          {files.name}
        </NavItem>
      );
    });
    return (
<div>
      <Nav>
      <NavItem key={0} onClick={this.handleShow}>
         Create Note
        </NavItem>
        {folders}
      </Nav>
                <Modal className="modal-container" style={{ height: 400 }}
                show={this.state.show}
                onHide={this.handleHide}
                // container={this}
                aria-labelledby="contained-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Enter Name of Note **
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup controlId="formBasicText">

                            <FormControl
                                type="text"
                                value={this.state.value}
                                name="noteName"
                                placeholder="Enter name of the NoteBook"
                                onChange={this.handleChange}
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
    );
  }
}

export default SideNav;