/*
    The function is made for using in sort array method for sorting by dates.
*/

export default (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
}