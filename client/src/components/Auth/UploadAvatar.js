import React, { Component } from 'react';
import staticImage from "../../image/instav.png";
import '../css/uploadavatar.css';
import cloudniary from '../config/key';
import axios from 'axios';

export class UploadAvatar extends Component {
  constructor() {
    super();
    this.state = {
      avatar:'',
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
        this.setState({ avatar: res.secure_url });
        const {avatar} = this.state;
        const newAvatar ={
          avatar
        }
        console.log(newAvatar);
        //API call to Upload Avatar
        axios.post('/api/profile/Upload', newAvatar)
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
      previewImage = (<img src={imagePreviewUrl} className="image-fluid" alt="UserImage" style={{ width: '110px' }} />);
    } else {
      previewImage = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="card upload-avatar shadow-lg col-11 col-sm-11 col-md-11 col-lg-11">
        <div className="card-header-av">Upload New Avatar</div>
        <form className="uploadav-form row" onSubmit={this.handleSubmit}>
          <div className="form-group">
            
            <div className="input-group">
            <img src={staticImage} alt="Avatar" className="static-av" />
            </div>

            <div className="form-inline row upload-image ">
              <label className="fa fa-file-image-o ">
                <input type="file" hidden onChange={this.handleImageChange}
                    name='avatar' className="form-input" />
              </label>
              <button className="btn btn-primary shadow-none" disabled ={submitDisabled}>Change Avatar</button>
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

export default UploadAvatar;
