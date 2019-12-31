export default interface RequestOptions {
    method: string,
    url: string,
    data?: object,
    headers: object,
    onSuccess?: (data: any) => void
    onError?: (error: any) => void
}