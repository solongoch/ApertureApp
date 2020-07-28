import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './createprofile.css';
import { Alert, Collapse, Card, CardBody } from 'reactstrap';


class DeleteProfile extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    }
  }


  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }



  render() {

    return (
      <div className="form-group">
        <label className="col-md-3 control-label"></label>
        <div className="col-md-10">
          <button className="btn btn-danger mr-2" onClick={this.toggle.bind(this)}>Delete Account</button>
          <Collapse isOpen={this.state.visible} toggle={this.toggle.bind(this)}>
            <Card>
              <CardBody >
                <Alert color="danger"><b>Are you sure you want to delete your account?</b></Alert>
                <Link to="/remove" className="btn btn-md mr-2 btn-danger">Confirm Delete Account</Link>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default DeleteProfile;