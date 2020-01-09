const env = process.env.NODE_ENV || 'development';

import mongoose from 'mongoose';
import encryption from '../utils/encryption';
import config from '../config/config';

const Schema = mongoose.Schema;
const { defaultUserImage } = config[env];

const userSchema = new Schema({
    username: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification'}],
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    imageId: { type: Schema.Types.ObjectId, default: new mongoose.mongo.ObjectID(defaultUserImage) },
    hashedPassword: { type: Schema.Types.String, required: true },
    salt: { type: Schema.Types.String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    roles: [{ type: String, required: true }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

//add schema method for authenticate to check if hashed pass is valid
userSchema.method({
    authenticate: function (password) {
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    }
})

const User = mongoose.model('User', userSchema);

//when app is set up and db is empty first we seed admin 
User.seedAdmin = async () => {
    try {
        const users = await User.find({});
        if (users.length > 0) return;

        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, 'Admin');

        return User.create({
            username: 'Admin',
            email: 'Admin@admin.com',
            firstName: 'Tsani',
            lastName: 'Mazalov',
            hashedPassword,
            roles: ['Admin'],
            salt,
        })
    } catch (error) {
        console.log(error);
    }
}

export default User;