import mongoose, { Schema } from 'mongoose';
import ILog from '../interfaces/models/Log.interface';

const logSchema: Schema = new Schema({
    timestamp: { type: Schema.Types.String },
    level: { type: Schema.Types.String },
    message: { type: Schema.Types.String }
});

const Log = mongoose.model<ILog>('Log', logSchema);

export default Log;