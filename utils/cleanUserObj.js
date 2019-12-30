//clean user object 
export default  (user) => {
    //assign user from params to new object
    const newUser = Object.assign({}, user);

    //remove unneed props from user object
    delete newUser.hashedPassword;
    delete newUser.salt;
    delete newUser.__v;

    return newUser
}