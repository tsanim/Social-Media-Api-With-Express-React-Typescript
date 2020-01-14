import mongoose, { Schema } from 'mongoose';
import IComment from '../interfaces/models/Comment.interface';

const commentSchema: Schema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId , ref: 'Post'},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    text: { type: Schema.Types.String, required: true },
    date: { type: Schema.Types.Date, default: Date.now }, 
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;