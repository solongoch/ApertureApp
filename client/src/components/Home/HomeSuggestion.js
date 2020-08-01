import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getSuggestedProfiles } from '../../actions/suggestionActions'

class HomeSuggestion extends Component {
  componentDidMount() {
    this.props.getSuggestedProfiles();
  }
  render() {
    const {suggestions} = this.props.profile;
    if (!suggestions) {
      return null
    }
    // const suggestedAccounts = suggestions.map(suggestion => {})
    return (
      <div>
        <div className="d-flex justify-content-between">
          <span className="font-weight-bold">Suggestions For You</span>
          <Link to="/suggestion" className="font-weight-bold">See all</Link>
        </div>
        {/* Map throught suggestions to get each profile */}
        {suggestions.map(suggestion => 
          (<div className="d-flex justify-content-between align-items-center" key={Math.random()}>
            <div className="profile-section">
              <Link to="/">
                <img className="round-image image-32" src={suggestion.avatar} alt="User" />
              </Link>
              <div>
                <div className="font-weight-bold left-15"><Link to="/">{suggestion.username}</Link></div>
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

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getSuggestedProfiles })(withRouter(HomeSuggestion));