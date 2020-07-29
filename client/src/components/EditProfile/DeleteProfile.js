import React, {Component} from 'react';
import './createprofile.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';

class DeleteProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
  const profile = this.props.profile;

    let deleteAction;

    if (profile === null ) {
      deleteAction = (
        <div>
          <p>Fill out the info above to set up a profile</p>
        </div>
      );
    } else {
    
        deleteAction = (
          <div>
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } 
    

        return (
          <div className="has-separator">Terminate Account
            <div className="col-12">{deleteAction}</div>
          </div>
                      
        );
    }
}
    
DeleteProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  DeleteProfile
);