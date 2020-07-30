import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './test.css'
import { Fragment } from 'react'

export default class TestProfile extends Component {
  render() {
    const { posts } = this.props;
    return (
      <Fragment>


        <main>

          <div class="container">

            <div class="gallery">





              {
                posts.map(post => {
                  return (


                    <div class="gallery-item" tabindex="0" key={post._id}>

                      <Link to={`/single-post/${post._id}`}>

                        <img src={post.photo} class="gallery-image" alt="" />



                        <div class="gallery-item-info">

                          <ul>
                            <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i>
                              {post.likesCount}</li>
                            <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i>
                              {post.commentsCount}</li>
                          </ul>

                        </div>
                      </Link>
                    </div>
                  )
                })}
              {/*     
          <div class="gallery-item" tabindex="0">
    
            <img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
    
            <div class="gallery-item-info">
    
              <ul>
                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 66</li>
                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
              </ul>
    
            </div>
    
          </div>
    
          <div class="gallery-item" tabindex="0">
    
            <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
    
            <div class="gallery-item-type">
    
              <span class="visually-hidden">Gallery</span><i class="fas fa-clone" aria-hidden="true"></i>
    
            </div>
    
            <div class="gallery-item-info">
    
              <ul>
                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 45</li>
                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
              </ul>
    
            </div>
    
          </div>
    
          <div class="gallery-item" tabindex="0">
    
            <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
    
            <div class="gallery-item-info">
    
              <ul>
                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 34</li>
                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 1</li>
              </ul>
    
            </div>
    
          </div>
    
          <div class="gallery-item" tabindex="0">
    
            <img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
    
            <div class="gallery-item-info">
    
              <ul>
                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 41</li>
                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 0</li>
              </ul>
    
            </div>
    
          </div>
    
          <div class="gallery-item" tabindex="0">
    
            <img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" class="gallery-image" alt=""/>
    
            <div class="gallery-item-type">
    
              <span class="visually-hidden">Video</span><i class="fas fa-video" aria-hidden="true"></i>
    
            </div>
    
            <div class="gallery-item-info">
    
              <ul>
                <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 30</li>
                <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
              </ul>
    
            </div>
    
          </div>
     */}
            </div>



          </div>


        </main>
      </Fragment>
    )
  }
}
