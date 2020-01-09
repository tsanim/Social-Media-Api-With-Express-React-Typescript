import mongoose from 'mongoose';
const Schema  = mongoose.Schema;

const logSchema = new Schema({
    timestamp: { type: Schema.Types.String },
    level: { type: Schema.Types.String },
    message: { type: Schema.Types.String }
});

const Log = mongoose.model('Log', logSchema);

export default Log;