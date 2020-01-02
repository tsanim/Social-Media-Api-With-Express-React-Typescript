/*
    calcTime function is made to calculate how much time is long
*/

export default function calcTime(dateIsoFormat: string): string {
    let diff: number = new Date() as any - (new Date(dateIsoFormat) as any);
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value: number) {
        if (value !== 1) return 's';
        else return '';
    }
}
