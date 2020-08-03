
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postedBy: { type: Schema.Types.ObjectId, ref: "users" },
  photo: { type: String, required: true },
  caption: { type: String, required: false },
  likes: [{ likedBy: { type: Schema.Types.ObjectId, ref: "users" }}],
  comments: [
    {
      commentBody: { type: String, required: true },
      commentedById: { type: Schema.Types.ObjectId, ref: "users" },
      commentedByUsername: { type: String },
      commentedByAvatar: { type: String },
      date: { type: Date, default: Date.now }
    }
  ],
  timePosted: { type: Date, default: Date.now }
});

module.exports = posts = mongoose.model("posts", PostSchema);
