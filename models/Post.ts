import mongoose, { Schema } from 'mongoose';
import IPost from '../interfaces/models/Post.interface';

const postSchema: Schema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: Schema.Types.String },
    date: { type: Schema.Types.Date, default: Date.now },
    imageId: { type: Schema.Types.ObjectId},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;