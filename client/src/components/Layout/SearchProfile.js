import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
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

  // when user provided non-empty username as an input, redirect user to the profile with that username
  onSubmit(e) {
    e.preventDefault();
    if (!isEmpty(this.state.search)) {
      this.props.getProfileByUsername(this.state.search, this.props.history);
    }
  }

  render() {
    return (
      <div className="search-div col-lg-4 col-md-4 col-sm-4">
        <form className="form-inline" onSubmit={this.onSubmit}>
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