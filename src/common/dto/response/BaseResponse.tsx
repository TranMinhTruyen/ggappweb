export interface BaseResponse<T> {
    timestamp: string,
    status: number,
    statusname: string,
    message: string,
    payload: T | null
}
