import mongoose, { Schema, Model } from 'mongoose';
import Encryption from '../utils/Encryption';
import Configuration from '../config/Configuration';
import IUser from '../interfaces/models/User.interface';
import UserModel from '../interfaces/models/UserModel';
const env = process.env.NODE_ENV || 'development';

const config = new Configuration(env);

const userSchema: Schema = new Schema({
    username: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    imageId: { type: Schema.Types.ObjectId, default: new mongoose.mongo.ObjectID(config.environmentConfig.defaultUserImage) },
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
    authenticate: function (password: string) {
        const currentHashedPass = Encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    }
});

//when app is set up and db is empty first we seed admin 
userSchema.statics.seedAdmin = async () => {
    try {
        const users: IUser[] = await User.find({});
        if (users.length > 0) return;

        const salt = Encryption.generateSalt();
        const hashedPassword = Encryption.generateHashedPassword(salt, 'Admin');

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

const User: UserModel = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;