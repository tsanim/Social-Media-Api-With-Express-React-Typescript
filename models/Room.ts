import mongoose, { Schema } from 'mongoose';
import IRoom from '../interfaces/models/Room.interface';

const roomSchema: Schema = new Schema({
    pairUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

const Room = mongoose.model<IRoom>('Room', roomSchema);

export default Room;