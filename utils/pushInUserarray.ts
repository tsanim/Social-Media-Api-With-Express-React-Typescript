import IUser from "../interfaces/models/User.interface";

//func to push in user's array of followers
export default function pushInUserArray(userArr: IUser[], user: IUser): IUser[] {
    if (userArr.findIndex(obj => obj._id.toString() === user._id.toString()) === -1) {
        delete user.hashedPassword;
        delete user.salt;

        userArr.push(user);
        return userArr;
    }

    return userArr;
}