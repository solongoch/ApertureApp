import React, { Component } from "react";
// import CSS
import "./homepage.css";

class AddComment extends Component {
  render() {
    return (
      <div>
        <form className="add-comment-form">
          <input
            className="add-comment"
            type="text"
            name="add-comment"
            placeholder="Add a comment..."
          />
        </form>
      </div>
    );
  }
}

export default AddComment;
