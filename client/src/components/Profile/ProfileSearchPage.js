import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Action
import { getSearchByUsername } from '../../actions/profileActions';
// import Components
import ProfileSearchHeader from './ProfileSearchHeader';
import ProfilePosts from './ProfilePosts';
// import CSS
import './profile.css';

class ProfileSearchPage extends Component {

  constructor(params) {
    super();
    this.state = {
      profile: {}

    }

  }

  componentDidMount() {
    this.props.getSearchByUsername(this.props.match.params.username, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.SearchProfileState) {
      this.setState({ profile: nextProps.SearchProfileState.posts })
    }
  }

  render() {

    if (this.props.SearchProfileState) {
      var _posts = this.props.SearchProfileState.posts;
      var _profilePosts;
      if (_posts.length > 0) {
        _profilePosts = <ProfilePosts posts={_posts} />
      } else {
        _profilePosts = (<div>
          <h1 className="text-center"><i className="fa fa-camera" /></h1>
          <h3 className="text-center"> No Posts Yet</h3>
        </div>)
      }
    }
    return (
      <div className="profile">



        <ProfileSearchHeader profile={this.props.SearchProfileState} />
        <div className="top-post-menu d-flex flex-row justify-content-center"></div>
        {_profilePosts}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  SearchProfileState: state.profile.searchedUserProfile
});

export default connect(mapStateToProps, { getSearchByUsername })(withRouter(ProfileSearchPage));