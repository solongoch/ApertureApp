
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './editprofile.css';
import Uploadavatar from './Uploadavatar';
import DeleteProfile from './DeleteProfile';
import { getCurrentProfile, editProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import TextFieldGroup from '../common/TextFieldGroup';

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
      gender: '',
      errors: {},
      isEnabled: false,
      loading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, isEnabled: true });
    if ((this.state.errors.hasOwnProperty([e.target.name]))) {
      this.clearError(e.target.name);
    }
  }

  //clear errors onChange
  clearError(errorProperty) {
    var errors = this.state.errors;
    var errPropertyValue = errors[errorProperty];
    if (errPropertyValue.length > 0) {
      errors[errorProperty] = ''
      this.setState({ errors });
    }
  }


  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value })
    this.setState({ isEnabled: true })
  }
  handlePrivacyChange = (e) => {
    this.setState({ isEnabled: true })
    let value = e.target.value;
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === "false") { this.setState({ isPublic: false }) }
      else {//default isPublic:true
        this.setState({ isPublic: true })
      }

    }
  }


  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      name: this.state.name,
      username: this.state.username,
      website: this.state.website,
      bio: this.state.bio,
      email: this.state.email,
      mobile: this.state.mobile,
      gender: this.state.gender,
      isPublic: this.state.isPublic
    };

    this.props.editProfile(profileData)
    this.setState({ loading: true }) //hide refresh symbol inside button after upload
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.mobile = !isEmpty(profile.mobile) ? profile.mobile : '';
      profile.gender = !isEmpty(profile.gender) ? profile.gender : 'Custom';


      //Setting existing data from DB(props) to state onLoad of the component
      this.setState({
        name: profile.name,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        isPublic: profile.isPublic,
        website: profile.website,
        bio: profile.bio,
        mobile: profile.mobile,
        gender: profile.gender,
        isEnabled: false,
        loading: false
      })

    }
  }

  render() {
    const { errors, name, username, email, avatar, bio, website, mobile,
      gender, isPublic, isEnabled, loading } = this.state;
    return (
      <div className="create-profile">
        <div className="row">
          <div className="col-11 col-sm-4 col-md-4 col-lg-3 mr-3 ml-3 sidebar-maindiv">
            <div className="sidebar">
              <Uploadavatar avatar={avatar} />
              <hr />
              <div className="div-editchgpwd pb-3">
                <Link to="/changepassword" className="btn btn-primary">Change Password</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-7 col-md-7 col-lg-8 profile-info">
            <div className="form-group">
              <form onSubmit={this.onSubmit}>
                <h4 className="mb-3">User Profile</h4>
                <div className="col-12">
                  <label htmlFor="Name" className="pr-3">
                    <h5 className="mb-0">Name</h5>
                  </label>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <p className="createprofile-info">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="pr-3">
                    <h5 className="mb-0">Username</h5>
                  </label>
                  <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={username}
                    error={errors.username}
                    readOnly
                    className="form-control form-control-lg login-input shadow-none readonly-username"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="website" className="pr-3">
                    <h5 className="mb-0">Website</h5>
                  </label>
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    type="text"
                    value={website}
                    onChange={this.onChange}
                    error={errors.website}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="bio">
                    <h5 className="mb-0">Bio</h5>
                  </label>
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    rows="3"
                    placeholder=""
                    name="bio"
                    value={bio}
                    onChange={this.onChange}
                  />
                </div>

                <h4 className="mt-2">Personal Info</h4>
                <p className="createprofile-info">Provide your personal information. This won't be a part of your public profile</p>

                <div className="col-12">
                  <label htmlFor="email">
                    <h5 className="mb-0">Email</h5>
                  </label>
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="mobile">
                    <h5 className="mb-0">Phone Number</h5>
                  </label>
                  <TextFieldGroup
                    placeholder="Phone Number"
                    name="mobile"
                    type="text"
                    value={mobile}
                    onChange={this.onChange}
                    error={errors.mobile}
                  />
                </div>

                <div className="form-group mb-1">
                  <label className="control-label pl-3 mb-1" htmlFor="gender">
                    <h5 className="mb-0">Gender</h5>
                  </label>
                  <div className="col-12 form-control-lg ui-select pt-0">
                    <select id="gender" className="form-control" name="gender"
                      onChange={this.handleGenderChange} value={gender}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Custom">Custom</option>
                      <option value="Prefer Not to Say">Prefer Not to Say</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mb-1">
                  <label className="control-label pl-3 " htmlFor="privacy">
                    <h5 className="mb-0">Account Privacy</h5>
                  </label>
                  <div className="col-12 form-control-lg ui-select pt-0">
                    <select id="privacy" className="form-control" name="privacy"
                      onChange={this.handlePrivacyChange} value={isPublic}>
                      <option value="true">Public</option>
                      <option value="false">Private</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary col-4 btn-createprofile"
                  type="submit"
                  disabled={!isEnabled}>Submit
                   {loading && <i className="fa fa-refresh fa-spin ml-2" style={{ marginRight: "10px", fontSize: "15px" }} />}
                </button>
              </form>
            </div>
            <DeleteProfile />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { getCurrentProfile, editProfile })(EditProfile);
