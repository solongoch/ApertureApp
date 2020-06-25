const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  followers: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  following: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }]
});

module.exports = profiles = mongoose.model("profile", ProfileSchema);
