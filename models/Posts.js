const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

  title: { type: String, required: true },
  body: { type: String, required: true },
  photo: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comments: [
    {
      text: String,
      postedBy: { type: Schema.Types.ObjectId, ref: 'users' }
    }
  ],
  postedBy: { type: Schema.Types.ObjectId, ref: 'users' },
  timePosted: { type: Date, default: Date.now } 
});



module.exports = posts = mongoose.model('posts', PostSchema);




