import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PropTypes from "prop-types";
// import Action
import { getSuggestedProfiles } from '../../actions/suggestionActions'

class HomeSuggestion extends Component {
  componentDidMount() {
    this.props.getSuggestedProfiles();
  }
  render() {
    const {suggestions} = this.props.profile;
    if (!suggestions) {
      return (<Spinner />)
    }
   
    return (
      <div>
        <div className="d-flex justify-content-between">
          <span className="font-weight-bold">Suggestions For You</span>
          <Link to="/suggestion" className="font-weight-bold">See all</Link>
        </div>
        {/* Map through suggestions to get each profile */}
        {suggestions.slice(0, 5).map(suggestion => 
          (<div className="d-flex justify-content-between align-items-center" key={suggestion._id}>
            <div className="profile-section">
              <Link to="/">
                <img className="round-image image-32" src={suggestion.avatar} alt="User" />
              </Link>
              <div>
                <div className="font-weight-bold left-15"><Link to={`/profile/${suggestion.username}`}>{suggestion.username}</Link></div>
                <div className="make-gray left-15">Followed by {suggestion.followers.length} people</div>
              </div>
            </div>
            <div className="sign-up-button font-weight-bold follow">Follow</div>
          </div>)
        )}
      </div>
    )
  }
}

HomeSuggestion.propTypes = {
  getSuggestedProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getSuggestedProfiles })(withRouter(HomeSuggestion));