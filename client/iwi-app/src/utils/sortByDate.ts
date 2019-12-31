/*
    The function is made for using in sort array method for sorting by dates.
*/

export default (a: any, b: any) => {
    const dateA: Date = new Date(a.date);
    const dateB: Date = new Date(b.date);
    return dateB as any - (dateA as any);
}