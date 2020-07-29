import React, {Component} from 'react';
import staticImage from "../../image/instav.png";
import {Link, withRouter} from 'react-router-dom';
import './createprofile.css';
import DeleteProfile from './DeleteProfile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextProfileFieldGroup from '../common/TextProfileFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGender from '../common/SelectListGender';
import SelectListPrivacy from '../common/SelectListPrivacy';
import { createProfile  } from '../../actions/profileActions';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      avatar: '',
      website: '',
      bio: '',
      email: '',
      mobile: '',
      gender: '',
      isPublic: '',
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

      const profileData={
        name: this.state.name,
        username: this.state.username,
        website: this.state.website,
        bio: this.state.bio,
        email: this.state.email,
        mobile: this.state.mobile,
        gender: this.state.gender,
        isPubilc: this.state.isPubilc
      };

      this.props.createProfile(profileData, this.props.history);
  }
    
    onChange(e){
      this.setState({[e.target.name]: e.target.value });
    }

    render() {
      const {errors} = this.state;
          // Select options for gender
    const genderoptions = [
      { label: 'Select Gender', value: 0},
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Custom', value: 'Custom' },
      { label: 'Prefer Not to Say', value: 'Prefer Not to Say' },
    ];

      const privacyoptions = [
      { label: 'Select Privacy', value: 0 },
      { label: 'Public', value: 'Public' },
      { label: 'Private', value: 'Private' }
    ];

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
                            <div className="imgPreview"></div>
                            <button className="btn btn-primary shadow-none">Change Avatar</button>
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
                            <div className="imgPreview"></div>
                            <button className="btn btn-primary shadow-none">Change Avatar</button>
                            </form>
                        </div>
                        <hr/>
                        <div><Link to="/changepassword" className="btn btn-primary mr-2 col-12">Change Password</Link></div>

                    </div>

                <div className="col-lg-8 col-md-8 col-sm-12 profile-info">
                    <div class="form-group">
                    <form onSubmit={this.onSubmit}>
                        <h3>User Profile</h3>
                          
                            <TextProfileFieldGroup 
                              placeholder="Name"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              error={errors.name}
                              info="Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
                            />

                            <TextProfileFieldGroup 
                              placeholder="Username"
                              name="username"
                              value={this.state.username}
                              onChange={this.onChange}
                              error={errors.username}
                              info=""
                            />

                            <TextProfileFieldGroup 
                              placeholder="Website"
                              name="website"
                              value={this.state.website}
                              onChange={this.onChange}
                              error={errors.website}
                              info=""
                            />
                        
                            <TextAreaFieldGroup 
                              placeholder="Bio"
                              name="bio"
                              value={this.state.bio}
                              onChange={this.onChange}
                              error={errors.bio}
                              info=""
                            />

                          <h3>Personal Info</h3>
                            <p>Provide your personal information. This won't be a part of your public profile</p>
                          
                            <TextProfileFieldGroup 
                              placeholder="Email"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChange}
                              error={errors.email}
                              info=""
                            />
              
                            <TextProfileFieldGroup 
                              placeholder="Phone Number"
                              name="Phone Number"
                              value={this.state.mobile}
                              onChange={this.onChange}
                              error={errors.mobie}
                              info=""
                            />
                        
                          <SelectListGender 
                              placeholder="Gender"
                              name="gender"
                              value={this.state.gender}
                              onChange={this.onChange}
                              options={genderoptions}
                              error={errors.gender}
                              info=""
                            />
                          
                          <SelectListPrivacy 
                              placeholder="Privacy"
                              name="privacy"
                              value={this.state.isPublic}
                              onChange={this.onChange}
                              options={privacyoptions}
                              error={errors.isPubilc}
                              info="Selecting Private will allow only people who follow you to see your posts"
                            />
                      
                          <div className="mb-3">
                          <button className="btn btn-primary btn-block mt-4" type="submit">Create Profile</button>
                          </div>
                          
                    </form>
                    </div>

                         <DeleteProfile></DeleteProfile>         
                    </div>

                </div>

            </div>
        );
    }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(EditProfile)
);
