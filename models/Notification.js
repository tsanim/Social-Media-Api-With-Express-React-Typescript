import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const notificationSchema = new Schema({
    message: { type: Schema.Types.String },
    room: { type: Schema.Types.String },
    sender: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;