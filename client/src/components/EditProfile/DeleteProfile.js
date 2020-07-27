import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/createprofile.css';
import {Alert, Collapse, Card, CardBody } from 'reactstrap';


class DeleteProfile extends Component {
    constructor() {
        super();
        this.state = {
          visible: false,
        }
    }
    
    
      toggle() {
        this.setState({
          visible: ! this.state.visible
        });
      }
    
    

    render() {

        return (
            <div className="form-group">
              <label className="col-md-3 control-label"></label>
                <div className="col-md-10">
                    <div className="has-separator">Terminate Account</div>
                        <button className="btn btn-lg btn-danger btn-info delete mr-2" onClick={this.toggle.bind(this)}>Delete Account</button>
                         <Collapse isOpen={this.state.visible} toggle={this.toggle.bind(this)}>
                          <Card>
                          <CardBody >
                          <Alert color="danger">Are you sure you want to delete your account?</Alert>
                          <Link to="/remove" className="btn btn-lg btn-info mr-2 btn-danger delete">Confirm Delete Account</Link>
                          </CardBody>
                          </Card>
                      </Collapse>
                    </div>
                </div>
                      
        );
    }
}
    
export default DeleteProfile;