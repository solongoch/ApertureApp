import React, { Component } from 'react'
import uploadImage from '../utils';
import { connect } from 'react-redux';
import { uploadAvatar } from './../../actions/profileActions';
// 

class Uploadavatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      avatar: '',
      imagePreview: '',
      submitDisabled: true,
      loading: false
    }
  }
  //Onchange of file upload icon
  handleUploadAvatar = (e) => {
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


  submitUploadAvatar = (e) => {
    e.preventDefault();
    const { file } = this.state;
    this.setState({loading: true}) //for refresh button inside button during uploading
    uploadImage(file)
      .then((res) => {
        this.setState({ avatar: res.secure_url });

        const newAvatar = {
          avatar: this.state.avatar
        }

        this.props.uploadAvatar(newAvatar);

        this.setState({ submitDisabled: !this.state.submitDisabled });
        this.setState({loading : false}) //hide refresh symbol inside button after upload

      })
  }

  render() {
    const { avatar } = this.props;
    let img = null;
    const { imagePreview, submitDisabled, loading } = this.state
    if (imagePreview) {
      img = <img src={imagePreview} className="createuser-avatar" alt="UserImage" />
    } else {
      img = <img src={avatar} className="createuser-avatar" alt="UserImage" />
    }

    return (
      <div className="card text-center uploadavatar-card">
        {img}
        <h6 className="pt-1"><strong>Upload a different photo...</strong></h6>
        <form onSubmit={this.submitUploadAvatar}>
          <label className="fa fa-file-image-o col-12" style ={{color : '#007bff'}}>
            <input type="file"
              hidden onChange={this.handleUploadAvatar}
              name='avatar'
              className="form-input" />
          </label>
          {/* <div className="imgPreview">{previewImage}</div> */}
          <button className="btn btn-primary btn-md shadow-none btn-chg-avatar" disabled={submitDisabled}>Change Avatar
            {loading && <i className="fa fa-refresh fa-spin fa-xs" style={{ marginRight: "10px" , fontSize: "15px" }} />}
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { uploadAvatar })(Uploadavatar);