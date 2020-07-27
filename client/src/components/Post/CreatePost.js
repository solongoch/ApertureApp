import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './createpost.css';
import classNames from 'classnames';
import uploadImage from '../utils';
//import connect used to talk to the redux store 
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions'

toast.configure();
export class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      caption: '',
      file: '',
      photo: '',
      imagePreview: '',
      errors: {},
      submitDisabled: true,
      toastopts: {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 1
      }
    };

    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
  }

  // set caption in state on its Onchange
  handleCaption = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Read the file and set it in state
  handleImageChange(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    //result is the o/p of reader object.
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreview: reader.result,
        submitDisabled: !this.state.submitDisabled//share button is disabled before uploading image.
      });
    }
  }
  handleSubmitPost(e) {
    e.preventDefault();
    const { file } = this.state;
    uploadImage(file)
      .then((res) => {
        this.setState({ photo: res.secure_url });
        const { caption, photo } = this.state;
        const newPost = {
          caption,
          photo
        }

        this.props.createPost(newPost)

      });
  }



  componentWillReceiveProps(newProps) {

    alert(this.props.post.success)

    if (this.props.post.success) {
      toast.success('Posted Successfully', this.state.toastopts)
    }
    if (newProps.errors) {
      this.setState({ errors: newProps.errors })
      toast.error(this.state.errros, this.state.toastopts);
    }

  }

  render() {
    const { user } = this.props.auth
    let previewImage = null;
    let { imagePreview, errors, submitDisabled } = this.state;
    if (imagePreview) {
      previewImage = (<img src={imagePreview} className="image-fluid" alt="UserImage" style={{ width: '100%' }} />);
    } else {
      previewImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="card create-postcard shadow-lg col-11 col-sm-9 col-md-10 col-lg-10">
        <div className="card-header newpost-header">
          <Link to="/home">
            <i className="fa fa-times post-cancel" style={{ float: 'right' }} aria-hidden="true"></i>
          </Link>
          New Photo Post
        </div>
        <hr className="post-hr" />
        <form className="createpost-form row" onSubmit={this.handleSubmitPost}>
          <div className="form-group createpost_formgrp">
            <div className="input-group mb-3">
              <img src={user.avatar} alt="Avatar" className='userpost-avatar ' />
              <textarea rows='2'
                placeholder="Write a caption..."
                className={classNames('form-control  rounded caption col-11 col-sm-9 col-md-10 col-lg-10', { 'is-invalid': errors.caption })}
                type="text"
                name="caption"
                value={this.state.caption}
                onChange={this.handleCaption} />
            </div>
            <div className=" form-inline row upload-image text-center">
              <label className="fa fa-file-image-o">
                <input type="file" hidden onChange={this.handleImageChange}
                  name='photo' className={classNames({ 'is-invalid': errors.photo })} />
              </label>
              <button className="btn btn-primary shadow-none btn-submitpost" disabled={submitDisabled}>Share</button>
            </div>
          </div>
        </form>
        <div className="imgPreview">
          {previewImage}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.errors
})

export default connect(mapStateToProps, { createPost })(CreatePost);