export default interface BaseResponse<T> {
    timestamp: string,
    status: number,
    statusname: string,
    message: string,
    payload: T | null
}

export const errorBaseResponse: BaseResponse<null> = {
    timestamp: new Date().toLocaleString(),
    status: 500,
    statusname: "Server Interval",
    message: "Error while request to server",
    payload: null
};
