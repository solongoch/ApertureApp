import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
import axios from 'axios';
// import CSS
import './navbar.css';

class searchProfile extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // TODO: use getProfileByUsername action
    this.props.getProfileByUsername(this.state.search, this.props.history);
    // axios.get(`/api/profile/${this.state.search}`)
    //   .then(res => 
    //     this.props.history.push(`/profile/${this.state.search}`)
    //   )
    //   .catch(err => {
    //     this.props.history.push("/not-found");
    //   });
  }

  render() {
    return (
      <div className="search-div col-lg-4 col-md-4 col-sm-4">
        <form className="form-inline" onSubmit={this.onSubmit}>
          {/* <i className="fas fa-search" aria-hidden="true"></i> */}
          <input
            id="search"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
          />
        </form>
      </div>
    )
  }
}

export default connect(null, { getProfileByUsername })(withRouter(searchProfile));