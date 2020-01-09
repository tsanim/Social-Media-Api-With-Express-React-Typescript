import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: Schema.Types.String },
    date: { type: Schema.Types.Date, default: Date.now },
    imageId: { type: Schema.Types.ObjectId},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
});

const Post = mongoose.model('Post', postSchema);

export default Post;