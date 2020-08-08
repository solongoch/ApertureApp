import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
// import Action
import { getProfileByUsername } from '../../actions/profileActions';
// import CSS
import './navbar.css';
import PropTypes from "prop-types";

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
      var currentUsername = this.props.auth.user.username;
      this.props.getProfileByUsername(this.state.search, currentUsername, this.props.history);
      //after api call clear search box
      this.setState({ search: '' })
    }
  }

  render() {
    const { search } = this.state;
    return (
      <div className="search-div col-lg-4 col-md-4 col-sm-4">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <input
            id="search"
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={this.onChange}
          />
        </form>
      </div>
    )
  }
}


searchProfile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { getProfileByUsername })(withRouter(searchProfile));