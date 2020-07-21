import React, { Component } from 'react';
import "../css/follow.css";
import { Link } from "react-router-dom";
import users from './Data';

class Followers extends Component {

  // constructor() {
  //   super();    
  // }
  
  render() {
    return (
     <div className='mainwrapper-div'>
          <div className='subwrapper-div'>
             <div className='user-container'>
              <h5>Followers</h5>
              <span>
                <Link to='/profile' className='close'>
                <i className="fa fa-times" aria-hidden="true"></i>
                </Link>
              </span>
              <hr />

              <div className='scrolluser'>
                   {
                     users.map( (user) => {
                       return(
                        <div className='row' key={user.userId}>
                          
                          <div className='avatar-div col-2 col-sm-2 col-md-2 col-lg-2 col-xxs-2'>
                            <Link to='#'>
                              <img
                                className='user-avatar'
                                src={user.avatar}
                                alt='Avatar'
                              />
                            </Link>
                          </div>
                          <div className='userinfo-div col-5 col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
                                  <Link
                                    to='#'
                                    className='username-link'
                                    style={{ marginLeft: "-60px",textDecoration: 'inherit',
                                    "cursor": "pointer" }}                          
                                  >
                                <span className="username"> {user.username} </span>
                                </Link>
                                <span className="name"> {user.name}  </span>
                          </div>
                          <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
                              <button className='btn btn-primary btn-lg'>Follow</button>
                          </div>
                         </div>
                        )
                      })
                  }  
              </div>
       
            </div>
          </div>
        </div>
    );
  }
}
export default Followers;