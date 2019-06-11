import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import SideNav from './SideNav'
import { Route} from 'react-router-dom';
import Noteparagraphs from './NoteParagraphs';

class Notebook extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                <div >
                    <Col md={2}>
                        <SideNav />
                    </Col>
                    <Col md={10}>
                    {/*<Route exact path="/notebook/:id" component={Noteparagraphs}/>*/}
                    </Col>
                </div>
            </div>

        );
    }
}
export default Notebook;