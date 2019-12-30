import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const messageSchema = new Schema({
    text: { type: Schema.Types.String },
    room: { type: Schema.Types.String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;