import React, { Component } from 'react';
import logoImage from "../../image/avatar.png";
import '../css/Unfollow.css';

class Unfollow extends Component {
  render() {
    return (
      <div className="unfollow-div">
        <div className="container">
          <div className="row align-items-center">
          <div className="mx-auto ">
            <div className="card">
              <form>
                <div className="form-group">
                  <div className=" col-sm-10 col-md-12 col-lg-12">
                    <img className="avatar-img " src={logoImage} alt="Avatar" />
                  </div>
                  <div className="username-div col-sm-12 col-md-12 col-lg-12">
                          <p className="username-p">If you change your mind, you'll have to request to follow @keerthikadambala again.
                          </p>
                  </div>
                  <div className="unfollow-div">
                    <button className=" btn-unfollow btn-common btn-block">Unfollow</button>
                    <button className="btn-cancel btn-common btn-block">Cancel</button>
                  </div>
                  </div>
               </form>
            </div>
          </div> 
          </div>
        </div>
      </div>
    )
  }
}
export default Unfollow;