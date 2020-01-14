import mongoose, { Schema } from 'mongoose';
import INotification from '../interfaces/models/Notification.interface';

const notificationSchema: Schema = new Schema({
    message: { type: Schema.Types.String },
    room: { type: Schema.Types.String },
    sender: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;