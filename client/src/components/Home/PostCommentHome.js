import React, { Component } from "react";
import "../Post/single-post.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCommentHome } from "../../actions/homeActions";
import TextFieldGroup from "../common/TextFieldGroup";

class PostCommentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      commentBody: this.state.commentBody,
      username: user.username,
      avatar: user.avatar
    };

  this.props.addCommentHome(postId, newComment, this.props.history);
  this.setState({ commentBody: ''});

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const  {errors}  = this.state;
    
    return (
      <div className="add-comment-div">
        <form className="add-comment-form" onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Add a comment..."
            name="commentBody"
            value={this.state.commentBody}
            onChange={this.onChange}
            error={errors.commentBody}
            info=""
          />
          <button className="btn btn-primary col-12" type="submit">
            Add comment...
          </button>
        </form>
      </div>
    );
  }
}

PostCommentHome.propTypes = {

  addCommentHome: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { addCommentHome })((PostCommentHome));
