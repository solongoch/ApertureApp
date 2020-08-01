import React, { Component } from 'react';
import './single-post.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendComment } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup';

class PostComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: '',
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

    const comment = {commentBody: this.state.commentBody};

    this.props.sendComment(postid);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  render() {
    const {errors} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="Add a comment..."
          name="comment"
          value={this.state.commentBody}
          onChange={this.onChange}
          error={errors.commentBody}
          info="" />
        <button className="btn btn-primary col-12" type="submit">Post Comment</button>
      </form>
    );
  }
}

PostComment.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {sendComment})(withRouter(PostComment)
);
