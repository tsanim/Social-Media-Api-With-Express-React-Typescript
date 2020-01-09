import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const roomSchema = new Schema({
    pairUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

const Room = mongoose.model('Room', roomSchema);

export default Room;