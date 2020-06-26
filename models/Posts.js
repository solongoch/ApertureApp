const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postedBy: { type: Schema.Types.ObjectId, ref: "users" },
  photo: { type: String, required: true },
  description: { type: String, required: false },
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      text: String,
      commentedBy: { type: Schema.Types.ObjectId, ref: "users" }
    }
  ],
  timePosted: { type: Date, default: Date.now }
});

module.exports = posts = mongoose.model("posts", PostSchema);