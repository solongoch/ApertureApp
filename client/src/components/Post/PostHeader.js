import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
// import CSS
import './single-post.css';
// import images
import post from '../../image/img-sq.jpg';

class PostHeader extends Component {
  render() {
    const {auth} = this.props;
    return (

        <div className="post-header">
        <Link to="/profile">
          <img className="round-image image-32" src={auth.user.avatar} alt="Post author" />
        </Link>
        <div className="d-flex flex-column left-15">
          <div className="font-weight-bold">
            <Link to="/profile">auth.user.name</Link>
          </div>
          {/* <div><Link to="/">Location</Link></div> */}
        </div>
      </div> 
      
    )
  }
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, null)(PostHeader);