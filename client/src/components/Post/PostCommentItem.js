import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from "react-router-dom";
import './single-post.css';

class PostCommentItem extends Component {
    onDeleteClick(postId, commentId) {
      this.props.deleteComment(postId, commentId);
    }

render() {
    const { comment, postId, auth } = this.props;
    
    return (
    <div className="comment-div">
        <div>
          <Link to={`/profile/${comment.username}`}>
            <img
              className="round-image image-32 commentor-image"
              src={comment.avatar}
              alt="Post author"
            />
          </Link>
        </div>
        <div className="d-flex flex-column left-15">
          <div>
            <Link className="font-weight-bold" to={`/profile/${comment.username}`}>
              {comment.username}
            </Link>
            <div className="comment-text">
                {comment.commentBody}
                {comment.user === auth.user.id ? (
                    <button
                    onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                    type="button"
                    className="btn btn-danger btn-delete-comment"
                    >
                     <i className="fas fa-times fa-xs " />   
                    </button>
                ) : null}
                </div>
          </div>
        </div>
      </div>

        );
    }
}

PostCommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(PostCommentItem);