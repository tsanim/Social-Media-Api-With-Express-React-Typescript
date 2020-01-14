import mongoose, { Schema } from 'mongoose';
import IMessage from '../interfaces/models/Message.interface';

const messageSchema: Schema = new Schema({
    text: { type: Schema.Types.String },
    room: { type: Schema.Types.String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;