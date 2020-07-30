import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    this.props.history.push(`/profile/${this.state.search}`);
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

export default withRouter(searchProfile);