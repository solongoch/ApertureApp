const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  handle: { type: String, max: 30 },
  website: { type: String },
  bio: { type: String },
  mobile: { type: String },
  //enum: This states that the string can only have the value specified in the enum array.
  gender: { type: String, enum: ["male", "female", "other"] },
  followers: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  following: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  editedDate: { type: Date, default: Date.now }
});

module.exports = profiles = mongoose.model("profile", ProfileSchema);
