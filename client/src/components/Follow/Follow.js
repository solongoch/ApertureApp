import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Action
import { followUser } from '../../actions/profileActions';

class Follow extends Component {
  constructor() {
    super();
    
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.followUser(this.props.userId);
  }

  render() {
    return (
      <div>
        <button className="log-in-button blue-bg button font-weight-bold follow" onClick={this.onClick}>
          Follow
        </button>
      </div>
    )
  }
}

export default connect(null, {followUser})(Follow);