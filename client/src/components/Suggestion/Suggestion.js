import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from '../common/Spinner'
// load CSS
import './suggestion.css';
// import Action
import { getSuggestedProfiles } from '../../actions/suggestionActions'

class Suggestion extends Component {
  componentDidMount() {
    this.props.getSuggestedProfiles();
  }

  render() {
    const {suggestions} = this.props.profile;
    if (!suggestions) {
      return (<Spinner />)
    }

    return (
      <div id="page-body">
        <div className="suggested-div">
          <span className="font-weight-bold">Suggested</span>
        </div>
        {/* Follower suggestion */}
        <div className="suggestions">
          {/* Map through suggestions to get each profile */}
          {suggestions.map(suggestion => (
            <div className="suggestion">
              <div className="post-header">
                <Link to={`/profile/${suggestion.username}`}>
                  <img className="round-image image-50" src={suggestion.avatar} alt="User" />
                </Link>
                <div>
                  <div className="username-div left-15 col-row-4 font-weight-bold">
                    <Link to={`/profile/${suggestion.username}`}>{suggestion.username}</Link>
                  </div>
                  <div className="left-15 col-row-4">{suggestion.name}</div>
                  <div className="make-gray left-15">Followed by {suggestion.followers.length} people</div>
                </div>
              </div>
              <Link className="log-in-button blue-bg button font-weight-bold follow" to="/">Follow</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getSuggestedProfiles })(Suggestion);