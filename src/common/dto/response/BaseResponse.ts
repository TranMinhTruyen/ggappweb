export default interface BaseResponse<T> {
    timestamp: string | null,
    status: number | null,
    statusname: string | null,
    message: string | null,
    payload: T | null
}

export const errorBaseResponse: BaseResponse<null> = {
    timestamp: new Date().toLocaleString(),
    status: 500,
    statusname: "Server Interval",
    message: "Error while request to server",
    payload: null
};
