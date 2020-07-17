import React, { Component } from 'react';
import "../css/Follow.css";
import { Link } from "react-router-dom";
import users from './Data';


class Followings extends Component {
  // constructor() {
  //   super();    
  // }
  
  render() {
    return (
      <div className='first'>
        <div className='second'>
          <div className='third'>
            <div className='followers-container'>
              <h5>Followings </h5>
              <span>
                <Link to='/profile' className='close'>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Link>
              </span>
              <hr />

              <div className='container scrolling'>
              {
                users.map( (user) => {
                  return(
                    <div className='row' key={user.username}>
                      <div className='spaceMargin col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
                        <Link to='#'>
                          <img
                            className='followers-avatar-icon'
                            src={user.avatar}
                            alt='Avatar'
                          />
                        </Link>
                      </div>

                      <div className='col-sm-6 col-md-6 col-lg-6 col-xxs-6'>
                        <Link
                          to='#'
                          className='fontStyleSizeColor'
                          style={{ marginLeft: "-50px" , textDecoration: 'inherit',
                                      "cursor": "pointer"}}
                        >
                          <span className="username"> {user.username} </span>
                        </Link>
                        <div style={{ marginTop: "-4px", marginLeft: "-50px" }}>
                        <span className="name"> {user.name}  </span>
                        </div>
                      </div>

                      <div className='spaceMargin col-sm-3 col-md-3 col-lg-3 col-xxs-3'>
                        <button
                          className='btn btn-primary-outline btn-lg'
                          style={{                            
                            lineHeight: "2px",
                            float: "right",
                            height: "30px",
                          }}
                          // onClick={this.handleClick}
                        >
                        
                        Following
                          {/* {this.state.isToggleOn ? "Follow" : "Following"} */}
                        </button>
                      </div>                    
                    </div>
                  )
                })
            }  
              </div>
              {/* followers-container ends */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Followings;