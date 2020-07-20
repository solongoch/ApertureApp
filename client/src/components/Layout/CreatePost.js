import React, { Component } from 'react';
import logoImage from "../../image/avatar.png";
import '../css/CreatePost.css';
import cloudniary from '../config/key';
import axios from 'axios';
import classNames from 'classnames';

export class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      caption: '',
      file: '',
      photo:'',
      imagePreviewUrl: '',
      errors: {},
      submitDisabled: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
        imagePreviewUrl: reader.result,
        submitDisabled: !this.state.submitDisabled//share button is disabled before uploading image.
      });
    }
  }

  handleUploadImg(){
    //upload file in cloudniary
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('upload_preset', cloudniary.UPLOAD_PRESET);
    formData.append('cloud_name', cloudniary.CLOUD_NAME);

    const opts = {
      method: 'POST',
      body: formData,
    };

    fetch(cloudniary.URL, opts)
      .then(response => response.json())
      .then(res => {
        //set secure_url to photo state to send DB
        this.setState({ photo: res.secure_url });
        const {caption,photo} = this.state;
        const newPost ={
          caption,
          photo
        }
        console.log(newPost);
        //API call to MongoDB to Create Post
        axios.post('/api/posts/create', newPost)
             .then(res =>{ console.log(res.data)})
             .catch(err =>{ this.setState({errors: err.response.data})});
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }


 // form submit
  handleSubmit(e) {
    e.preventDefault();
    this.handleUploadImg();
    // TODO: do something with -> this.state.file
    // console.log('handle uploading-', this.state.photo);
     
  }

  render() {

    let previewImage = null;
    let { imagePreviewUrl,errors,submitDisabled } = this.state;
    if (imagePreviewUrl) {
      previewImage = (<img src={imagePreviewUrl} className="image-fluid" alt="UserImage" style={{ width: '100%' }} />);
    } else {
      previewImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="card shadow-lg">
        <div className="card-header">New Photo Post</div>
        <form className="createpost-form row" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group mb-3">
              <img src={logoImage} alt="Avatar" className='user-avatar' />
              <textarea rows='2'
                placeholder="Write a caption..."
                className= { classNames('form-control caption' , {'is-invalid' : errors.caption }) }
                type="text"
                name="caption"
                value={this.state.caption}
                onChange={this.handleCaption} />
            </div>
            <div className=" form-inline row upload-image ">
              <label className="fa fa-file-image-o ">
                <input type="file" hidden onChange={this.handleImageChange}
                    name='photo' className={classNames({'is-invalid': errors.photo})} />
              </label>
              <button className="btn btn-primary shadow-none" disabled ={submitDisabled}>Share</button>
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
