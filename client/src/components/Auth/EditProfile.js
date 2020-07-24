import React, { Component } from 'react'
import '../css/editprofile.css';
import {Link} from 'react-router-dom';
import cloudniary from '../config/Keys';
import staticImage from "../../image/instav.png";
import axios from 'axios';
import classnames from 'classnames';
import { Alert, Collapse, Card, CardBody } from 'reactstrap';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      avatar: '',
      website: '',
      bio: '',
      email: '',
      mobile: '',
      submitDisabled: true,
      visible: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  toggle() {
    this.setState({
      visible: ! this.state.visible
    });
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();

    const user = {
      name: this.state.name,
      username: this.state.email,
      avatar: this.state.avatar,
      website: this.state.website,
      bio: this.state.bio,
      email: this.state.email,
      mobile: this.state.mobile
    };

    axios
      .post('/api/profile/edit', user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    const {errors} = this.state;
    let previewImage = null;
    let { imagePreviewUrl,submitDisabled } = this.state;
    if (imagePreviewUrl) {
      previewImage = (<img src={imagePreviewUrl} className="image-fluid" alt="UserImage" style={{ width: '110px' }} />);
    } else {
      previewImage = (<div className="previewText">Please select an Image for Preview</div>);
    }
 
    return (
      <div className="edit-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="sidebar">
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
              


              <Link to="/changepassword" className="btn btn-lg mr-2">Change Password</Link>
            </div>
            </div>

        <div className="profile-info col-md-8">

        <div className="sidebar-mobile">
        
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
              <Link to="/changepassword" className="btn btn-lg mr-2">Change Password</Link>
            </div>

        <div className="form-data-omega">
          <form onSubmit={this.onSubmit}>
          <h3> Edit User Profile</h3>
            <div className="form-group">
              <label className="col-lg-3 control-label">Name</label>
              <div className="col-lg-10">
                <input 
                type="text" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.name
                })}
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>

            <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Username</label>
              <div className="col-lg-10">
                <input 
                type="text" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.username
                })}
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Website</label>
              <div className="col-lg-10">
                <input 
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.website
                })} 
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                />
                {errors.website && (
                  <div className="invalid-feedback">{errors.website}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Bio</label>
              <div className="col-lg-10">
                <textarea
                type="text"
                className="form-control form-control-lg"
                rows="3"
                placeholder=""
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                />
              </div>
            </div>

            <h3>Edit Personal Info</h3>
            <p>Provide your personal information. This won't be a part of your public profile</p>

            <div className="form-group">
              <label className="col-lg-3 control-label">Email</label>
              <div className="col-lg-10">
                <input 
                type="text"
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.email
                })} 
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Phone Number</label>
              <div className="col-lg-10">
                <input 
                type="tel" 
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.mobile
                })}
                placeholder="Phone Number"
                name="mobile"
                value={this.state.mobile}
                onChange={this.onChange}
                />
                {errors.mobile && (
                  <div className="invalid=feedback">{errors.mobile}</div>
                )}
              </div>
            </div>

            <div className="form-group">
            <label className="col-lg-3 control-label">Gender</label>
            <div className="col-lg-10">
              <div className="ui-select">
                <select id="gender" className="form-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Custom">Custom</option>
                  <option value="Prefer Not To Say">Prefer Not to Say</option>
                </select>
              </div>

              <div className="form-group">
              <label className="col-lg-3 control-label">Account Privacy</label>
              <div className="col-lg-10">
              <div className="ui-select">
                <select id="isPublic" className="form-control">
                  <option value="Public">public</option>
                  <option value="Private">private</option>
                </select>
              </div>
              </div>
            </div>

              

              <button className="btn btn-primary" type="submit">Update Profile</button>

            </div>
          </div>
          </form>
          </div>

          <div className="form-group">
        <label className="col-md-3 control-label"></label>
            <div className="col-md-10">
                    <div className="has-separator">Terminate Account</div>
                    <button className="btn btn-lg btn-danger btn-info delete mr-2" onClick={this.toggle.bind(this)}>Delete Account</button>
                    <Collapse isOpen={this.state.visible} toggle={this.toggle.bind(this)}>
                      <Card>
                        <CardBody >
                        <Alert color="danger">Are you sure you want to delete your account?</Alert>
                        <Link to="/remove" className="btn btn-lg btn-info mr-2 btn-danger delete">Confirm Delete Account</Link>
                        </CardBody>
                      </Card>
                    </Collapse>
            </div>
        </div>

          </div>
        </div>
      </div>




    );
  }
}

export default EditProfile;