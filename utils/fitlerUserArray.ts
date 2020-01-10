export default function filterUserArray(userArr, userId) {
    if (userArr.findIndex(obj => obj._id.toString() === userId) >= 0) {
        return userArr.filter(u => u._id.toString() !== userId);
    }

    return userArr;
}