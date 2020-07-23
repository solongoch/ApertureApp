import React, { Component } from 'react';
import logoImage from "../../image/avatar.png";
import {Link} from 'react-router-dom'
import '../css/createpost.css';
// import cloudniary from '../config/Keys';
import axios from 'axios';
import classNames from 'classnames';
import uploadImage from '../utils';

export class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      caption: '',
      file: '',
      photo:'',
      imagePreview: '',
      errors: {},
      submitDisabled: true
    };

    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleCaption = this.handleCaption.bind(this);
    // this.handleUploadImg = this.handleUploadImg.bind(this)
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
        const{file} = this.state;      
        uploadImage(file)
          .then((res) => {
            this.setState({photo : res.secure_url});
            const {caption,photo} = this.state;
            const newPost ={
              caption,
              photo
            }
            console.log(newPost);
            //API call to MongoDB to Create Post
            axios.post('/api/posts/create', newPost)
                .then(res =>{ 
                    const post = res.data;
                    console.log('Your post has been submitted successfully' , post);
                  })
                .catch(err =>{ this.setState({errors: err.response.data})});
        });

        // this.setState({ photo: uploadImage(this.state.file)  });
     
  }

  render() {

    let previewImage = null;
    let { imagePreview,errors,submitDisabled } = this.state;
    if (imagePreview) {
      previewImage = (<img src={imagePreview} className="image-fluid" alt="UserImage" style={{ width: '100%' }} />);
    } else {
      previewImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="card create-postcard shadow-lg col-11 col-sm-9 col-md-10 col-lg-10">
        <div className="card-header newpost-header">
          <Link to="/home">
              <i className="fa fa-times post-cancel" style={{float:'right'}}aria-hidden="true"></i>
          </Link>
          New Photo Post
        </div>
        <hr className="post-hr"/>
        <form className="createpost-form row" onSubmit={this.handleSubmitPost}>
          <div className="form-group createpost_formgrp">
            <div className="input-group mb-3">
              <img src={logoImage} alt="Avatar" className='userpost-avatar ' />
              <textarea rows='2'
                placeholder="Write a caption..."
                className= { classNames('form-control  rounded caption col-11 col-sm-9 col-md-10 col-lg-10' , {'is-invalid' : errors.caption }) }
                type="text"
                name="caption"
                value={this.state.caption}
                onChange={this.handleCaption} />
            </div>
            <div className=" form-inline row upload-image text-center">
              <label className="fa fa-file-image-o">
                <input type="file" hidden onChange={this.handleImageChange}
                    name='photo' className={classNames({'is-invalid': errors.photo})} />
              </label>
              <button className="btn btn-primary shadow-none btn-submitpost" disabled ={submitDisabled}>Share</button>
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

export default CreatePost;
