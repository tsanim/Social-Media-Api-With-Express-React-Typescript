import IUser from "../interfaces/models/User.interface";

//clean user object 
export default  (user: IUser): IUser => {
    //assign user from params to new object
    const newUser: IUser = Object.assign({}, user);

    //remove unneed props from user object
    delete newUser.hashedPassword;
    delete newUser.salt;
    delete newUser.__v;

    return newUser
}