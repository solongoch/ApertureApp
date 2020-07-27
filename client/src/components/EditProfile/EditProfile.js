import React, {Component} from 'react';
import staticImage from "../../image/instav.png";
import {Link} from 'react-router-dom';
import './createprofile.css';
import axios from 'axios';
import classnames from 'classnames';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cloudniary from '../config/Keys';
import DeleteProfile from './DeleteProfile';

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
            previewImage = (<img src={imagePreviewUrl} className="image-fluid" alt="UserImage" style={{ width: '110px', borderRadius:'50px' }} />);
        } else {
            previewImage = (<div className="previewText"></div>);
        }

        return (
            <div className="create-profile">

                <div className="row">
`                   <div className="col-lg-3">
                        <div className="sidebar">

                        <div className="text-center">
                            <img src={staticImage} alt="Avatar" className="static-av" style={{width:'110px'}} />
                            <h6>Upload a different photo...</h6>
                            <form onSubmit={this.handleSubmit}>
                            <label className="fa fa-file-image-o col-12">
                                <input type="file" 
                                hidden onChange={this.handleImageChange}
                                name='avatar' 
                                className="form-input" />
                            </label>
                            <div className="imgPreview">{previewImage}</div>
                            <button className="btn btn-primary shadow-none" disabled ={submitDisabled}>Change Avatar</button>
                            </form>
                        </div>
                        <hr/>
                        <div className="col-12 change-password"><Link to="/changepassword" className="btn btn-primary mr-2">Change Password</Link></div>

                    </div>
                    </div>

                    <div className="sidebar-mobile col-12">

                        <div className="text-center">
                            <img src={staticImage} alt="Avatar" className="static-av" style={{width:'110px'}} />
                            <h6>Upload a different photo...</h6>
                            <form onSubmit={this.handleSubmit}>
                            <label className="fa fa-file-image-o col-12">
                                <input type="file" 
                                hidden onChange={this.handleImageChange}
                                name='avatar' 
                                className="form-input" />
                            </label>
                            <div className="imgPreview">{previewImage}</div>
                            <button className="btn btn-primary shadow-none" disabled ={submitDisabled}>Change Avatar</button>
                            </form>
                        </div>
                        <hr/>
                        <div><Link to="/changepassword" className="btn btn-primary mr-2 col-12">Change Password</Link></div>

                    </div>

                <div className="col-lg-8 col-md-8 col-sm-12 profile-info">
                    <div class="form-group">
                    <form onSubmit={this.onSubmit}>
                        <h3>User Profile</h3>
                          
                          <div class="col-10">
                              <label htmlFor="Name"><h5>Name</h5></label>
                              <input 
                              type="text" 
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.name
                              })}
                              placeholder="Name"
                              name="Name" 
                              value={this.state.name}
                              onChange={this.onChange}
                              />
                              {errors.name && (
                              <div className="invalid-feedback">{errors.name}</div>
                              )}
                              <p>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                          </div>

                          <div class="col-10">
                              <label htmlFor="Name"><h5>Username</h5></label>
                              <input 
                              type="text" 
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.username
                              })}
                              placeholder="Username"
                              name="Username" 
                              value={this.state.username}
                              onChange={this.onChange}
                              />
                              {errors.username && (
                              <div className="invalid-feedback">{errors.username}</div>
                              )}  
                          </div>

                          <div class="col-10">
                              <label htmlFor="Name"><h5>Website</h5></label>
                              <input 
                              type="text" 
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.website
                              })}
                              placeholder="Website"
                              name="Website"
                              value={this.state.webite}
                              onChange={this.onChange} 
                              />
                              {errors.website && (
                              <div className="invalid-feedback">{errors.website}</div>
                              )} 
                          </div>

                          <div class="col-10">
                              <label htmlFor="Name"><h5>Bio</h5></label>
                              <textarea 
                              type="text" 
                              className="form-control form-control-lg" 
                              rows="3"
                              placeholder=""
                              name="Bio" 
                              value={this.state.bio}
                              onChange={this.onChange} 
                              />
                          </div>

                          <h3>Personal Info</h3>
                            <p>Provide your personal information. This won't be a part of your public profile</p>
                          
                        <div class="col-10">
                              <label htmlFor="Name"><h5>Email</h5></label>
                              <input 
                              type="text" 
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.email
                              })} 
                              placeholder="Email"
                              name="Email" 
                              value={this.state.email}
                              onChange={this.onChange} 
                              />
                              {errors.email && (
                              <div className="invalid-feedback">{errors.email}</div>
                              )} 
                          </div>  

                          <div class="col-10">
                              <label htmlFor="Name"><h5>Phone Number</h5></label>
                              <input 
                              type="text" 
                              className={classnames("form-control form-control-lg", {
                                "is-invalid": errors.mobile
                              })} 
                              placeholder="Phone Number"
                              name="Phone Number" 
                              value={this.state.mobile}
                              onChange={this.onChange} 
                              />
                              {errors.mobile && (
                              <div className="invalid-feedback">{errors.mobile}</div>
                              )} 
                          </div>   

                          <div className="form-group">
                            <label className="col-lg-3 control-label">Gender</label>
                            <div className="col-lg-10 ui-select">
                                <select id="gender" className="form-control">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Custom">Custom</option>
                                <option value="Prefer Not To Say">Prefer Not to Say</option>
                                </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-lg-3 control-label">Account Privacy</label>
                            <div className="col-lg-10 ui-select">
                                <select id="privacy" className="form-control">
                                <option value="Male">Public</option>
                                <option value="Female">Private</option>
                                </select>
                            </div>
                          </div>

                          <button className="btn btn-primary" type="submit">Update Profile</button>

                    </form>
                    </div>

                         <DeleteProfile></DeleteProfile>         
                    </div>

                </div>

            </div>
        );
    }
}
    
export default EditProfile;