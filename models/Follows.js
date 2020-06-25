const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  followers: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  following: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  private: Boolean
});

module.exports = follows = mongoose.model("profile", FollowsSchema);
