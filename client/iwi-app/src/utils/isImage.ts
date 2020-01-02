//function about checking whether is image
export default function isImage(type: string): boolean {
    switch (type) {
        case 'image/jpeg':
        case 'image/png':
            return true;
        default:
            return false;
    }
}